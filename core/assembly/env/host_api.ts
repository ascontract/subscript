// Runtime WebAssembly module.
export namespace hostapi {
  // Set the value specified by the given key in the storage.
  export declare function ext_set_storage(
    key_ptr: i32,
    value_ptr: i32,
    value_len: i32
  ): void;

  // Clear the value under the given key in the storage.
  export declare function ext_clear_storage(key_ptr: i32): void;

  // Read the value under the given key in the storage.
  export declare function ext_get_storage(
      key_ptr: i32
  ): i32;

  // Transfer some value to another account.
  export declare function ext_transfer(
    account_ptr: i32,
    account_len: i32,
    value_ptr: i32,
    value_len: i32
  ): i32;

  // Make a call to another contract.
  export declare function ext_call(
    callee_ptr: i32,
    callee_len: i32,
    gas: u64,
    value_ptr: i32,
    value_len: i32,
    input_ptr: i32,
    input_len: i32
  ): i32;

  // Instantiate a contract with the specified code hash.
  export declare function ext_instantiate(
    code_hash_ptr: i32,
    code_hash_len: i32,
    gas: u64,
    value_ptr: i32,
    value_len: i32,
    input_ptr: i32,
    input_len: i32
  ): i32;

  // Cease contract execution and save a data buffer as a result of the
  // execution.
  export declare function ext_return(
    data_ptr: i32,
    data_len: i32
  ): void;

  // Dump the address of the caller into the supplied buffer.
  export declare function ext_caller(): void;

  // Retrive the address of contract into the supplied buffer.
  export declare function ext_address(): void;

  // Dump the amount of gas left into the supplied buffer.
  export declare function ext_gas_left(): void;

  // Dump the balance of the current account into the supplied buffer.
  export declare function ext_balance(): void;

  // Deposit a contract event with the data buffer and optional list of topics. There is a limit
  // on the maximum number of topics specified by `max_event_topics`.
  export declare function ext_deposit_event(
    topics_ptr: i32,
    topics_len: i32,
    data_ptr: i32,
    data_len: i32
  ): void;

  // Dump current block number of contract into the supplied buffer.
  export declare function ext_block_number(): void;

  // Computes the SHA2 256-bit hash on the given input buffer.
  export declare function ext_hash_sha2_256(
    input_ptr: i32,
    input_len: i32,
    output_ptr: i32)
  : void;

  // Computes the KECCAK 256-bit hash on the given input buffer.
  export declare function ext_hash_keccak_256(
    input_ptr: i32,
    input_len: i32,
    output_ptr: i32)
  : void;

  // Computes the BLAKE2 128-bit hash on the given input buffer.
  export declare function ext_hash_blake2_128(
    input_ptr: i32,
    input_len: i32,
    output_ptr: i32)
  : void;

  // Computes the BLAKE2 256-bit hash on the given input buffer.
  export declare function ext_hash_blake2_256(
    input_ptr: i32,
    input_len: i32,
    output_ptr: i32)
  : void;
}
