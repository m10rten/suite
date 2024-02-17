/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-namespace */

import type { Awaitable, Coerce } from "@mvdlei/types";
import { z } from "zod";

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
  /**
   * Coerce a value to a URL
   * @param value {URL | string | Request} - typed as unknown, will throw an error if the value is not a URL, string or Request
   */
  url: (value: unknown, base?: string | URL) => URL;
  error: Coerce<Error>;
  promise: Coerce<Awaitable<unknown>>;
  parse: <T>(t: z.ZodType<T>) => Coerce<T>;
  readonly: Coerce<Readonly<unknown>>;
}

const { coerce: co } = z;

export class To implements ITo {
  private _safe_to = <S extends z.ZodType, V, F extends V>(
    s: S,
    v: V,
    f: F,
  ): z.infer<S> | F => (s.safeParse(v).success ? s.parse(v) : f);

  public string(value: unknown): string {
    if (typeof value === "object") return JSON.stringify(value);
    return this._safe_to(co.string(), value, String(value));
  }
  public number(value: unknown): number {
    return this._safe_to(co.number(), value, NaN);
  }
  public boolean(value: unknown): boolean {
    return this._safe_to(co.boolean(), value, false);
  }
  public bigint(value: unknown): bigint {
    if (typeof value === "bigint") return value;
    if (isNaN(this.number(value))) return BigInt(1);
    return this._safe_to(co.bigint(), value, BigInt(1));
  }
  public date(value: unknown): Date {
    return this._safe_to(co.date(), value, new Date(NaN));
  }
  public error(value: unknown): Error {
    const s = z.any();
    return s.safeParse(value).success ? new Error(z.any().parse(value)) : new Error();
  }
  public promise<U>(value: U): Promise<U> {
    return new Promise((resolve) => resolve(z.any().parse(value)));
  }
  public any(value: unknown): any {
    return z.any().parse(value);
  }

  public url(value: unknown, base?: string | URL): URL {
    if (typeof value === "string") return base ? new URL(value, base) : new URL(value);
    if (value instanceof URL)
      return base ? new URL(value.href, base) : new URL(value.href);
    if (value instanceof Request)
      return base ? new URL(value.url, base) : new URL(value.url);
    throw new Error("Invalid URL");
  }

  public array(value: unknown): unknown[] {
    if (!Array.isArray(value)) return new Array(value);
    return this._safe_to(z.array(z.any()), value, new Array(value));
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
   * @param value {unknown}
   * @returns {Readonly<unknown>}
   */
  public readonly(value: unknown): Readonly<unknown> {
    return z.any().readonly().parse(value);
  }
}
