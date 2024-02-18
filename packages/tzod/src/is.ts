/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-namespace */

import type { Awaitable, Falsy, Guard } from "@mvdlei/types";
import { z } from "zod";

/**
 * Interface for the `is` property of `T`
 */
export interface IIs {
  /**
   * Check if a value is a string
   */
  string: Guard<string>;
  /**
   * Check if a value is a number
   */
  number: Guard<number>;
  /**
   * Check if a value is null
   */
  null: Guard<null>;
  /**
   * Check if a value is undefined
   */
  undefined: Guard<undefined>;
  /**
   * Check if a value is a boolean
   */
  boolean: Guard<boolean>;
  /**
   * Check if a value is a bigint
   */
  bigint: Guard<bigint>;
  /**
   * Check if a value is a symbol
   */
  symbol: Guard<symbol>;
  /**
   * Check if a value is an object
   */
  object: Guard<object>;
  /**
   * Check if a value is a function
   */
  function: Guard<(() => unknown) | Function | (() => Awaitable<unknown>)>;
  /**
   * Check if a value is any
   */
  any: Guard<any>;
  /**
   * Check if a value is an array
   */
  array: Guard<unknown[]>;
  /**
   * Check if a value is a date
   */
  date: Guard<Date>;
  /**
   * Check if a value is an error
   */
  error: Guard<Error>;
  /**
   * Check if a value is a promise, please note that this is not for async functions that do not return a promise.
   */
  promise: Guard<Awaitable<unknown>>;
  /**
   * Check if a value is falsy
   */
  falsy: Guard<Falsy>;
  /**
   * Check if a value is a zod schema
   *
   */
  schema: <C extends z.ZodTypeAny>(c: C, v: unknown) => v is C;
  /**
   * Because of the way `instanceof` works, you are required to pass the class or Object as second argument.
   * The first argument is a class or object instance you want to check against.
   *
   * Make sure to use the `new` keyword when using this function. otherewise you will check against the class itself and not the instance, so the result will not be as expected.
   *
   * @param c - The class or object instance you want to check against
   * @param v - The value you want to check
   * @returns
   * - `true` if the value is an instance of the class
   * - `false` if the value is not an instance of the class
   */
  instanceof: <C>(c: new (...args: any[]) => C, v: unknown) => v is C;

  /**
   * Check if a value is of a certain type with a predicate function
   * @param v value to check
   * @param f predicate function
   * @returns `true` if the value is of the type
   * @returns `false` if the value is not of the type
   */
  of: <C extends V, V>(v: V, f: (v: V) => v is C) => boolean;

  /**
   * Check if the current environment is the browser or not.
   *
   * Uses `typeof window === "undefined"` as check.
   */
  server: () => boolean;

  /**
   * Check if the current environment is the browser or not.
   *
   * Uses `typeof window !== "undefined"` as check.
   */
  browser: () => boolean;
}
export class Is implements IIs {
  public string(value: unknown): value is string {
    return z.string().safeParse(value).success;
  }
  public number(value: unknown): value is number {
    return z.number().safeParse(value).success;
  }
  public null(value: unknown): value is null {
    return z.null().safeParse(value).success;
  }
  public undefined(value: unknown): value is undefined {
    return z.undefined().safeParse(value).success;
  }
  public boolean(value: unknown): value is boolean {
    return z.boolean().safeParse(value).success;
  }
  public bigint(value: unknown): value is bigint {
    return z.bigint().safeParse(value).success;
  }
  public symbol(value: unknown): value is symbol {
    return z.symbol().safeParse(value).success;
  }
  public object(value: unknown): value is object {
    return typeof value === "object";
  }
  public array(value: unknown): value is unknown[] {
    return z.array(z.any()).safeParse(value).success && Array.isArray(value);
  }
  public function(
    value: unknown,
  ): value is ((...args: unknown[]) => unknown) | Function {
    return z.function().safeParse(value).success;
  }
  public any(value: unknown): value is any {
    return z.any().safeParse(value).success;
  }
  public date(value: unknown): value is Date {
    return z.date().safeParse(value).success;
  }
  public error(value: unknown): value is Error {
    return value instanceof Error;
  }
  public promise(value: unknown): value is Awaitable<unknown> {
    return value instanceof Promise;
  }

  public schema = <C extends z.ZodTypeAny>(c: C, v: unknown): v is C => {
    return c.safeParse(v).success;
  };

  public instanceof = <C>(c: new (...args: any[]) => C, v: unknown): v is C => {
    return v instanceof c;
  };

  public of = <C extends V, V>(v: V, f: (v: V) => v is C): v is C => {
    return f(v);
  };

  public falsy(value: unknown): value is Falsy {
    return (
      typeof value === "undefined" ||
      value === undefined ||
      value === null ||
      value === void 0 ||
      value === false ||
      value === 0 ||
      value === ""
    );
  }

  public server(): boolean {
    return typeof window === "undefined";
  }

  public browser(): boolean {
    return !this.server();
  }
}

/**
 * Test code:
 */
// const is = new Is();

// const isURL = (url: URL | string | Request): url is URL => url instanceof URL;

// const myTest: any = new URL("https://example.com");

// const test = is.of(myTest, isURL);
// if (test) {
//   console.log("Test passed", myTest);
// }

// if (isURL(myTest)) {
//   console.log("Test passed", myTest);
// }

// if (is.instanceof(URL, myTest)) {
//   console.log("Test passed", myTest);
// }

// const isOf = (v: unknown): v is URL => v instanceof URL;
// if (is.of(myTest, isOf)) {
//   console.log("Test passed", myTest);
// }
