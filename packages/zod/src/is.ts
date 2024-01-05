/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-namespace */

import { z } from "zod";

import type { Awaitable, Falsy, Guard } from "./g";

/**
 * Interface for the `is` property of `T`
 */
export interface IIs {
  string: Guard<string>;
  number: Guard<number>;
  null: Guard<null>;
  undefined: Guard<undefined>;
  boolean: Guard<boolean>;
  bigint: Guard<bigint>;
  symbol: Guard<symbol>;
  object: Guard<object>;
  function: Guard<(() => unknown) | Function | Awaitable<unknown>>;
  any: Guard<any>;
  array: Guard<unknown[]>;
  date: Guard<Date>;
  error: Guard<Error>;
  promise: Guard<Awaitable<unknown>>;
  falsy: Guard<Falsy>;
  of: <C extends z.ZodTypeAny>(c: C, v: unknown) => v is C;
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

  public of = <C extends z.ZodTypeAny>(c: C, v: unknown): v is C => {
    return c.safeParse(v).success;
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
