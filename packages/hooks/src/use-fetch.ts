import { useCallback, useEffect, useMemo, useState } from "react";

export class HTTPError extends Error {
  constructor(public response: Response) {
    super(response.statusText);
  }
}

export type FetchConfig<T> = {
  timeout?: number | string | null | undefined;
  /**
   * Even though accepts a promise, it will not wait for it to resolve
   * @param data
   * @returns {void | Promise<void>}
   */
  onSucces?: (data: T) => void | Promise<void>;
  /**
   * Even though accepts a promise, it will not wait for it to resolve
   * @param error
   * @returns {void | Promise<void>}
   */
  onError?: (error: HTTPError) => void | Promise<void>;
  /**
   * Even though accepts a promise, it will not wait for it to resolve
   * @returns {void | Promise<void>}
   */
  onAbort?: () => void | Promise<void>;
};

/**
 * Hook to make requests with fetch
 *
 * Error will be an instance of HTTPError
 *
 * @param url {URL | string | Request} The URL to request
 * @param options {RequestInit} The options to pass to fetch
 * @param config {Partial<FetchConfig<T>>} The configuration for the request
 * @link FetchConfig<T>
 *
 * @example
 * ```tsx
 * const { data, error, loading, mutate, abort } = useFetch("https://api.example.com");
 * ```
 */
export function useFetch<T>(
  url: URL | string | Request,
  options?: RequestInit,
  config?: Partial<FetchConfig<T>>,
) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<HTTPError>();
  const [loading, setLoading] = useState(false);

  const controller = useMemo(() => new AbortController(), []);
  const signal = useMemo(() => controller.signal, [controller]);

  /**
   * Abort the current request
   */
  const abort = useCallback(() => {
    controller.abort();
    if (config?.onAbort) config.onAbort();
  }, [controller, config]);

  useEffect(() => {
    return () => controller.abort();
  }, [controller]);

  /**
   * Make the request
   */
  const mutate = useCallback(async () => {
    try {
      setLoading(true);
      if (config?.timeout) setTimeout(abort, Number(config?.timeout || 15_000));
      const response = await fetch(url, { ...options, signal });
      if (!response.ok) throw new HTTPError(response);
      const result = await response.json();

      setData(result);
      if (config?.onSucces) config.onSucces(result);
    } catch (error) {
      abort();
      const httpError =
        error instanceof HTTPError
          ? error
          : new HTTPError(new Response("Unknown error", { status: 500 }));
      setError(httpError);
      if (config?.onError) config.onError(httpError);
    } finally {
      setLoading(false);
    }
  }, [signal, abort, config, options, url]);

  return {
    mutate,
    abort,
    data,
    error,
    loading,
  } as const;
}
