export interface IObject {
  merge: <T extends object, U extends object>(a: T, b: U) => Pretty<T & U>;
  keys: <T extends object>(a: T) => (keyof T)[];
  freeze: <T extends object>(a: T) => Readonly<T>;
  unfreeze: <T extends object>(a: Readonly<T>) => T;
  filter: <T extends object>(
    a: T,
    fn: (key: keyof T, value: T[keyof T]) => boolean,
  ) => T;
  select: <T extends object, U extends keyof T>(a: T, b: U[]) => Pretty<Pick<T, U>>;
  exclude: <T extends object, U extends keyof T>(a: T, b: U[]) => Pretty<Omit<T, U>>;
  // flatten: <T extends object>(a: T) => Pretty<Flatten<T>>;
}

// type Flatten<T> = T extends object ? { [K in keyof T]: T[K] } : T;

type Pretty<T> = { [K in keyof T]: T[K] } & unknown;
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
  // public flatten<T extends object>(a: T): Pretty<Flatten<T>> {
  //   return Object.fromEntries(
  //     Object.entries(a).map(([key, value]) => {
  //       return typeof value === "object"
  //         ? Object.entries(value).map(([k, v]) => [`${key}.${k}`, v])
  //         : [key, value];
  //     }),
  //   ) as Pretty<Flatten<T>>;
  // }
}
