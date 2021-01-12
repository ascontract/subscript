import { BytesReader } from "as-scale-codec";
import { AccountId } from "../types";

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
});
