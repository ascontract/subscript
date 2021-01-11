import { Hash, CompactInt, BIT_LENGTH } from "as-scale-codec";
import { Contract } from "./env";
import { AccountId, Balance } from "./types";
import { Util } from "./util";

class Context {
  /**
   * @description Returns the input data of call tx
   */
  @inline
  static get input(): Uint8Array {
    return Contract.input();
  }

  /**
   * @description Returns the address of the caller.
   */
  static get caller(): AccountId {
    const data = Contract.caller();
    return AccountId.fromU8Array(Util.typedToArray(data));
  }

  /**
   * @description Returns the address of the executed contract.
   */
  static get address(): AccountId {
    const data = Contract.address();
    return AccountId.fromU8Array(Util.typedToArray(data));
  }

  /**
   * @description Returns the amount of gas left for the contract execution.
   */
  static get gasLeft(): u64 {
    const data = Contract.gasLeft();
    return load<u64>(data.dataStart, 0);
  }

  /**
   * @description Returns the balance of the executed contract.
   */
  static get balance(): Balance {
    const data = Contract.balance();
    return Balance.fromUint8ArrayLE(data);
  }

  /**
   * @description Returns the transferred balance for the contract execution.
   */
  static get transferredValue(): Balance {
    const data = Contract.transferredValue();
    return Balance.fromUint8ArrayLE(data);
  }

  /**
   * @description Returns the current block timestamp with unit of millisecond.
   */
  static get timestamp(): u64 {
    const data = Contract.timestamp();
    return load<u64>(data.dataStart, 0);
  }

  /**
   * @description Returns the blocknumber of the current context.
   */
  static get blockNumber(): u32 {
    const data = Contract.blockNumber();
    return load<u32>(data.dataStart, 0);
  }
}

export { Context as context };