/* eslint-disable no-console */
import type { Prettify, Primitive } from "@mvdlei/types";
import { z, type ZodError, type ZodObject, type ZodType } from "zod";

export type ErrorMessage<T extends string> = T;

type UnReadonlyObject<T> = T extends Readonly<infer U> ? U : T;

type Reduce<
  TArr extends Array<Record<string, unknown>>,
  // eslint-disable-next-line @typescript-eslint/ban-types
  TAcc = {},
> = TArr extends []
  ? TAcc
  : TArr extends [infer Head, ...infer Tail]
    ? Tail extends Array<Record<string, unknown>>
      ? Head & Reduce<Tail, TAcc>
      : never
    : never;

export interface BaseOptions<
  TEnv extends Record<string, ZodType>,
  TExtends extends Array<Record<string, unknown>>,
> {
  /**
   * How to determine whether the app is running on the server or the client.
   * @default typeof window !== "undefined"
   */
  isClient?: boolean;

  /**
   * env variables, often those that are provided by build tools and is available to both client and server,
   * but isn't prefixed and doesn't require to be manually supplied. For example `NODE_ENV`, `VERCEL_URL` etc.
   */
  env?: TEnv;

  /**
   * Called when validation fails. By default the error is logged,
   * and an error is thrown telling what environment variables are invalid.
   */
  onValidationError?: (error: ZodError) => never;

  /**
   * Called when a server-side environment variable is accessed on the client.
   * By default an error is thrown.
   */
  onInvalidAccess?: (variable: string) => never;

  /**
   * Whether to skip validation of environment variables.
   * @default false
   */
  skip?: boolean;

  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined?: boolean;

  /**
   * Extend the environment variables with these values.
   */
  extends?: TExtends;
}

export interface RuntimeOptions<
  TEnv extends Record<string, ZodType>,
  TExtends extends Array<Record<string, unknown>>,
> extends BaseOptions<TEnv, TExtends> {
  strict?: never;
  source?: never;

  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  // Unlike `strict`, this doesn't enforce that all environment variables are set.
  runtime: Record<string, string | boolean | number | undefined>;
}

type IEnvSource =
  | NodeJS.Process["env"]
  | {
      [key: string]: Primitive;
    };
export interface SourceOptions<
  TEnv extends Record<string, ZodType>,
  TExtends extends Array<Record<string, unknown>>,
> extends BaseOptions<TEnv, TExtends> {
  strict?: never;
  runtime?: never;
  /**
   * Be aware that this is where the environment variables are read from.
   * So using process.env will not work in the browser.
   */
  source?: IEnvSource;
}

export interface StrictOptions<
  TPrefix extends string | undefined,
  TPrefixed extends Record<string, ZodType>,
  TEnv extends Record<string, ZodType>,
  TExtends extends Array<Record<string, unknown>>,
> extends BaseOptions<TEnv, TExtends> {
  /**
   * Runtime Environment variables to use for validation - `process.env`, `import.meta.env` or similar.
   * Enforces all environment variables to be set. Required in for example Next.js Edge and Client runtimes.
   */
  strict: Record<
    | {
        [TKey in keyof TPrefixed]: TPrefix extends undefined
          ? never
          : TKey extends `${TPrefix}${string}`
            ? TKey
            : never;
      }[keyof TPrefixed]
    | {
        [TKey in keyof TEnv]: TKey extends string ? TKey : never;
      }[keyof TEnv],
    string | boolean | number | undefined
  >;
  runtime?: never;
  source?: never;
}

export interface PrefixedOptions<
  TPrefix extends string | undefined,
  TPrefixed extends Record<string, ZodType>,
> {
  /**
   * The prefix that client-side variables must have. This is enforced both at
   * a type-level and at runtime.
   */
  prefix?: TPrefix;

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app isn't
   * built with invalid env vars.
   */
  prefixed?: Partial<{
    [TKey in keyof TPrefixed]: TKey extends `${TPrefix}${string}`
      ? TPrefixed[TKey]
      : ErrorMessage<`${TKey extends string
          ? TKey
          : never} is not prefixed with ${TPrefix}.`>;
  }>;
}

export type EnvOptions<
  TPrefix extends string | undefined,
  TPrefixed extends Record<string, ZodType>,
  TEnv extends Record<string, ZodType>,
  TExtends extends Array<Record<string, unknown>>,
> =
  | (RuntimeOptions<TEnv, TExtends> & PrefixedOptions<TPrefix, TPrefixed>)
  | (StrictOptions<TPrefix, TPrefixed, TEnv, TExtends> &
      PrefixedOptions<TPrefix, TPrefixed>)
  | (SourceOptions<TEnv, TExtends> & PrefixedOptions<TPrefix, TPrefixed>);

export function define<
  TPrefix extends string | undefined,
  TPrefixed extends Record<string, ZodType>,
  TEnv extends Record<string, ZodType>,
  const TExtends extends Array<Record<string, unknown>> = [],
>(
  opts: EnvOptions<TPrefix, TPrefixed, TEnv, TExtends>,
): Readonly<
  Prettify<
    z.infer<ZodObject<TPrefixed>> &
      z.infer<ZodObject<TEnv>> &
      UnReadonlyObject<Reduce<TExtends>>
  >
> {
  const source = opts.source ?? opts.strict ?? opts.runtime ?? process.env;

  const emptyStringAsUndefined = opts.emptyStringAsUndefined ?? false;
  if (emptyStringAsUndefined) {
    for (const [key, value] of Object.entries(source)) {
      if (value === "") {
        delete source[key];
      }
    }
  }

  const skip = !!opts.skip;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
  if (skip) return source as any;

  const _prefixed = typeof opts.prefixed === "object" ? opts.prefixed : {};
  const _env = typeof opts.env === "object" ? opts.env : {};
  const prefixed = z.object(_prefixed);
  const data = z.object(_env);
  const isClient = opts.isClient ?? typeof window !== "undefined";

  const parsed = prefixed.merge(data).safeParse(source);

  const onValidationError =
    opts.onValidationError ??
    ((error: ZodError) => {
      console.error("Invalid environment variables:", error.flatten().fieldErrors);
      throw new Error("Invalid environment variables");
    });

  const onInvalidAccess =
    opts.onInvalidAccess ??
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ((_variable: string) => {
      throw new Error(
        "Attempted to access a server-side environment variable on the client",
      );
    });

  if (parsed.success === false) {
    return onValidationError(parsed.error);
  }
  const extended = (opts.extends ?? []).reduce((acc, curr) => {
    return Object.assign(acc, curr);
  }, {});
  const combined = Object.assign(parsed.data, extended);

  const env = new Proxy(combined, {
    get(target, prop) {
      if (typeof prop !== "string" || prop === "__esModule" || prop === "$$typeof")
        return undefined;
      if (
        isClient &&
        opts.prefix &&
        !prop.startsWith(opts.prefix) &&
        data.shape[prop as keyof typeof data.shape] === undefined
      ) {
        return onInvalidAccess(prop);
      }
      return Reflect.get(target, prop);
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
  return env as unknown as any;
}

export interface IEnv {
  /**
   * Get an environment variable.
   *
   * Will throw an error if the variable is not set and `strict` is enabled.
   */
  get<T extends string>(key: T): Primitive;

  get<T extends string>(key: T, defaultValue?: Primitive): Primitive;

  /**
   * Set an environment variable.
   *
   * Will throw an error if the variable is already set and `strict` is enabled.
   */
  set<T extends string>(key: T, value: Primitive): void;
}

export interface IEnvOptions {
  /**
   * Source where you want to call .get and .set on.
   */
  source?: IEnvSource;
  /**
   * If the .get should fail if the value is undefined, and the .set should fail when the key exists.
   *
   * This is because Env should always be set before the application starts and should not change on runtime.
   */
  strict?: boolean;
}

const defaultOptions: IEnvOptions = {
  strict: false,
  source: process.env,
};

export class Env implements IEnv {
  /**
   * Define env with a validation before usage, that way you can ensure the app isn't built with invalid env vars.
   */
  public static define = define;

  /**
   * Create a new Env instance.
   *
   * Use this to get and set environment variables.
   *
   * @param options - Options to use when creating the instance.
   *
   * {@link IEnvOptions} for more information.
   *
   * Options:
   * - `source` - The source to use when getting and setting environment variables.
   * - `strict` - Whether to enforce that all environment variables are set.
   *
   * @example
   * ```ts
   * const env = Env.init();
   *
   * env.get("NODE_ENV"); // "development"
   * ```
   */
  public static init(options?: Partial<IEnvOptions>) {
    const merged = { ...defaultOptions, ...options };
    return new Env(merged);
  }

  private constructor(private readonly options: IEnvOptions) {}

  public get<T extends string>(key: T, defaultValue?: Primitive): Primitive {
    const source = this.options?.source ?? process.env;
    const value = source[key];
    if (value === undefined && this.options?.strict && defaultValue === undefined) {
      throw new Error(`Environment variable "${key}" is not set`);
    }
    return value ?? defaultValue ?? undefined;
  }

  public static get<T extends string>(key: T, defaultValue?: Primitive): Primitive {
    return Env.init().get(key, defaultValue);
  }

  public set<T extends string>(key: T, value: Primitive): void {
    const source = this.options.source ?? process.env;
    if (source[key] && this.options?.strict) {
      throw new Error(`Environment variable "${key}" is already set`);
    }
    source[key] = value;
  }

  public static set<T extends string>(key: T, value: Primitive): void {
    return Env.init().set(key, value);
  }
}
