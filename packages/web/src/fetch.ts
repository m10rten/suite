/* eslint-disable no-console */
import { t } from "@mvdlei/tzod";

export interface ApiInit extends RequestInit {
  /**
   * The Parameters added to the URL
   *
   * @example
   * ```ts
   * const response = await api("https://api.github.com/users/octocat", {
   *  params: {
   *   page: "1",
   *   per_page: "10"
   *  }
   * });
   * ```
   *
   * @example
   * ```ts
   * const response = await api("https://api.github.com/users/octocat", {
   *  params: new URLSearchParams(...)
   * });
   * ```
   *
   * @example
   * ```ts
   * const response = await api("https://api.github.com/users/octocat", {
   *  params: "page=1&per_page=10"
   * });
   * ```
   */
  params?: Record<string, string> | URLSearchParams | string | null | undefined;

  /**
   * Base URL for the request
   *
   * Origin for the input to be called to.
   *
   * Defaults to: `Web.Api.Origin.fromEnv()`
   *
   * @see Web.Api.fromEnv
   *
   * @example
   * ```ts
   * const response = await api("/users/octocat", {
   *   origin: "https://api.github.com", // request will be made to https://api.github.com/users/octocat
   * });
   * ```
   */
  origin?: string;

  /**
   * BaseURL for the request, this is the same as `origin` but with a different name.
   *
   * @see ApiInit.origin
   */
  baseUrl?: string;

  /**
   * Set a base path for the request.
   *
   * @example
   * ```ts
   * const response = await api("/users/octocat", {
   *  path: "/api/v1", // request will be made to /api/v1/users/octocat
   * });
   * ```
   *
   * Please note that this path will always be the first part of the path.
   *
   * @example
   * ```ts
   * const response = await api("/users/octocat", {
   *  origin: "https://api.github.com/v1", // request will be made to https://api.github.com/v1/users/octocat
   *  path: "/api/", // now the request will be made to https://api.github.com/api/v1/users/octocat
   * });
   * ```
   */
  path?: string;
}

export interface ApiResponse extends Response {
  data: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Web {
  const defaultOptions = {
    client: "NEXT_PUBLIC_API_URL",
    server: "API_URL",
    isClient: typeof window !== "undefined",
  } as const;
  type Options = {
    client?: string;
    server?: string;
    isClient?: boolean | (() => boolean);
  };
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Api {
    // private constructor() {} // not meant to be instantiated
    export class Origin {
      /**
       * Get the API URL from the environment variables
       *
       * Defaults to `NEXT_PUBLIC_API_URL` for the client and `API_URL` for the server.
       *
       * `isClient` is used to determine if the code is running on the client or server.
       * Defaults to `typeof window !== "undefined"`, can be overridden with a boolean or a function that returns a boolean.
       *
       * @param env - The environment key to use for the API URL
       * @param options - Options to override the defaults
       * @returns
       */
      public static fromEnv(
        env?: string | null | undefined,
        options?: Partial<Options>,
      ): string {
        const mergedOptions = { ...defaultOptions, ...options };
        const { client, server, isClient } = mergedOptions;

        const key =
          env ?? (typeof isClient === "function" ? isClient() : isClient)
            ? client
            : server;

        return process.env[key] ?? process.env[client] ?? process.env[server] ?? "";
      }
    }
  }
}

const makeUrl = (input: Request | string | URL, init?: ApiInit) => {
  const path = init?.path ?? "";
  const origin = init?.origin ?? init?.baseUrl ?? Web.Api.Origin.fromEnv();

  const inputWithoutDoubleSlash = stripDoubleSlash(input.toString());

  const url = t.to.url(inputWithoutDoubleSlash, origin);
  if (path) url.pathname = `${path}${slashIt(url.pathname)}`;

  if (init?.params) {
    const existingParams = new URLSearchParams(url.search);
    const initParams = new URLSearchParams(init.params);
    const combinedParams = new URLSearchParams(
      `${existingParams.toString()}&${initParams.toString()}`,
    );

    const params = new URLSearchParams();
    combinedParams.forEach((value, key) => {
      params.set(key, value);
    });

    url.search = params.toString();
  }

  return url;
};

const slashIt = (str: string) => (str.endsWith("/") ? str : `${str}/`);
const stripDoubleSlash = (str: string) => str.replace(/[/]{2,}/g, "/");

export class HttpError extends Error {
  public static is(httpError: unknown): httpError is HttpError {
    return httpError instanceof HttpError;
  }
  constructor(public response: Response) {
    super(`HTTP error: ${response.status}`);
  }
}

/**
 * Extended version of fetch with defaults for the headers and the base URL.
 *
 * @param input {Request | string | URL} - The input to be called to, can be a URL, string or Request object.
 * @param init {ApiInit} - The options for the request.
 * @returns {Promise<unknown>} - The response from the request, you can use `await` to get the data, you are required to validate and parse the data.
 */
export async function api(
  input: Request | string | URL,
  init?: ApiInit,
): Promise<ApiResponse> {
  const headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });

  const url = makeUrl(input, init);

  // url that has the queryParams, trailing slash, and base url if present.
  const stringUrl = url.toString();
  const finalUrl = stripDoubleSlash(stringUrl);

  const response = await fetch(finalUrl, {
    headers,
    ...init,
  });

  if (!response.ok) {
    throw new HttpError(response);
  }

  return Object.assign(response, { data: await response.json() });
}

/**
 * Test code:
 */
// const main = async () => {
//   try {
//     console.log(Web.Api.Origin.fromEnv());

//     console.log("started");

//     const response = await api("1//?q=1", {
//       origin: "https://jsonplaceholder.typicode.com//1",
//       path: "//todos//",
//       params: {
//         h: "2",
//       },
//     });
//     console.log(response.status, response.data);
//   } catch (error) {
//     if (HttpError.is(error)) {
//       console.log(error.response.statusText);
//     } else {
//       console.error(error);
//     }
//   }
// };
// main().then(() => console.log("done"));
