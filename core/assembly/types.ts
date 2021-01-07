import { u128 } from "as-bignum";
import { Codec } from "as-scale-codec";
import { Util } from "./util";

export class AccountId implements Codec {
	// The byte length of Account Address
  public static readonly ADDRESS_LENGTH:i32 = 32;
	// Bytes Array of the Account Address
  private address: u8[];

  constructor(bytes: u8[] = []) {
      this.address = new Array<u8>();
      this.address = this.address.concat(bytes);
  }

  getAddress(): u8[] {
      return this.address;
  }

  encodedLength(): i32 {
      return this.address.length;
  }

  toU8a(): u8[]{
      return this.address;
  }

  populateFromBytes(bytes: u8[], index: i32 = 0): void {
      this.address = new Array<u8>();
      this.address = this.address.concat(bytes.slice(index, AccountId.ADDRESS_LENGTH));
  }

  eq(other: AccountId): bool {
      return Util.arrayEqual(this.getAddress(), other.getAddress());
  }

  notEq(other: AccountId): bool {
      return this.eq(other);
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