import { logger } from "@mvdlei/log";
import { t } from "@mvdlei/tzod";
import { z } from "zod";

type Azod = z.ZodTypeAny;
export type AnyInput = z.infer<Azod | z.ZodString | z.ZodNumber>;
export type AnyOutput =
  | Azod
  | z.ZodString
  | z.ZodNumber
  | z.ZodBoolean
  | z.ZodNull
  | z.ZodUndefined;

export type Call<TInput extends AnyInput, TOutput extends AnyOutput> = (
  input?: TInput | undefined,
) => Results<TOutput>;

export type Results<TOutput extends AnyOutput> = Promise<z.infer<TOutput>>;

export interface IZap {
  /**
   * Define a new call to an endpoint.
   *
   * Make sure to set the baseUrl before using this method if you want to use the baseUrl.
   * @param options - Options for the call
   * @returns {Call<TInput, TOutput>} - Call instance
   */
  define: <TInput extends AnyInput, TOutput extends AnyOutput>(
    options: DefineOptions<TInput, TOutput>,
  ) => Call<TInput, TOutput>;

  /**
   * Set options safely, only overriding the ones that are passed and are not set already.
   *
   * Please note that this will not override the baseUrl if it is already set.
   *
   * Setting the baseUrl will only be affecting the calls made after this is called.
   * @param options
   * @returns
   */
  set: (options: Partial<IZapOptions>) => void;
  /**
   * Set options unsafely, overriding the ones that are passed and are not set already.
   *
   *  Please note that this **will** override the baseUrl if it is already set.
   *
   * Setting the baseUrl will only be affecting the calls made after this is called.
   * @param options
   * @returns
   */
  unsafe_set: (options: Partial<IZapOptions>) => void;
}

// export type Interceptor =
//   | ((input: Request) => Request)
//   | ((input: Response) => Response);

export interface IZapOptions {
  baseUrl?: string;
  // interceptors?: Array<Interceptor>;
  timeout?: number;
}

const defaultOptions: IZapOptions = {
  baseUrl: undefined,
  // interceptors: [],
  timeout: undefined,
};

export type HTTP = (typeof HttpMethods)[keyof typeof HttpMethods];

export const HttpMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS",
  TRACE: "TRACE",
} as const;

export type DefineOptions<Input, Output> = {
  url: URL | string | Request;
  output: Output;
  headers?: Record<string, string>;
} & (
  | {
      method?: "GET";
      input?: Input;
    }
  | {
      input: Input;
      method?: HTTP;
    }
);

export class Zap implements IZap {
  private baseUrl: string | undefined;
  // private interceptors: Array<Interceptor> = [];
  private timeout: number | undefined;
  constructor({ baseUrl, timeout }: IZapOptions = defaultOptions) {
    this.baseUrl ??= baseUrl;
    this.timeout ??= timeout;
  }
  static init(options: IZapOptions = defaultOptions): Zap {
    return new Zap(options);
  }
  define<TInput extends AnyInput, TOutput extends AnyOutput>(
    options: DefineOptions<TInput, TOutput>,
  ): Call<TInput, TOutput> {
    return async (input) => {
      const controller = new AbortController();
      const ms = this.timeout ?? 15_000;

      const url: URL = this.baseUrl
        ? t.is.string(options.url) || t.is.instanceof(URL, options.url)
          ? new URL(options.url, this.baseUrl)
          : new URL(options.url.url, this.baseUrl)
        : t.is.string(options.url) || t.is.instanceof(URL, options.url)
          ? new URL(options.url)
          : new URL(options.url.url);

      // add query params
      const params = new URLSearchParams(input as Record<string, string>);

      const urlWithParams = new URL(url);
      for (const [key, value] of Object.entries(params)) {
        urlWithParams.searchParams.append(key, t.to.string(value));
      }

      const timeout = setTimeout(() => {
        logger.error("Timeout while fetching", {
          url: options.method === HttpMethods.GET ? urlWithParams : url,
          timeout: ms,
        });
        controller.abort();
      }, ms);

      logger.info("Fetching", {
        ...{ ...options, output: undefined },
        url: urlWithParams,
        method: options.method ?? "POST",
        timeout: ms,
        input: JSON.stringify(input),
      });

      const withOrWithoutBody =
        options.method === HttpMethods.GET ? {} : { body: JSON.stringify(input) };

      const response = await fetch(
        options?.method === HttpMethods.GET ? urlWithParams : url,
        {
          ...withOrWithoutBody,
          method: options.method ?? "POST",
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
        },
      );

      clearTimeout(timeout);

      const result = await response.json();
      const parsed = options.output.safeParse(result);

      if (parsed.success) {
        return parsed.data;
      }
      throw parsed.error;
    };
  }

  unsafe_set(options: Partial<IZapOptions>): void {
    this.baseUrl = options.baseUrl;
    // this.interceptors ??= options.interceptors;
    this.timeout = options.timeout;
  }
  set(options: Partial<IZapOptions>): void {
    this.baseUrl ??= options.baseUrl;
    // this.interceptors ??= options.interceptors;
    this.timeout ??= options.timeout;
  }
}

/**
 * Be aware that this is a singleton instance of Zap.
 *
 * This instance does not have a baseUrl set, so you will need to set it manually on each call or use `zap.set({ baseUrl: "HttpMethods://example.com" })` to set it globally for all calls on this instance.
 */
// export const zap = new Zap();
export default Zap;

/**
 * Test code:
 */

const zap = new Zap({ baseUrl: "http://10.255.255.1", timeout: 3000 });

const main = async () => {
  try {
    //correct usage with timeout on baseUrl
    const getTodo = zap.define({
      url: "/todos/1",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-My-Header": "Hello World",
      },
      output: z.object({
        userId: z.number(),
        id: z.number(),
        title: z.string(),
        completed: z.boolean(),
      }),
    });
    const todo = await getTodo({ userId: "1" });
    // eslint-disable-next-line no-console
    console.log(todo);
  } catch (error) {
    logger.error("Error", { error });
  }

  try {
    //correct usage with correct types
    zap.unsafe_set({ baseUrl: "HttpMethods://jsonplaceholder.typicode.com" });
    const another = zap.define({
      url: "/todos/2",
      method: "GET",
      output: z.object({
        userId: z.number(),
        id: z.number(),
        title: z.string(),
        completed: z.boolean(),
      }),
    });
    const user = await another();
    logger.info("User", { user });
  } catch (error) {
    logger.error("Error on User", { error });
  }

  try {
    //correct usage with incorrect types
    zap.unsafe_set({ baseUrl: "HttpMethods://jsonplaceholder.typicode.com" });
    const another = zap.define({
      url: "/todos/5",
      method: "GET",
      output: z.object({
        userId: z.number(),
        id: z.number(),
        title: z.string(),
        completed: z.boolean(),
      }),
    });
    const todo = await another();
    logger.info("ToDO", { todo });
  } catch (error) {
    logger.error("Error on ToDO", { error });
  }

  process.exit(0);
};

main();
