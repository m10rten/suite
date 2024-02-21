import { WithRequired } from "@mvdlei/types";
import { t } from "@mvdlei/tzod";
import { z } from "zod";

import { AbortError, HTTPError, TimeoutError } from "./errors";

export type AnyData = z.ZodTypeAny;
export type AnyResponse = z.ZodTypeAny;
/**
 * The call returned by the define method.
 *
 * @template TBody - The input type for the call.
 * @template TRes - The output type for the call.
 */
type DefineResponse<TBody extends AnyData, TRes extends AnyResponse> = (
  options?: CallOptions<TBody>,
) => CallResponse<TRes>;
/**
 * The response of a call.
 */
type CallResponse<TRes extends AnyResponse> = Promise<z.infer<TRes>>;
type Input = URL | string | Request;
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

export interface IZap {
  /**
   * Defina a zap instance with the given options.
   *
   * @param options {ZapOptions} - The options to define the zap instance.
   *
   * @returns {Zap} - The zap instance.
   */
  define: <TBody extends AnyData, TRes extends AnyResponse>(
    input: Input,
    options?: DefineOptions<TBody, TRes>,
  ) => DefineResponse<TBody, TRes>;
}

export interface ZapOptions {
  /**
   * The base URL for the zap instance. If not set, the fetch will be used as is with the url from the define call.
   */
  origin?: string | URL | undefined;
  /**
   * The timeout for the zap instance.
   */
  timeout?: number;
}

export interface DefineOptions<TBody extends AnyData, TRes extends AnyResponse>
  extends RequestInit {
  params?: Record<string, string>;
  input?: TBody;
  output?: TRes;
  timeout?: number;
}

type ZapResponse<TBody extends AnyData> = BodyInit | z.infer<TBody>;

export interface CallOptions<TBody extends AnyResponse> extends RequestInit {
  url?: URL | string;
  params?: Record<string, string>;
  body?: ZapResponse<TBody>;
}

const defaultZapOptions: ZapOptions = {
  origin: undefined,
  timeout: undefined,
};

export class Zap implements IZap {
  private constructor(private readonly options: ZapOptions = defaultZapOptions) {}
  static init(options?: WithRequired<Partial<ZapOptions>, "origin">): Zap {
    if (!options?.origin) throw new SyntaxError("origin is required");
    const merged: ZapOptions = { ...defaultZapOptions, ...options };
    return new Zap(merged);
  }

  define<TBody extends AnyData, TRes extends AnyResponse>(
    define_input: Input,
    define_options?: DefineOptions<TBody, TRes>,
  ): DefineResponse<TBody, TRes> {
    return async (options?: CallOptions<TBody>) => {
      // if the input is defined, check if the body satisfies the input schema.
      if (define_options?.input) {
        const parsed = define_options.input.safeParse(options?.body);
        if (!parsed.success) throw parsed.error;
      }

      const input_signal: AbortSignal | undefined =
        options?.signal ?? define_options?.signal ?? undefined;

      // const abort = !signal ? () => new AbortController().abort() : () => undefined;
      const controller: AbortController | undefined = input_signal
        ? undefined
        : new AbortController();
      const signal: AbortSignal = input_signal ?? controller!.signal;
      const abort = !signal ? () => controller?.abort() : () => undefined;
      signal?.addEventListener("abort", () => {
        abort();
      });

      const timeout: number = define_options?.timeout ?? this.options.timeout ?? 15_000;

      const mergedRequest: RequestInit = {
        ...define_options,
        ...options,
        signal,
      };

      // create a unified URL with the host, input from the define call and the call options.
      // get the URL from the define call, if it is a string, create a new URL with the host and the input from the define call.
      const base: URL = t.to.url(define_input, this.options.origin);

      // append the input from the call to the URL
      const path: string = options?.url?.toString()
        ? base.href + options?.url?.toString()
        : base.href;

      // create a URL with the path and the base URL
      const url: URL = t.to.url(path, base);

      // add query params
      const mergedParams: Record<string, string> = {
        ...define_options?.params,
        ...options?.params,
      };

      if (mergedParams && Object.keys(mergedParams).length > 0) {
        url.search = new URLSearchParams(mergedParams).toString();
      }

      const timeoutId = setTimeout(() => {
        throw new TimeoutError(timeout, "Timeout while fetching");
      }, timeout);

      const isGet: boolean =
        (!options?.method || options?.method === "GET") &&
        (!define_options?.method || define_options?.method === "GET");

      const withOrWithoutBody: RequestInit = {
        ...mergedRequest,
        body: isGet ? undefined : JSON.stringify(options?.body ?? {}),
      };

      try {
        const response: Response = await fetch(url, withOrWithoutBody);

        if (!response.ok) {
          throw new HTTPError(response, response.statusText);
        }

        clearTimeout(timeoutId);

        const data: unknown = await response.json();

        if (!define_options?.output) return data satisfies unknown;
        const parsed = define_options?.output?.safeParse(data);

        if (parsed?.success) {
          return parsed.data satisfies z.infer<TRes>;
        } else throw parsed.error;
      } catch (error) {
        if (signal.aborted) throw new AbortError("The request was aborted");
        abort(); // abort the request if it was not aborted
        if (error instanceof TimeoutError) throw error;
        clearTimeout(timeoutId); // clear the timeout if the request was not timed out
        if (error instanceof HTTPError) throw error;
        if (error instanceof z.ZodError) throw error;
        else if (error instanceof Error) throw error;
        else {
          throw new Error("Unknown error");
        }
      }
      // No finally block because that would cause weird behaviors with error handling and timeouts.
    };
  }
}

/**
 * Test code:
 */

// const zap = Zap.init({
//   origin: "https://jsonplaceholder.typicode.com",
// });

// const getTodo = zap.define("/todos", {
//   input: z.object({
//     id: z.number(),
//   }),
//   output: z.object({
//     userId: z.number(),
//     id: z.number(),
//     title: z.string(),
//     completed: z.boolean(),
//   }),
// });

// const postTodo = zap.define("/todos", {
//   input: z.object({
//     userId: z.number(),
//     title: z.string(),
//     completed: z.boolean(),
//   }),
//   output: z.object({
//     id: z.number(),
//   }),
//   method: "PUT",
// });

// const main = async () => {
//   const get = await getTodo({
//     url: "/1",
//     body: {
//       id: 1,
//     },
//   });
//   // eslint-disable-next-line no-console
//   console.log("get response: >>", get, "<<");

//   const post = await postTodo({
//     method: "POST",
//     body: {
//       userId: 1,
//       title: "foo",
//       completed: false,
//     },
//   });

//   // eslint-disable-next-line no-console
//   console.log("post response: >>", post, "<<");

//   try {
//     const controller = new AbortController();
//     const withAbort = zap.define("/todos", {
//       input: z.object({
//         id: z.number(),
//       }),
//       output: z.object({
//         userId: z.number(),
//         id: z.number(),
//         title: z.string(),
//         completed: z.boolean(),
//       }),
//       signal: controller.signal,
//     });

//     setTimeout(() => {
//       controller.abort();
//     }, 10);

//     withAbort({
//       url: "/1",
//     }).then((res) => {
//       // eslint-disable-next-line no-console
//       console.log("response", res);
//     });
//   } catch (error) {
//     // eslint-disable-next-line no-console
//     console.log("error", error);
//   }
// };

// main();
