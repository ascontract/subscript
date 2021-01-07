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
   * Converts typed array to array
   */
  export function typedToArray(arr: Uint8Array): Array<u8> {
    let result = new Array<u8>(arr.length);
    for (let i = 0; i < arr.length; i++) {
        result[i] = arr[i];
    }
    return result;
  }

  /**
   * Converts array to typed array
   */
  export function arrayToTyped(arr: Array<u8>): Uint8Array {
    let result = new Uint8Array(arr.length);
    for (let i = 0; i < arr.length; i++) {
        result[i] = arr[i];
    }
    return result;
  }

  export function arrayEqual<T>(a: Array<T>, b: Array<T>): bool {
    if (a.length != b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i++) {
      if (a[i] != b[i]) {
        return false;
      }
    }
    return true;
  }

  export function toBytes<T>(num: T): Uint8Array {
    if (isInteger<T>()) {
      const arr = new Uint8Array(sizeof<T>());
      store<T>(arr.dataStart, num);
      return arr;
    }
    assert(false);
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