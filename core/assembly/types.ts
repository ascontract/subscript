import { u128 } from "as-bignum";
import { Codec, Hash } from "as-scale-codec";
import { Util } from "./util";

/**
 * Account ID of substrate account address with scale-codec
 */
export class AccountId implements Codec {
	// The byte length of Account Address
  public static readonly ADDRESS_LENGTH: i32 = 32;
	// Bytes Array of the Account Address
  private _address: u8[];

  constructor(bytes: u8[] = []) {
    this._address = new Array<u8>();
    this._address = this._address.concat(bytes);
  }

  /**
   * Returns the Bytes that represent the address
   */
  getAddress(): u8[] {
    return this._address;
  }

  /**
   * The the length of bytes for encoding AccountId with scale-codec
   */
  encodedLength(): i32 {
    return this._address.length;
  }

  /**
   * Converts AccouontId to encoded bytes
   */
  toU8a(): u8[]{
    return this._address;
  }

  /**
   * Converts encoded bytes to AccountId instance
   */
  populateFromBytes(bytes: u8[], index: i32 = 0): void {
    assert(bytes.length - index >= AccountId.ADDRESS_LENGTH, "AccountId: must be 32 bytes length");
    this._address = new Array<u8>();
    this._address = this._address.concat(bytes.slice(index, index + AccountId.ADDRESS_LENGTH));
  }

  /**
   * Test two instance equal
   */
  eq(other: AccountId): bool {
    return Util.arrayEqual(this.getAddress(), other.getAddress());
  }

  /**
   * Test two instance not equal
   */
  notEq(other: AccountId): bool {
    return this.eq(other);
  }

  /**
   * Format AccountId to string
   */
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