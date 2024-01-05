/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-namespace */

import { z } from "zod";

import { Awaitable, Coerce } from "./g";

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

const { coerce: co } = z;

export class To implements ITo {
  public string(value: unknown): string {
    const s = co.string();
    return typeof value === "object"
      ? JSON.stringify(value)
      : s.safeParse(value).success
        ? s.parse(value)
        : String(value);
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
    const num = this.number(value);
    const p = isNaN(num) ? num : 1;
    return s.safeParse(p).success ? s.parse(p) : BigInt(1);
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
