import { useCallback, useState } from "react";
import {
  AnyData,
  AnyResponse,
  DefineOptions,
  HTTPError,
  HttpMethods,
  TimeoutError,
  Zap,
  ZapOptions,
} from "@mvdlei/zap";

type Input = Request | URL | string;

type UseHookReturn<TIn extends AnyData, TOut extends AnyResponse> = {
  call: (input?: TIn) => Promise<void>;
  data: TOut | undefined;
  error: Error | HTTPError | TimeoutError | undefined;
  loading: boolean;
};

type WantedOptions<TIn extends AnyData, TOut extends AnyResponse> = Partial<
  DefineOptions<TIn, TOut>
>;

/**
 * Create a hook to make requests with Zap
 *
 * @unstable do not use
 *
 * @param options
 * @returns
 */
export function useZap(
  options: ZapOptions & { origin: string },
): (
  url: Input,
  options?: WantedOptions<AnyData, AnyResponse>,
) => UseHookReturn<AnyData, AnyResponse> {
  const zap = Zap.init(options);

  /**
   * @unstable do not use
   *
   * Hook to make requests with Zap
   * @param url
   * @param param1
   * @returns
   */
  return function useZap<TIn extends AnyData, TOut extends AnyResponse>(
    url: Input,
    { output, input, headers, method, params }: WantedOptions<TIn, TOut> = {},
  ): UseHookReturn<TIn, TOut> {
    const [data, setData] = useState<TOut | undefined>();
    const [error, setError] = useState<Error | HTTPError | TimeoutError | undefined>();
    const [loading, setLoading] = useState(false);
    const act = useCallback(
      () =>
        zap.define(url, {
          method: method ?? HttpMethods.GET,
          output: output as TOut,
          input: input as TIn,
          headers,
          params,
        }),
      [url, method, output, input, headers, params],
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
  };
}
