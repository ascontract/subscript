/**
 * Stores a random number for the current block and the given subject into the supplied buffer.
 * The output is encode with (Hash, Blocknumber)
 */
export declare function seal_random(
  subject_ptr: i32,
  subject_len: i32,
  output_ptr: i32,
  out_len_ptr: i32
): void;
