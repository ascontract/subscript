import { Storage } from "@subscript/core";

const STORE_KEY = (new Uint8Array(32)).fill(0);

enum Method {
  Get = 0,
  Flip
}

function handle(input: Uint8Array): Uint8Array {
  const state = Storage.get(STORE_KEY);
  return state;
}

export function call(): u32 {
  return 0;
}

export function deploy(): u32 {
  return 0;
}
