/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-namespace */

import type { Awaitable, Check, Falsy, Guard } from "@mvdlei/types";

import type {
  Email as TEmail,
  Empty as TEmpty,
  Has as THas,
  LowerCased as TLowerCased,
  Quoted as TQuoted,
  Reverse as TReverse,
  Reversed as TReversed,
  UpperCased as TUpperCased,
} from "./string";

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
    export type Of = <C>(c: C, v: unknown) => v is C;
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

  export namespace String {
    export namespace Is {
      export type Email<T> = TEmail<T>;
      export type Upper<T> = TUpperCased<T>;
      export type Lower<T> = TLowerCased<T>;
      export type Empty<T> = TEmpty<T>;
      export type Has<T extends string, U extends string> = THas<T, U>;
      export type Quoted<T extends string> = TQuoted<T>;
      export type Reverse<T extends string> = TReverse<T>;
      export type Reversed<T extends string> = TReversed<T>;
    }
  }
}
