import { u128 } from "as-bignum";
import { BytesReader } from "as-scale-codec";


export namespace Util {
  /**
   * Convert a given string into a Uint8Array encoded as UTF-8.
   */
  export function stringToBytes(s: string): Uint8Array {
    let utf8Bytes = String.UTF8.encode(s);
    return Uint8Array.wrap(utf8Bytes);
  }

  /**
   * Decode an UTF-8 encoded Uint8Array into a string.
   */
  export function bytesToString(bytes: Uint8Array): string {
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

  /**
   * Test two array are strict equeal
   */
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

  /**
   * Convert a number to raw bytes
   */
  export function toBytes<T>(num: T): Uint8Array {
    if (isInteger<T>()) {
      const arr = new Uint8Array(sizeof<T>());
      store<T>(arr.dataStart, num);
      return arr;
    }
    assert(false);
  }

  /**
   * Encode a fixed number to scale-codec bytes
   */
  export function encodeNumber<T>(num: T): u8[] {
    if (isInteger<T>()) {
      const arr = new Array<u8>(sizeof<T>());
      store<T>(arr.dataStart, num);
      return arr;
    }
    assert(false);
  }

  /**
   * Decode objects from scale-codec bytes, The target needs to implement
   * scale codec interface
   */
  export function decodeScale<T>(reader: BytesReader): T {
    if (isInteger<T>()) {
      const bytes = reader.readBytes(sizeof<T>());
      return load<T>(bytes.dataStart, 0);
    }
    return reader.readInto<T>();
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