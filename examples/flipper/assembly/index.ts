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

function get(): Uint8Array {
  const data = Storage.get(STORE_KEY, 1);
  const status: u8 = data.length ? (new DataView(data.buffer)).getUint8(0) : 0;
  return (new Uint8Array(1)).fill(status);
}

function flip(): bool {
  const data = Storage.get(STORE_KEY, 1);
  const status: u8 = data.length ? (new DataView(data.buffer)).getUint8(0) : 0;
  Storage.set(STORE_KEY, Util.toBytes(!status));
  return true;
}

export function call(): void {
  const input = Contract.input();
  if (input.length < 4) {
    return;
  }

  const selector = bswap(load<i32>(input.dataStart, 0));
  switch (selector) {
    case Method.Flip: {
      flip();
      break;
    }
    case Method.Get: {
      Contract.returnValue(get());
      break;
    }
  }
  return;
}

export function deploy(): void {
  return;
}
