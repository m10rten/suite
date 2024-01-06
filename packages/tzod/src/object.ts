import type { Pretty } from "./g";

export interface IObject {
  /**
   * Merge two objects
   */
  merge: <T extends object, U extends object>(a: T, b: U) => Pretty<T & U>;
  /**
   * Get the keys of an object
   */
  keys: <T extends object>(a: T) => (keyof T)[];
  /**
   * Freeze an object
   */
  freeze: <T extends object>(a: T) => Readonly<T>;
  /**
   * Unfreeze an object
   */
  unfreeze: <T extends object>(a: Readonly<T>) => T;
  /**
   * Filter an object by key and value
   */
  filter: <T extends object>(
    a: T,
    fn: (key: keyof T, value: T[keyof T]) => boolean,
  ) => T;
  /**
   * Select keys from an object
   */
  select: <T extends object, U extends keyof T>(a: T, b: U[]) => Pretty<Pick<T, U>>;
  /**
   * Exclude keys from an object
   */
  exclude: <T extends object, U extends keyof T>(a: T, b: U[]) => Pretty<Omit<T, U>>;
}

/**
 * TObject class for object related methods
 */
export class TObject implements IObject {
  public merge<T extends object, U extends object>(a: T, b: U): Pretty<T & U> {
    return { ...a, ...b };
  }
  public keys<T extends object>(a: T): (keyof T)[] {
    return Object.keys(a) as (keyof T)[];
  }
  public freeze<T extends object>(a: T): Readonly<T> {
    return Object.freeze(a);
  }
  public unfreeze<T extends object>(a: Readonly<T>): T {
    return Object.assign({}, a);
  }
  public filter<T extends object>(
    a: T,
    fn: (key: keyof T, value: T[keyof T]) => boolean,
  ): T {
    return Object.fromEntries(
      Object.entries(a).filter(([key, value]) => fn(key as keyof T, value)),
    ) as T;
  }
  public select<T extends object, U extends keyof T>(a: T, b: U[]): Pretty<Pick<T, U>> {
    return Object.fromEntries(
      Object.entries(a).filter(([key]) => b.includes(key as U)),
    ) as Pretty<Pick<T, U>>;
  }
  public exclude<T extends object, U extends keyof T>(a: T, b: U[]): Pretty<Omit<T, U>> {
    return Object.fromEntries(
      Object.entries(a).filter(([key]) => !b.includes(key as U)),
    ) as Pretty<Omit<T, U>>;
  }
}
