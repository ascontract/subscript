import {
  seal_input,
  seal_return,
  seal_caller,
  seal_address,
  seal_gas_left,
  seal_balance,
  seal_value_transferred,
  seal_block_number,
  seal_now,
} from "./seal0";

export namespace Contract {
  const CAPACITY: i32 = 1024;

  /**
   * @name input
   * @description
   * Returns the address of the caller.
   */
  export function input(): Uint8Array {
    let out = new Uint8Array(CAPACITY);
    let out_len = new Int32Array(1);
    out_len[0] = CAPACITY;
    seal_input(out.dataStart as i32, out_len.dataStart as i32);
    let res = new Uint8Array(out_len[0]);
    memory.copy(res.dataStart, out.dataStart, out_len[0]);
    return res;
  }

  /**
   * @name returnValue
   * @description
   * Returns output buffer to contract
   */
  export function returnValue(value: Uint8Array): void {
    seal_return(0, value.dataStart as i32, value.length);
  }

  /**
   * @name caller
   * @description
   * Returns the address of the caller.
   */
  export function caller(): Uint8Array {
    let out = new Uint8Array(32);
    let out_len = new Int32Array(1);
    out_len[0] = out.length;

    seal_caller(out.dataStart as i32, out_len.dataStart as i32);
    return out;
  }

  /**
   * @name address
   * @description
   * Returns the address of the executed contract.
   */
  export function address(): Uint8Array {
    let out = new Uint8Array(32);
    let out_len = new Int32Array(1);
    out_len[0] = out.length;

    seal_address(out.dataStart as i32, out_len.dataStart as i32);
    let res = new Uint8Array(out_len[0]);
    memory.copy(res.dataStart, out.dataStart, out_len[0]);
    return res;
  }

  /**
   * @name gasLeft
   * @description
   * Returns the amount of gas left for the contract execution.
   */
  export function gasLeft(): Uint8Array {
    let out = new Uint8Array(16);
    let out_len = new Int32Array(1);
    out_len[0] = out.length;

    seal_gas_left(out.dataStart as i32, out_len.dataStart as i32);
    let res = new Uint8Array(out_len[0]);
    memory.copy(res.dataStart, out.dataStart, out_len[0]);
    return res;
  }

  /**
   * @name balance
   * @description
   * Returns the balance of the executed contract.
   */
  export function balance(): Uint8Array {
    let out = new Uint8Array(16);
    let out_len = new Int32Array(1);
    out_len[0] = out.length;

    seal_balance(out.dataStart as i32, out_len.dataStart as i32);
    let res = new Uint8Array(out_len[0]);
    memory.copy(res.dataStart, out.dataStart, out_len[0]);
    return res;
  }

  /**
   * @name transferredValue
   * @description
   * Returns the transferred balance for the contract execution.
   */
  export function transferredValue(): Uint8Array {
    let out = new Uint8Array(16);
    let out_len = new Int32Array(1);
    out_len[0] = out.length;

    seal_value_transferred(out.dataStart as i32, out_len.dataStart as i32);
    let res = new Uint8Array(out_len[0]);
    memory.copy(res.dataStart, out.dataStart, out_len[0]);
    return res;
  }

  /**
   * @name timestamp
   * @description
   * Returns the current block timestamp.
   */
  export function timestamp(): Uint8Array {
    let out = new Uint8Array(8);
    let out_len = new Int32Array(1);
    out_len[0] = out.length;

    seal_now(out.dataStart as i32, out_len.dataStart as i32);
    let res = new Uint8Array(out_len[0]);
    memory.copy(res.dataStart, out.dataStart, out_len[0]);
    return res;
  }

  /**
   * @name blockNumber
   * @description
   * Returns the address of the executed contract.
   */
  export function blockNumber(): Uint8Array {
    let out = new Uint8Array(8);
    let out_len = new Int32Array(1);
    out_len[0] = out.length;

    seal_block_number(out.dataStart as i32, out_len.dataStart as i32);
    let res = new Uint8Array(out_len[0]);
    memory.copy(res.dataStart, out.dataStart, out_len[0]);
    return res;
  }

}