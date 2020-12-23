import { Storage, Contract } from "@subscript/core";

const STORE_KEY = (new Uint8Array(32)).fill(0);

enum Method {
  Get = 0,
  Flip
}

function handle(input: Uint8Array): Uint8Array {
  const state = Storage.get(STORE_KEY, 16);
  return (new Uint8Array(1)).fill(0);
}

export function call(): void {
  const out = handle(new Uint8Array(0));
  if (out.length > 0) {
    Contract.returnValue(out);
  }
  return;
}

export function deploy(): void {
  return;
}
