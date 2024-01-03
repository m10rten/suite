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
  of: <C extends z.ZodTypeAny>(c: C, v: unknown) => v is C;
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
 * Base class for `T`
 */
class B {
  public pipe<R>(...fns: ((value: unknown) => R)[]): R {
    return fns.reduce((prev, fn) => fn(prev), this as unknown as R);
  }

  public flow<R>(...fns: ((value: unknown) => Promise<R>)[]): Promise<R> {
    return fns.reduce(async (prev, fn) => fn(await prev), this as unknown as Promise<R>);
  }
}

/**
 * T.ts
 * Zod extended with a `T` property that can do magico.
 * @packageDocumentation
 * @module tzod
 */
export class T extends B implements IT {
  public is = new Is();
  public to = new To();
}
const co = z.coerce;
export class To implements ITo {
  public string(value: unknown): string {
    const s = co.string();
    return s.safeParse(value).success ? s.parse(value) : String();
  }
  public number(value: unknown): number {
    const s = co.number();
    return s.safeParse(value).success ? s.parse(value) : NaN;
  }
  public boolean(value: unknown): boolean {
    const s = co.boolean();
    return s.safeParse(value).success ? s.parse(value) : false;
  }
  public bigint(value: unknown): bigint {
    const s = co.bigint();
    return s.safeParse(value).success ? s.parse(value) : BigInt(NaN);
  }
  public date(value: unknown): Date {
    const s = co.date();
    return s.safeParse(value).success ? s.parse(value) : new Date(NaN);
  }
  public error(value: unknown): Error {
    const s = z.any();
    return s.safeParse(value).success ? new Error(z.any().parse(value)) : new Error();
  }
  public promise(value: unknown): Promise<unknown> {
    return new Promise((resolve) => resolve(z.any().parse(value)));
  }
  public any(value: unknown): any {
    return z.any().parse(value);
  }
  public array(value: unknown): unknown[] {
    if (!Array.isArray(value)) return new Array(value);
    const s = z.array(z.any());
    return s.safeParse(value).success ? s.parse(value) : new Array(value);
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

export type Awaitable<T> = Promise<T> | PromiseLike<T>;

export type Guard<T> = (value: unknown) => value is T;
export type Coerce<T> = (value: unknown) => T;
export type Check<V, T> = V extends T ? true : false;

export namespace T {
  export namespace Guards {
    export type IsString = Guard<string>;
    export type IsNumber = Guard<number>;
    export type IsNull = Guard<null>;
    export type IsUndefined = Guard<undefined>;
    export type IsBoolean = Guard<boolean>;
    export type IsBigInt = Guard<bigint>;
    export type IsSymbol = Guard<symbol>;
    export type IsObject = Guard<object>;
    export type IsFunction = Guard<(() => unknown) | Function | Awaitable<unknown>>;
    export type IsAny = Guard<any>;
    export type IsArray = Guard<unknown[]>;
    export type IsDate = Guard<Date>;
    export type IsError = Guard<Error>;
    export type IsPromise = Guard<Awaitable<unknown>>;
    export type IsFalsy = Guard<Falsy>;
    // @ts-expect-error - I don't know how to fix this
    export type Of<C> = <V>(v: V) => v is C;
  }
  export namespace Is {
    export type String<T> = Check<T, string>;
    export type Number<T> = Check<T, number>;
    export type Null<T> = Check<T, null>;
    export type Undefined<T> = Check<T, undefined>;
    export type Boolean<T> = Check<T, boolean>;
    export type BigInt<T> = Check<T, bigint>;
    export type Symbol<T> = Check<T, symbol>;
    export type Object<T> = Check<T, object>;
    export type Callable<T> = Check<T, (() => unknown) | Function | Awaitable<unknown>>;
    export type Any<T> = Check<T, any>;
    export type Array<T> = Check<T, unknown[]>;

    export type Promise<T> = Check<T, Awaitable<unknown>>;

    export type Of<C, V> = Check<V, C>;
  }
}

export const t = new T();
export const is = t.is;
export const to = t.to;
export default t;

const User = z.object({
  name: z.string(),
  age: z.number(),
});
type User = z.infer<typeof User>;
type test = T.Guards.Of<User>;
const testUser = {
  name: "hello",
  age: 2,
};
const isUser: test = (v: unknown): v is User => {
  return User.safeParse(v).success;
};
const isUser2 = t.is.of(User, testUser) as T.Is.Of<User, typeof testUser>;
if (isUser2) {
  // eslint-disable-next-line no-console
  console.log(testUser.name);
}
if (isUser(testUser)) {
  // eslint-disable-next-line no-console
  console.log(testUser.name);
}
