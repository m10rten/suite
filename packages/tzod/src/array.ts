export interface IArray {
  /**
   * Shuffle an array
   * @param array
   * @returns Shuffled array
   */
  shuffle: <T>(array: T[]) => T[];

  /**
   * Get a random element from an array
   * @param array
   * @returns Random element from array
   */
  random: <T>(array: T[]) => T;

  /**
   * Clone an array
   * @param array
   * @returns Cloned array
   */
  clone: <T>(array: T[]) => T[];

  /**
   * Easy sort an array
   *
   * To sort an array of primitives, use `array.sort()`
   *
   * It will error if the array is not an array, or if the key does not exist on the object or if the key is not a string or if the element is not an object when a key is provided.
   *
   * Sorting of primitives requires no key to be provided.
   * @param array
   * @param {keyof T} key - Key to sort by, or undefined/null to sort primitives
   * @param order
   * @returns Sorted array
   */
  sort: <T, K extends keyof T>(array: T[], key: K, order?: "asc" | "desc") => T[];
}

export class TArray implements IArray {
  public shuffle<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }
  public random<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)] as T;
  }
  public clone<T>(array: T[]): T[] {
    return [...array];
  }
  public sort<T, K extends keyof T>(
    array: T[],
    key?: K | null,
    order?: "asc" | "desc",
  ): T[] {
    if (!Array.isArray(array)) throw new Error("Array is not an array");

    return array.sort((a, b) => {
      if (!key) {
        if (order === "desc") {
          return a > b ? -1 : a < b ? 1 : 0;
        }
        return a < b ? -1 : a > b ? 1 : 0;
      }
      if (typeof key !== "string") throw new Error("Key is not a string");

      if (typeof a !== "object" || typeof b !== "object" || !a || !b)
        throw new Error("Element is not an object");
      if (!a[key] || !b[key]) throw new Error("Key does not exist on object");
      const x = a[key];
      const y = b[key];
      if (order === "desc") {
        return x > y ? -1 : x < y ? 1 : 0;
      }
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }
}
