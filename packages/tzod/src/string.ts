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

  /**
   * Check if string matches email regex
   */
  email: <T>(value: T) => boolean;

  /**
   * Check if a string is an URL
   */
  url: <T>(value: T) => boolean;

  /**
   * Truncate a string with a specified length
   *
   * @param value The string to truncate
   * @param length The length to truncate the string to
   * @returns The truncated string: "hello world", 5 -> "hello..."
   */
  truncate: <T extends string>(value: T, length: number) => string;

  /**
   * Different casing methods
   */
  casing: {
    /**
     *
     * @param value Example: "hello world"
     * @returns "hello-world"
     */
    kebab: <T extends string>(value: T) => KebabCased<T>;
    /**
     * Transform a string to snake case
     *
     * If you want UPPER_SNAKE_CASE, use `upper` method after or before using this method
     * @param value Example: "hello world"
     * @returns "hello_world"
     */
    snake: <T extends string>(value: T) => SnakeCased<T>;
    /**
     *
     * @param value Example: "hello world"
     * @returns "helloWorld"
     */
    camel: <T extends string>(value: T) => CamelCased<T>;
    /**
     *
     * @param value Example: "hello world"
     * @returns "HelloWorld"
     */
    pascal: <T extends string>(value: T) => PascalCased<T>;
    /**
     *
     * @param value Example: "hello world"
     * @returns "hello.world"
     */
    dot: <T extends string>(value: T) => DotCased<T>;

    /**
     * Checks for different casing methods
     */
    is: {
      /**
       * Check if a string is in kebab case
       */
      kebab: <T extends string>(value: KebabCased<T>) => value is KebabCased<T>;
      /**
       * Check if a string is in snake case
       */
      snake: <T extends string>(value: SnakeCased<T>) => value is SnakeCased<T>;
      /**
       * Check if a string is in camel case
       */
      camel: <T extends string>(value: CamelCased<T>) => value is CamelCased<T>;
      /**
       * Check if a string is in pascal case
       */
      pascal: <T extends string>(value: PascalCased<T>) => value is PascalCased<T>;
      /**
       * Check if a string is in dot case
       */
      dot: <T extends string>(value: DotCased<T>) => value is DotCased<T>;
    };
  };

  /**
   * Words related methods
   */
  words: {
    /**
     * Count the number of words in a string
     */
    count: <T extends string>(value: T) => number;

    /**
     * Find the longest word in a string
     *
     * Returns the longest word or an array of longest words
     */
    longest: <T extends string>(value: T) => string | string[];
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Email<T> = T extends `${infer _F}@${infer _R}.${infer _E}` ? true : false;

export type Reverse<T extends string> = T extends `${infer F}${infer R}`
  ? `${Reverse<R>}${F}`
  : T;

export type Reversed<T> = T extends `${infer F}` ? `${Reverse<F>}` : T;

export type LowerCased<T> = T extends `${infer F}` ? `${Lowercase<F>}` : T;

export type Quoted<T extends string> = T extends `${infer F}` ? `"${F}"` : T;

export type Has<
  T extends string,
  U extends string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
> = T extends `${infer _F}${U}${infer _R}` ? true : false;

export type UpperCased<T> = T extends `${infer F}` ? `${Uppercase<F>}` : T;

export type KebabCased<T> = T extends `${infer F} ${infer R}`
  ? `${F}-${KebabCased<R>}`
  : T;

export type SnakeCased<T> = T extends `${infer F} ${infer R}`
  ? `${F}_${SnakeCased<R>}`
  : T;

export type CamelCased<T> = T extends `${infer F} ${infer R}`
  ? `${LowerCased<F>}${Capitalize<CamelCased<LowerCased<R>>>}`
  : T;
export type PascalCased<T> = T extends `${infer F} ${infer R}`
  ? `${Capitalize<LowerCased<F>>}${Capitalize<PascalCased<LowerCased<R>>>}`
  : T;
export type DotCased<T> = T extends `${infer F} ${infer R}` ? `${F}.${DotCased<R>}` : T;

export type StringBase<T, A> = T extends string ? A : never;

export type Empty<T> = T extends "" ? true : false;

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
    return (value === "" || Object.is(value, "") ? true : false) as StringBase<
      T,
      Empty<T>
    >;
  }
  public has<T extends string, U extends string>(value: T, search: U): Has<T, U> {
    return (value.includes(search) ? true : false) as Has<T, U>;
  }
  public quote<T extends string>(value: T): StringBase<T, Quoted<T>> {
    return s.safeParse(value).success
      ? (s.transform((v) => `"${v}"`).parse(value) as StringBase<T, Quoted<T>>)
      : (value as never);
  }
  public email<T>(value: T) {
    return s.email().safeParse(value).success;
  }

  public url<T>(value: T) {
    return s.url().safeParse(value).success;
  }

  public truncate<T extends string>(value: T, length: number) {
    const r = s.safeParse(value);
    return r.success
      ? length > 0 && r.data.length > length
        ? `${r.data.slice(0, length)}...`
        : r.data
      : (value as never);
  }

  public words = {
    count<T extends string>(value: T) {
      const r = s.safeParse(value);
      return r.success ? (r.data.length > 0 ? r.data.split(/\s+/).length : 0) : 0;
    },
    longest<T extends string>(value: T) {
      const r = s.safeParse(value);
      if (r.success) {
        const words = r.data.split(/\s+/);
        const longest = words.reduce((a, b) => (a.length > b.length ? a : b), "");
        const filtered = words.filter((v) => v.length === longest.length);
        return filtered.length > 1 ? filtered : longest;
      }
      return "";
    },
  };

  public casing = {
    kebab<T extends string>(value: T): KebabCased<T> {
      return value.replace(/\s+/g, "-") as KebabCased<T>;
    },
    snake<T extends string>(value: T): SnakeCased<T> {
      return value.replace(/\s+/g, "_") as SnakeCased<T>;
    },
    camel<T extends string>(value: T): CamelCased<T> {
      const r = s.safeParse(value);
      return r.success
        ? (r.data
            .toLowerCase()
            .split(/\s+/)
            .map((v, i) => (i === 0 ? v : v.charAt(0).toUpperCase() + v.slice(1)))
            .join("") as CamelCased<T>)
        : (value as never);
    },
    pascal<T extends string>(value: T): PascalCased<T> {
      const r = s.safeParse(value);
      return r.success
        ? (r.data
            .toLowerCase()
            .split(/\s+/)
            .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
            .join("") as PascalCased<T>)
        : (value as never);
    },
    dot<T extends string>(value: T): DotCased<T> {
      const r = s.safeParse(value);
      return r.success ? (r.data.replace(/\s+/g, ".") as DotCased<T>) : (value as never);
    },

    is: {
      kebab<T extends string>(value: KebabCased<T>): value is KebabCased<T> {
        return /^[a-z]+(-[a-z]+)*$/.test(value);
      },
      snake<T extends string>(value: SnakeCased<T>): value is SnakeCased<T> {
        return /^[a-z]+(_[a-z]+)*$/.test(value);
      },
      camel<T extends string>(value: CamelCased<T>): value is CamelCased<T> {
        return /^[a-z]+([A-Z][a-z]+)*$/.test(value);
      },
      pascal<T extends string>(value: PascalCased<T>): value is PascalCased<T> {
        return /^[A-Z][a-z]+([A-Z][a-z]+)*$/.test(value);
      },
      dot<T extends string>(value: DotCased<T>): value is DotCased<T> {
        return /^[a-z]+(\.[a-z]+)*$/.test(value);
      },
    },
  };
}
