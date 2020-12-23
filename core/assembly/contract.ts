import {
  seal_input,
  seal_return
} from "./seal0";


export namespace Contract {
  /**
   * @name seal_input
   * @description
   * Returns the address of the caller.
   */

  const CAPACITY: i32 = 1024;

  export function input(): Uint8Array {
    let out = new Uint8Array(CAPACITY);
    let out_len = new Int32Array(1);
    out_len[0] = CAPACITY;
    seal_input(out.dataStart as i32, out_len.dataStart as i32);
    let res = new Uint8Array(out_len[0]);
    memory.copy(res.dataStart, out.dataStart, out_len[0]);
    return res;
  }

  export function returnValue(value: Uint8Array): void {
    seal_return(0, value.dataStart as i32, value.length)
  }
}
