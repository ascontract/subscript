import {
  Util,
  Storage,
  Contract
} from "@subscript/core";

const STORE_KEY = (new Uint8Array(32)).fill(0);

enum Method {
  Get = 0x1e5ca456,
  Flip = 0xc096a5f3,
}

function handle(input: Uint8Array): Uint8Array {
  if (input.length < 4) {
    return (new Uint8Array(0));
  }

  const data = Storage.get(STORE_KEY, 1);
  const status: u8 = data.length ? (new DataView(data.buffer)).getUint8(0) : 0;

  const selector = bswap(load<i32>(input.dataStart, 0));
  switch (selector) {
    case Method.Flip: {
      Storage.set(STORE_KEY, Util.toBytes(!status));
      return (new Uint8Array(0));
    }
    case Method.Get: {
      return (new Uint8Array(1)).fill(status);
    }
  }
  return (new Uint8Array(0));
}

export function call(): void {
  const out = handle(Contract.input());
  if (out.length > 0) {
    Contract.returnValue(out);
  }
  return;
}

export function deploy(): void {
  return;
}
