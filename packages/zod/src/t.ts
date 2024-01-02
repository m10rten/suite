import { z } from "zod";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-namespace */

/**
 * Interface for the `T` class
 */
export interface IT {
  is: IIs;
  to: ITo;
}

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
  of: <C>(c: C, v: unknown) => v is C;
}

/**
 * Interface for the `to` property of `T`
 */
export interface ITo {
  string: Coerce<string>;
  number: Coerce<number>;
  boolean: Coerce<boolean>;
  bigint: Coerce<bigint>;
  any: Coerce<any>;
  array: Coerce<unknown[]>;
  date: Coerce<Date>;
  error: Coerce<Error>;
  promise: Coerce<Awaitable<unknown>>;
  parse: <T>(t: z.ZodType<T>) => Coerce<T>;
  readonly: Coerce<Readonly<unknown>>;
}

/**
 * T.ts
 * Zod extended with a `T` property that can do magico.
 * @packageDocumentation
 * @module tzod
 */
export class T implements IT {
  public is = new Is();
  public to = new To();
}
const co = z.coerce;
export class To implements ITo {
  public string(value: unknown): string {
    return co.string().parse(value);
  }
  public number(value: unknown): number {
    const s = co.number();
    return s.safeParse(value).success ? s.parse(value) : NaN;
  }
  public boolean(value: unknown): boolean {
    return co.boolean().parse(value);
  }
  public bigint(value: unknown): bigint {
    const s = co.bigint();
    return s.safeParse(value).success ? s.parse(value) : BigInt(NaN);
  }
  public date(value: unknown): Date {
    return co.date().parse(value);
  }
  public error(value: unknown): Error {
    return new Error(z.any().parse(value));
  }
  public promise(value: unknown): Promise<unknown> {
    return new Promise((resolve) => resolve(z.any().parse(value)));
  }
  public any(value: unknown): any {
    return z.any().parse(value);
  }
  public array(value: unknown): unknown[] {
    if (!Array.isArray(value)) return new Array(value);
    return z.array(z.any()).parse(value);
  }
  /**
   * Gives you the ability to parse a value to a ZodType
   * @param t
   * @returns
   */
  public parse<T>(t: z.ZodType<T>): Coerce<z.infer<typeof t>> {
    return t.parse;
  }
  /**
   * Gives you the ability to parse a value to a Readonly
   * @param t
   * @returns
   */
  public readonly(value: unknown): Readonly<unknown> {
    return z.any().readonly().parse(value);
  }
}

type Falsy = undefined | null | false | 0 | "";
class Is implements IIs {
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

  public of = <CType>(c: CType, v: unknown): v is CType => {
    // @ts-expect-error - I don't know how to fix this
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

export type Awaitable<T> = Promise<T> | PromiseLike<T>;
export type Guard<T> = (value: unknown) => value is T;
export type Coerce<T> = (value: unknown) => T;
export type Check<V, T> = V extends T ? true : false;

export namespace T {
  export namespace Guards {
    export type IsString = Guard<string>;
  }
  export namespace Is {
    export type String<T> = Check<T, string>;
  }
}

export const t = new T();
export const is = t.is;
export const to = t.to;
export default t;
