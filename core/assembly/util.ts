export namespace Util {
  /**
   * Convert a given string into a Uint8Array encoded as UTF-8.
   */
  export function stringToBytes(s: string): Uint8Array {
    let len = String.UTF8.byteLength(s, true) - 1;
    let bytes = new Uint8Array(len);
    memory.copy(bytes.dataStart, toUTF8(s), len);
    return bytes;
  }

  /**
   * Decode an UTF-8 encoded Uint8Array into a string.
   */
  export function bytesToString(bytes: Uint8Array | null): string | null {
    if (bytes == null) {
      return null;
    }
    return String.UTF8.decode(uint8ArrayToBuffer(bytes), true);
  }

  /**
   * Calculates the byte length of the specified UTF-8 string, which can optionally be null terminated.
   */
  export function UTF8Length(
    str: string,
    nullTerminated: boolean = false
  ): usize {
    return String.UTF8.byteLength(str, nullTerminated);
  }

  function uint8ArrayToBuffer(array: Uint8Array): ArrayBuffer {
    return array.buffer.slice(
      array.byteOffset,
      array.byteLength + array.byteOffset
    );
  }

  function toUTF8(str: string, nullTerminated: boolean = false): usize {
    return changetype<usize>(String.UTF8.encode(str, nullTerminated));
  }
}