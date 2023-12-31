import { z } from "zod";

export interface IString {
  /**
   * Convert a string to uppercase
   */
  upper: <T extends string>(value: T) => UpperCased<T>;
  /**
   * Convert a string to lowercase
   */
  lower: <T extends string>(value: T) => LowerCased<T>;
  /**
   * Reverse a string
   */
  reverse: <T extends string>(value: T) => Reversed<T>;
  /**
   * Warning, do not use this function for type checking because it does not use guards as the `t.is` property does.
   * Use `t.is.falsy(value)` instead.
   */
  empty: <T extends string>(value: T) => StringBase<T, Empty<T>>;
  /**
   * Check if a string has a substring
   */
  has: <T extends string, U extends string>(value: T, search: U) => Has<T, U>;

  /**
   * Quote a string, eg. `quote("hello")` returns "\"hello\""
   */
  quote: <T extends string>(value: T) => Quoted<T>;
}

type Reverse<T extends string> = T extends `${infer F}${infer R}`
  ? `${Reverse<R>}${F}`
  : T;
type Reversed<T> = T extends `${infer F}` ? `${Reverse<F>}` : T;
type LowerCased<T> = T extends `${infer F}` ? `${Lowercase<F>}` : T;

type Quoted<T extends string> = T extends `${infer F}` ? `"${F}"` : T;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Has<T extends string, U extends string> = T extends `${infer _F}${U}${infer _R}`
  ? true
  : false;

type UpperCased<T> = T extends `${infer F}` ? `${Uppercase<F>}` : T;

type StringBase<T, A> = T extends string ? A : never;
type Empty<T> = T extends "" ? true : false;

const s = z.string();

/**
 * TString class for string related methods, for use with `t.string`.
 * Fully type safe return values
 */
export class TString implements IString {
  public upper<T extends string>(value: T): StringBase<T, UpperCased<T>> {
    return s.safeParse(value).success
      ? (s.transform((v) => v.toUpperCase()).parse(value) as StringBase<
          T,
          UpperCased<T>
        >)
      : (value as never);
  }
  public lower<T extends string>(value: T): StringBase<T, LowerCased<T>> {
    return s.safeParse(value).success
      ? (s.transform((v) => v.toLowerCase()).parse(value) as StringBase<
          T,
          LowerCased<T>
        >)
      : (value as never);
  }
  public reverse<T extends string>(value: T): StringBase<T, Reversed<T>> {
    return s.safeParse(value).success
      ? (s.transform((v) => v.split("").reverse().join("")).parse(value) as StringBase<
          T,
          Reversed<T>
        >)
      : (value as never);
  }
  public empty<T extends string>(value: T): StringBase<T, Empty<T>> {
    return (value === "" ? true : false) as StringBase<T, Empty<T>>;
  }
  public has<T extends string, U extends string>(value: T, search: U): Has<T, U> {
    return (value.includes(search) ? true : false) as Has<T, U>;
  }
  public quote<T extends string>(value: T): StringBase<T, Quoted<T>> {
    return s.safeParse(value).success
      ? (s.transform((v) => `"${v}"`).parse(value) as StringBase<T, Quoted<T>>)
      : (value as never);
  }
}
