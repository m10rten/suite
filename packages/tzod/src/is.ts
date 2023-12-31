/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-namespace */

import { z } from "zod";

import type { Awaitable, Falsy, Guard } from "./g";

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
   */
  of: <C>(c: C, v: unknown) => v is C;
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

  public of = <C>(c: C, v: unknown): v is C => {
    // @ts-expect-error - this is a hack to get it to work.
    return v instanceof c;
  };

  public falsy(value: unknown): value is Falsy {
    return (
      value === undefined ||
      value === null ||
      value === void 0 ||
      value === false ||
      value === 0 ||
      value === ""
    );
  }
}
