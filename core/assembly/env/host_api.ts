// Runtime WebAssembly module.
export namespace hostapi {

  // Retrive the address of the current contract.
  export declare function ext_address(): void;

  // Retrive current block number of the contract.
  export declare function ext_block_number(): void;

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

}
