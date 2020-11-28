import {
  seal_get_storage,
  seal_set_storage
} from "./seal0";

export namespace storage {
  export function set(key: Uint8Array, value: Uint8Array | null): void {
    if(key.length === 32) {
      const pointer = value!.dataStart as i32 || 0;
      const length = value ? value.length : 0;
      seal_set_storage(key.dataStart as i32, pointer, length);
    }
  }

  export function get(key: Uint8Array): Uint8Array {
    const result = seal_get_storage(key.dataStart as i32);
    let value = new Uint8Array(0);

    return value;
  }
}