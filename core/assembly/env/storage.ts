import {
  seal_get_storage,
  seal_clear_storage,
  seal_set_storage
} from "../seal0";

export namespace Storage {
  export function set(key: Uint8Array, value: Uint8Array | null): void {
    if(key.length === 32) {
      const pointer = value!.dataStart as i32 || 0;
      const length = value ? value.length : 0;
      seal_set_storage(key.dataStart as i32, pointer, length);
    }
  }

  export function get(key: Uint8Array, length: i32): Uint8Array {
    let value = new Uint8Array(length);
    let out_len = new Int32Array(1);
    out_len[0] = length;

    const result = seal_get_storage(key.dataStart as i32, value.dataStart as i32, out_len.dataStart as i32);
    return value;
  }

  export function clear(key: Uint8Array): void {
    assert(key.length <= 32, "Store Key: must be 32 bytes length");
    seal_clear_storage(key.dataStart as i32);
  }
}