import {
  seal_hash_blake2_128,
  seal_hash_blake2_256,
  seal_hash_keccak_256,
  seal_hash_sha2_256
} from "./seal0";

export namespace Crypto {
  /**
   * @name blake2b128
   * @description
   * Computes the BLAKE2 128-bit hash on the given input buffer.
   */

  export function blake2b128(value: Uint8Array): Uint8Array {
    const out = new Uint8Array(16);
    seal_hash_blake2_128(value.dataStart as i32, value.length, out.dataStart as i32)
    return out;
  }

    /**
   * @name blake2b256
   * @description
   * Computes the BLAKE2 256-bit hash on the given input buffer.
   */

  export function blake2b256(value: Uint8Array): Uint8Array {
    const out = new Uint8Array(32);
    seal_hash_blake2_256(value.dataStart as i32, value.length, out.dataStart as i32)
    return out;
  }

    /**
   * @name keccack256
   * @description
   * Computes the KECCAK 256-bit hash on the given input buffer.
   */

  export function keccack256(value: Uint8Array): Uint8Array {
    const out = new Uint8Array(32);
    seal_hash_keccak_256(value.dataStart as i32, value.length, out.dataStart as i32)
    return out;
  }

    /**
   * @name sha256
   * @description
   * Computes the SHA2 256-bit hash on the given input buffer.
   */

  export function sha256(value: Uint8Array): Uint8Array {
    const out = new Uint8Array(32);
    seal_hash_sha2_256(value.dataStart as i32, value.length, out.dataStart as i32)
    return out;
  }
}