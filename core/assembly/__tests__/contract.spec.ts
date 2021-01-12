import { BytesReader } from "as-scale-codec";
import { AccountId } from "../types";
import { Util } from "../util";

describe("contract", () => {
  it("AccountId from bytes", () => {
    const bytes = new Array<u8>(32).fill(0x01);
    expect<Array<u8>>(AccountId.fromU8Array(bytes).toU8a()).toStrictEqual(bytes, "Gen account from bytes");
  });

  it("AccountId from stream", () => {
    // Make encoded data of two AccountId
    const addr1 = new Array<u8>(32).fill(0x01);
    const addr2 = new Array<u8>(32).fill(0x02);
    let input = new Array<u8>();
    input = input.concat(addr1);
    input = input.concat(addr2);

    // Read two Account from input data
    let reader = new BytesReader(input);
    const acc1 = reader.readInto<AccountId>();
    const acc2 = reader.readInto<AccountId>();

    expect<Array<u8>>(acc1.toU8a()).toStrictEqual(addr1, "Gen account 1 from stream");
    expect<Array<u8>>(acc2.toU8a()).toStrictEqual(addr2, "Gen account 1 from stream");
  });

  it("AccountId from buffer with encoded length", () => {
    // Make encoded data of two AccountId
    const addr1 = new Array<u8>(32).fill(0x01);
    const addr2 = new Array<u8>(32).fill(0x02);
    const num = new Array<u8>(4).fill(0);
    let input = new Array<u8>();
    input = input.concat(addr1);
    input = input.concat(addr2);
    input = input.concat(num);

    // Read two Account from input data
    let reader = new BytesReader(input);
    const acc1 = reader.readInto<AccountId>();
    const acc2 = reader.readInto<AccountId>();

    expect<Array<u8>>(acc1.toU8a()).toStrictEqual(addr1, "Gen account 1 from stream");
    expect<Array<u8>>(acc2.toU8a()).toStrictEqual(addr2, "Gen account 1 from stream");
    // 4 bytes left after decode two account
    expect<usize>(reader.getLeftoverBytes().length).toStrictEqual(4, "Left 4 bytes for decode 2 accounts");
  });

  it("Decode i32 from buffer", () => {
    // Make encoded data of i32
    const buf = new Array<u8>(4).fill(0x00);

    let reader = new BytesReader(buf);
    let num = Util.decodeScale<i32>(reader);

    expect<i32>(num).toStrictEqual(0, "Decode i32 from stream");
    expect<usize>(reader.getLeftoverBytes().length).toStrictEqual(0, "Left 0 bytes for decode 1 number");
  });

  it("Encode string to bytes without null terminator", () => {
    const s = "abc";
    let bytes = Util.stringToBytes(s);

    expect(bytes.length).toStrictEqual(3, "abc string should be 3 bytes");
    expect(bytes[0]).toStrictEqual(97, "a => 97");
    expect(bytes[1]).toStrictEqual(98, "b => 98");
    expect(bytes[2]).toStrictEqual(99, "c => 99");
  });

  it("Decode bytes to string", () => {
    let bytes = new Uint8Array(3);
    bytes[0] = 97;
    bytes[1] = 98;
    bytes[2] = 99;

    let s = Util.bytesToString(bytes);
    expect<string>(s).toStrictEqual("abc", "abc string decode from bytes");
  });

});
