import { logger } from "@mvdlei/log";
import { z } from "zod";

type Azod = z.AnyZodObject;

export type Call<TInput extends Azod, TOutput extends Azod> = (
  input?: (z.infer<TInput> | Record<string, string>) | undefined,
) => Results<TOutput>;

export type Results<TOutput extends Azod> = Promise<z.infer<TOutput>>;

export interface IZap {
  define: <TInput extends Azod, TOutput extends Azod>(
    options: DefineOptions<TInput, TOutput>,
  ) => Call<TInput, TOutput>;

  /**
   * Set options safely, only overriding the ones that are passed and are not set already.
   * @param options
   * @returns
   */
  set: (options: Partial<IZapOptions>) => void;
  /**
   * Set options unsafely, overriding the ones that are passed and are not set already.
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

const defaultOptions = {
  baseUrl: undefined,
  // interceptors: [],
  timeout: undefined,
} satisfies IZapOptions;

export type RestMethod = (typeof RestMethods)[keyof typeof RestMethods];

const RestMethods = {
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
  url: string;
  method?: RestMethod;
  input?: Input;
  output: Output;
  headers?: Record<string, string>;
};

export class Zap implements IZap {
  private baseUrl: string | undefined;
  // private interceptors: Array<Interceptor> = [];
  private timeout: number | undefined;
  constructor({ baseUrl, timeout }: IZapOptions = defaultOptions) {
    this.baseUrl ??= baseUrl;
    this.timeout ??= timeout;
  }
  define<TInput extends Azod, TOutput extends Azod>(
    options: DefineOptions<TInput, TOutput>,
  ): Call<TInput, TOutput> {
    return async (input) => {
      const controller = new AbortController();
      const ms = this.timeout ?? 15_000;
      const url = this.baseUrl ? `${this.baseUrl}${options.url}` : options.url;
      // add query params
      const params = new URLSearchParams(input as Record<string, string>);
      const urlWithParams = `${url}?${params.toString()}`;
      const timeout = setTimeout(() => {
        logger.error("Timeout while fetching", {
          url: urlWithParams,
          timeout: ms,
        });
        controller.abort();
      }, ms);

      logger.info("Fetching", {
        ...{ ...options, output: undefined },
        url: urlWithParams,
        method: options.method ?? "POST",
        timeout: ms,
      });
      const response = await fetch(
        options?.method === RestMethods.GET ? urlWithParams : url,
        {
          method: options.method ?? "POST",
          body: JSON.stringify(input),
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
 * This instance does not have a baseUrl set, so you will need to set it manually on each call or use `zap.set({ baseUrl: "https://example.com" })` to set it globally for all calls on this instance.
 */
export const zap = new Zap();

// const zap = new Zap({ baseUrl: "http://10.255.255.1", timeout: 3000 });

// const main = async () => {
//   try {
//     //correct usage with timeout on baseUrl
//     const getTodo = zap.define({
//       url: "/todos/1",
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "X-My-Header": "Hello World",
//       },
//       output: z.object({
//         userId: z.number(),
//         id: z.number(),
//         title: z.string(),
//         completed: z.boolean(),
//       }),
//     });
//     const todo = await getTodo({ userId: "1" });
//     // eslint-disable-next-line no-console
//     console.log(todo);
//   } catch (error) {
//     logger.error("Error", { error });
//   }

//   try {
//     //correct usage with correct types
//     zap.unsafe_set({ baseUrl: "https://jsonplaceholder.typicode.com" });
//     const another = zap.define({
//       url: "/todos/2",
//       method: "GET",
//       output: z.object({
//         userId: z.number(),
//         id: z.number(),
//         title: z.string(),
//         completed: z.boolean(),
//       }),
//     });
//     const user = await another();
//     logger.info("User", { user });
//   } catch (error) {
//     logger.error("Error on User", { error });
//   }

//   try {
//     //correct usage with incorrect types
//     zap.unsafe_set({ baseUrl: "https://jsonplaceholder.typicode.com" });
//     const another = zap.define({
//       url: "/todos/5",
//       method: "GET",
//       output: z.object({
//         userId: z.number(),
//         id: z.number(),
//         title: z.string(),
//         completed: z.boolean(),
//       }),
//     });
//     const todo = await another();
//     logger.info("ToDO", { todo });
//   } catch (error) {
//     logger.error("Error on ToDO", { error });
//   }

//   process.exit(0);
// };

// main();

export default Zap;
