// Runtime WebAssembly module.
// Set the value specified by the given key in the storage.
export declare function seal_set_storage(
  key_ptr: i32,
  value_ptr: i32,
  value_len: i32
): void;

// Clear the value under the given key in the storage.
export declare function seal_clear_storage(key_ptr: i32): void;

// Read the value under the given key in the storage.
export declare function seal_get_storage(
  key_ptr: i32,
  out_ptr: i32,
  out_len_ptr: i32
): i32;

// Transfer some value to another account.
export declare function seal_transfer(
  account_ptr: i32,
  account_len: i32,
  value_ptr: i32,
  value_len: i32
): i32;

// Make a call to another contract.
export declare function seal_call(
  callee_ptr: i32,
  callee_len: i32,
  gas: u64,
  value_ptr: i32,
  value_len: i32,
  input_ptr: i32,
  input_len: i32,
  output_ptr: i32,
  output_len_ptr: i32
): i32;

// Instantiate a contract with the specified code hash.
export declare function seal_instantiate(
  code_hash_ptr: i32,
  code_hash_len: i32,
  gas: u64,
  value_ptr: i32,
  value_len: i32,
  input_ptr: i32,
  input_len: i32,
  address_ptr: i32,
  address_len_ptr: i32,
  output_ptr: i32,
  output_len_ptr: i32,
  salt_ptr: i32,
  salt_len: i32
): i32;

// It copies the input to the contract call to supplied buffer
export declare function seal_input(
  buf_ptr: i32,
  buf_len_ptr: i32
): void;

// Cease contract execution and save a data buffer as a result of the
// execution.
export declare function seal_return(
  flags: u32,
  data_ptr: i32,
  data_len: i32
): void;

// Dump the address of the caller into the supplied buffer.
export declare function seal_caller(
  data_ptr: i32,
  data_len_ptr: i32
): void;

// Retrive the address of contract into the supplied buffer.
export declare function seal_address(
  out_ptr: i32,
  out_len_ptr: i32
): void;

// Dump the amount of gas left into the supplied buffer.
export declare function seal_gas_left(
  out_ptr: i32,
  out_len_ptr: i32
): void;

// Dump the balance of the current account into the supplied buffer.
export declare function seal_balance(
  out_ptr: i32,
  out_len_ptr: i32
): void;

// Retrive the value transferred along with this call or as endowment into the supplied buffer.
export declare function seal_value_transferred(
  out_ptr: i32,
  out_len_ptr: i32
): void;

// Stores a random number for the current block and the given subject into the supplied buffer.
export declare function seal_random(
  subject_ptr: i32,
  subject_len: i32,
  output_ptr: i32,
  out_len_ptr: i32
): void;

// Load the latest block timestamp into the supplied buffer.
export declare function seal_now(
  output_ptr: i32,
  out_len_ptr: i32
): void;

// Deposit a contract event with the data buffer and optional list of topics. There is a limit
// on the maximum number of topics specified by `max_event_topics`.
export declare function seal_deposit_event(
  topics_ptr: i32,
  topics_len: i32,
  data_ptr: i32,
  data_len: i32
): void;

// Dump current block number of contract into the supplied buffer.
export declare function seal_block_number(
  out_ptr: i32,
  out_len_ptr: i32
): void;

// Computes the SHA2 256-bit hash on the given input buffer.
export declare function seal_hash_sha2_256(
  input_ptr: i32,
  input_len: i32,
  output_ptr: i32
): void;

// Computes the KECCAK 256-bit hash on the given input buffer.
export declare function seal_hash_keccak_256(
  input_ptr: i32,
  input_len: i32,
  output_ptr: i32
): void;

// Computes the BLAKE2 128-bit hash on the given input buffer.
export declare function seal_hash_blake2_128(
  input_ptr: i32,
  input_len: i32,
  output_ptr: i32
): void;

// Computes the BLAKE2 256-bit hash on the given input buffer.
export declare function seal_hash_blake2_256(
  input_ptr: i32,
  input_len: i32,
  output_ptr: i32
): void;