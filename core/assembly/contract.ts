import {
  seal_input
} from "./seal0";


export namespace Contract {
  /**
   * @name seal_input
   * @description
   * Returns the address of the caller.
   */
  export function seal_input(): Uint8Array {
    let input = new Uint8Array(0);
    return input;
  }
}
