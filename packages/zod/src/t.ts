/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-namespace */
/**
 * T.ts
 * Zod extended with a `T` property that can do magic.
 * @packageDocumentation
 * @module tzod
 */

import { z } from "zod";

export interface IT {
  is: IIs;
  to: ITo;
}

export interface IIs {
  string: (value: unknown) => value is string;
}
export interface ITo {
  string: <T>(value: T) => string;
}

class T implements IT {
  public is = new Is();
  public to = new To();
}
class To implements ITo {
  public string<T>(value: T): string {
    return z.coerce.string().parse(value);
  }
}
class Is implements IIs {
  public string(value: unknown): value is string {
    return typeof value === "string";
  }
}

namespace T {
  export type isString<T> = T extends string ? true : false;
  export type Absolute<T extends boolean> = T extends true ? true : false;
}

export const t = new T();

const random_value: unknown = "NaN";
const isAstring = t.is.string(random_value);
if (isAstring) {
  console.log(random_value);
}
const nr = 2;
const stringified = t.to.string(nr);
if (t.is.string(stringified)) {
  console.log(stringified);
}
