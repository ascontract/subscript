import { u128 } from "as-bignum";
import {
  Util,
  Storage,
  Crypto,
  Contract
} from "@subscript/core";

const STORE_KEY = (new Uint8Array(32)).fill(0);
const BALANCE_POSITION = (new Uint8Array(32)).fill(0);
const ALLOWANCE_POSITION = (new Uint8Array(32)).fill(1, 0, 1);

enum Method {
  BalanceOf = 0x56e929b2,
  Transfer = 0xfae3a09d,
  TotalSupply = 0xdcb736b5
}


@inline
function balanceKey(addr: Uint8Array): Uint8Array {
  const store = new Uint8Array(64);
  store.set(addr);
  store.set(BALANCE_POSITION, 32);

  return Crypto.blake2b256(store);
}

@inline
function allowanceKey(addr: Uint8Array): Uint8Array {
  const store = new Uint8Array(64);
  store.set(addr);
  store.set(BALANCE_POSITION, 32);

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

function balanceOf(params: Uint8Array): Uint8Array {
  const input = params.subarray(4);
  const owner = input;
  const data = Storage.get(balanceKey(owner), 16);
  if (data.length > 0) {
    return data;
  } else {
    return (new Uint8Array(16)).fill(0);
  }
}

function transfer(params: Uint8Array): void {
  const input = params.subarray(4);
  const owner = Contract.caller();
  const dest = input.subarray(0, 32);
  const value = u128.from(input.subarray(32, 48));

  const ownerKey = balanceKey(owner);
  const destKey = balanceKey(dest);

  const data = Storage.get(ownerKey, 16);
  const ownerBalance = (data.length > 0) ? u128.from(data): u128.from(0);

  const receiver = Storage.get(destKey, 16);
  const destBalance = (receiver.length > 0) ? u128.from(receiver): u128.from(0);

  if (ownerBalance >= value) {
    Storage.set(ownerKey, (ownerBalance - value).toUint8Array());
    Storage.set(destKey, (destBalance + value).toUint8Array());
  }
}

export function call(): void {
  const input = Contract.input();
  if (input.length < 4) {
    return;
  }

  const selector = bswap(load<i32>(input.dataStart, 0));
  switch (selector) {
    case Method.TotalSupply: {
      Contract.returnValue(totalSupply());
      break;
    }
    case Method.BalanceOf: {
      Contract.returnValue(balanceOf(input));
      break;
    }
    case Method.Transfer: {
      transfer(input);
      break;
    }
  }
  return;
}

export function deploy(): void {
  const input = Contract.input();
  if (input.length < 4) {
    return;
  }

  const total = input.subarray(4);
  const caller = Contract.caller();
  Storage.set(balanceKey(caller), total);
  Storage.set(STORE_KEY, total);
  return;
}