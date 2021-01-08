import { BytesReader } from "as-scale-codec";
import {
  Util,
  Storage,
  Crypto,
  Contract,
  Balance,
  AccountId
} from "@subscript/core";

/**
 * Map key of TotalSupply
 */
const STORE_KEY = (new Uint8Array(32)).fill(0);
/**
 * Offset of address map key
 */
const BALANCE_POSITION = (new Uint8Array(32)).fill(0);

/**
 * Selector of method, now defined by const
 * may be replace by hash(function_name)
 */
enum Method {
  BalanceOf = 0x56e929b2,
  Transfer = 0xfae3a09d,
  Allowance = 0xf3cfff66,
  Approve = 0x03d0e114,
  TransferFrom = 0xfcfb2ccd,
  TotalSupply = 0xdcb736b5
}


/**
 * Return the Map key of user balance
 * key = address + position
 */
@inline
function balanceKey(addr: AccountId): Uint8Array {
  const store = new Uint8Array(64);
  store.set(Util.arrayToTyped(addr.getAddress()));
  store.set(BALANCE_POSITION, 32);

  return Crypto.blake2b256(store);
}

/**
 * Return the Map key of allowance
 * key = owner + spender
 */
@inline
function allowanceKey(owner: AccountId, spender: AccountId): Uint8Array {
  const store = new Uint8Array(64);
  store.set(Util.arrayToTyped(owner.getAddress()));
  store.set(Util.arrayToTyped(spender.getAddress()), 32);

  return Crypto.blake2b256(store);
}

function totalSupply(): Uint8Array {
  const data = Storage.get(STORE_KEY, 16);
  if (data.length > 0) {
    return data;
  } else {
    return (new Uint8Array(16)).fill(0);
  }
}

function balanceOf(owner: AccountId): Uint8Array {
  const data = Storage.get(balanceKey(owner), 16);
  if (data.length > 0) {
    return data;
  } else {
    return (new Uint8Array(16)).fill(0);
  }
}

function transfer(dest: AccountId, value: Balance): void {
  const owner = getCaller();

  const ownerKey = balanceKey(owner);
  const destKey = balanceKey(dest);

  const data = Storage.get(ownerKey, 16);
  const ownerBalance = (data.length > 0) ? Balance.from(data): Balance.from(0);

  const receiver = Storage.get(destKey, 16);
  const destBalance = (receiver.length > 0) ? Balance.from(receiver): Balance.from(0);

  if (ownerBalance >= value) {
    Storage.set(ownerKey, (ownerBalance - value).toUint8Array());
    Storage.set(destKey, (destBalance + value).toUint8Array());
  }
}

function allowance(owner: AccountId, spender: AccountId): Uint8Array {

  const data = Storage.get(allowanceKey(owner, spender), 16);
  if (data.length > 0) {
    return data;
  } else {
    return (new Uint8Array(16)).fill(0);
  }
}

function approve(spender: AccountId, value: Balance): void {
  const owner = getCaller();

  Storage.set(allowanceKey(owner, spender), value.toUint8Array());
}

function transferFrom(owner: AccountId, receiver: AccountId, value: Balance): void {
  const spender = getCaller();

  const ownerKey = balanceKey(owner);
  const destKey = balanceKey(receiver);
  const allow = allowanceKey(owner, spender);

  const data = Storage.get(allow, 16);
  const allowBalance = (data.length > 0) ? Balance.from(data): Balance.from(0);

  const ownerData = Storage.get(ownerKey, 16);
  const ownerBalance = (ownerData.length > 0) ? Balance.from(ownerData): Balance.from(0);

  const receiverData = Storage.get(destKey, 16);
  const destBalance = (receiverData.length > 0) ? Balance.from(receiverData): Balance.from(0);

  if ((allowBalance >= value) && (ownerBalance >= value)) {
    Storage.set(ownerKey, (ownerBalance - value).toUint8Array());
    Storage.set(destKey, (destBalance + value).toUint8Array());
    Storage.set(allow, (allowBalance - value).toUint8Array());
  }
}

function getCaller(): AccountId {
  const c = Contract.caller();
  return new AccountId(Util.typedToArray(c));
}

/**
 * Entry of call dispatch
 */
export function call(): void {
  const data = Contract.input();
  if (data.length < 4) {
    return;
  }

  const selector = bswap(load<i32>(data.dataStart, 0));
  const input = data.subarray(4);
  const reader = new BytesReader(Util.typedToArray(input));

  switch (selector) {
    case Method.TotalSupply: {
      Contract.returnValue(totalSupply());
      break;
    }
    case Method.BalanceOf: {
      const owner = reader.readInto<AccountId>();
      Contract.returnValue(balanceOf(owner));
      break;
    }
    case Method.Transfer: {
      const dest = reader.readInto<AccountId>();
      const value = Balance.fromBytes(reader.readBytes(16));
      transfer(dest, value);
      break;
    }
    case Method.Allowance: {
      const owner = reader.readInto<AccountId>();
      const spender = reader.readInto<AccountId>();
      Contract.returnValue(allowance(owner, spender));
      break;
    }
    case Method.Approve: {
      const spender = reader.readInto<AccountId>();
      const value = Balance.fromBytes(reader.readBytes(16));
      approve(spender, value);
      break;
    }
    case Method.TransferFrom: {
      const owner = reader.readInto<AccountId>();
      const receiver = reader.readInto<AccountId>();
      const value = Balance.fromBytes(reader.readBytes(16));
      transferFrom(owner, receiver, value);
      break;
    }
  }
  return;
}

/**
 * Entry of instantiate dispatch
 */
export function deploy(): void {
  const input = Contract.input();
  if (input.length < 4) {
    return;
  }

  const data = input.subarray(4);
  const total = Balance.fromBytes(data);
  const caller = getCaller();
  Storage.set(balanceKey(caller), total.toUint8Array());
  Storage.set(STORE_KEY, total.toUint8Array());
  return;
}