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
   * Defaults to: `Web.Api.fromEnv()`
   *
   * @see Web.Api.fromEnv
   *
   * @example
   * ```ts
   * const response = await api("/users/octocat", {
   *   baseUrl: "https://api.github.com"
   * });
   * ```
   */
  baseUrl?: string;
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
  export const Api = {
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
    fromEnv: (env?: string | null | undefined, options?: Partial<Options>): string => {
      const mergedOptions = { ...defaultOptions, ...options };
      const { client, server, isClient } = mergedOptions;

      const key =
        env ?? (typeof isClient === "function" ? isClient() : isClient)
          ? client
          : server;

      return process.env[key] ?? process.env[client] ?? process.env[server] ?? "";
    },
  };
}

const makeUrl = (input: RequestInfo | URL, init?: ApiInit) => {
  const baseUrl = init?.baseUrl ?? Web.Api.fromEnv();
  const url = t.to.url(input, baseUrl);

  if (init?.params) {
    const params = new URLSearchParams(init.params);
    url.search = params.toString();
  }

  return url;
};

const slashIt = (url: string) => (url.endsWith("/") ? url : `${url}/`);
// const itSlash = (url: string) => (url.startsWith("/") ? url : `/${url}`);
const stripDoubleSlash = (url: string) => url.replace(/([^:]\/)\/+/g, "$1");

export class HttpError extends Error {
  public static is(httpError: unknown): httpError is HttpError {
    return httpError instanceof HttpError;
  }
  constructor(public response: Response) {
    super(`HTTP error: ${response.status}`);
  }
}

export async function api(input: RequestInfo | URL, init?: ApiInit): Promise<unknown> {
  const headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });

  const url = makeUrl(input, init);
  // url that has the queryParams, trailing slash, and base url if present.
  const finalUrl = stripDoubleSlash(slashIt(url.toString()));

  const response = await fetch(finalUrl, {
    headers,
    ...init,
  });
  if (!response.ok) {
    throw new HttpError(response);
  }

  if (response.headers.get("Content-Type")?.includes("application/json")) {
    return response.json();
  }
  return response.text();
}

/**
 * Test code:
 */
// const main = async () => {
//   try {
//     console.log(Web.Api.fromEnv());

//     console.log("started");

//     const data = await api("/todos/1", {
//       baseUrl: "https://jsonplaceholder.typicode.com/",
//     });
//     console.log(data);
//   } catch (error) {
//     if (HttpError.is(error)) {
//       console.log(error.response.statusText);
//     } else {
//       console.error(error);
//     }
//   }
// };
// main().then(() => console.log("done"));
