import { useCallback, useState } from "react";
import { AnyData, AnyResponse, DefineOptions, HttpMethods, Zap } from "@mvdlei/zap";

const zap = Zap.init({});

/**
 * @unstable do not use
 *
 * Hook to make requests with Zap
 * @param url
 * @param param1
 * @returns
 */
export function useUnstableZap<TIn extends AnyData, TOut extends AnyResponse>(
  url: URL | string | Request,
  { output, input, headers, method }: Partial<DefineOptions<TIn, TOut>> = {},
) {
  const [data, setData] = useState<TOut | undefined>();
  const [error, setError] = useState<Error | undefined>();
  const [loading, setLoading] = useState(false);
  const act = useCallback(
    () =>
      zap.define(url, {
        method: method ?? HttpMethods.GET,
        output: output as TOut,
        input: input as TIn,
        headers,
      }),
    [url, method, output, input, headers],
  );

  const exec = useCallback(
    async (input?: TIn) => {
      try {
        setLoading(true);
        const result = await act()({ body: input });
        setData(result);
      } catch (error) {
        if (error instanceof Error) setError(error);
        else setError(new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    },
    [act],
  );

  return {
    call: exec,
    data,
    error,
    loading,
  } as const;
}
