import { u128 } from "as-bignum";
import { Codec, Hash } from "as-scale-codec";
import { Util } from "./util";

export class AccountId implements Codec {
	// The byte length of Account Address
  public static readonly ADDRESS_LENGTH: i32 = 32;
	// Bytes Array of the Account Address
  private _address: u8[];

  constructor(bytes: u8[] = []) {
    this._address = new Array<u8>();
    this._address = this._address.concat(bytes);
  }

  getAddress(): u8[] {
    return this._address;
  }

  encodedLength(): i32 {
    return this._address.length;
  }

  toU8a(): u8[]{
    return this._address;
  }

  populateFromBytes(bytes: u8[], index: i32 = 0): void {
    assert(bytes.length - index >= AccountId.ADDRESS_LENGTH, "AccountId: must be 32 bytes length");
    this._address = new Array<u8>();
    this._address = this._address.concat(bytes.slice(index, index + AccountId.ADDRESS_LENGTH));
  }

  eq(other: AccountId): bool {
    return Util.arrayEqual(this.getAddress(), other.getAddress());
  }

  notEq(other: AccountId): bool {
    return this.eq(other);
  }

  toString (): string {
    return this._address.toString();
  }

 	/**
   * Create new Account ID from Bytes Array
   */
  static fromU8Array(input: u8[]): AccountId {
    const a = input.slice(0, AccountId.ADDRESS_LENGTH);
    return new AccountId(a);
  }

  @inline @operator('==')
  static eq(a: AccountId, b: AccountId): bool{
      return a.eq(b);
  }

  @inline @operator('!=')
  static notEq(a: AccountId, b: AccountId): bool{
      return a.notEq(b);
  }
}

export { u128 as Balance };
export { Hash };