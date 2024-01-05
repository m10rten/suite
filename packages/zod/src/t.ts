/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-namespace */

import { IArray, Array as TArray } from "./array";
import { IIs, Is } from "./is";
import { INumber } from "./number";
import { IString, String } from "./string";
import { ITo, To } from "./to";

export * from "./g";

/**
 * Interface for the `T` class
 */
export interface IT {
  is: IIs;
  to: ITo;
  string: IString;
  array: IArray;
  number: INumber;
}

// /**
//  * Base class for `T`
//  */
// class B {
//   public pipe<R>(...fns: ((value: unknown) => R)[]): R {
//     return fns.reduce((prev, fn) => fn(prev), this as unknown as R);
//   }

//   public flow<R>(...fns: ((value: unknown) => Promise<R>)[]): Promise<R> {
//     return fns.reduce(async (prev, fn) => fn(await prev), this as unknown as Promise<R>);
//   }
// }

/**
 * T.ts
 * Zod extended with a `T` property that can do magico.
 * @packageDocumentation
 * @module tzod
 */
export class T implements IT {
  public is = new Is();
  public to = new To();
  public string = new String();
  public array = new TArray();
  public number = new Number();
}

export const t = new T();
export const is = t.is;
export const to = t.to;
export const string = t.string;
export const array = t.array;
export const number = t.number;

export default t;
