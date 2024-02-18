/**
 * @module @mvdlei/env
 * @file Index.ts
 * @description The entry point for the `@mvdlei/env` package.
 * @example
 * import { define, Env } from "@mvdlei/env";
 * export const env = define({}); // Define your env vars here.
 *
 * Or just use Env out of the box
 * @example
 * const myVar = Env.get("KEY");
 */

export * from "./env";
