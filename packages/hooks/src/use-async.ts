import React from "react";

export interface IUseAsyncOptions<R> {
  /**
   * Callback to execute when an error occurs.
   */
  onError?: (error: unknown) => void;

  /**
   * Callback to execute when the promise resolves successfully.
   */
  onSuccess?: (result: R) => void;
}

/**
 * Use async hook to execute an async function.
 * @param fn - The function to execute.
 * @param options - Options to pass to the hook.
 * @param dependencies - Dependencies to pass to the `useCallback` hook.
 * @returns The `execute` function, `loading` state, `error` and `result` of the promise.
 *
 * @example
 * ```tsx
 * const { execute, loading, error, result } = useAsync(asyncFn);
 * ```
 *
 * To use a dependency, pass it as the third argument, leaving the second argument empty:
 * ```tsx
 * const { execute, loading, error, result } = useAsync(asyncFn, undefined, [dependency]);
 * ```
 */
export function useAsync<R, A, F extends (...args: A[]) => R>(
  /**
   * The function to execute.
   */
  fn: F,
  /**
   * Options to pass to the hook.
   */
  options?: Partial<IUseAsyncOptions<R>>,
  /**
   * Dependencies to pass to the `useCallback` hook.
   */
  dependencies?: React.DependencyList,
) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [result, setResult] = React.useState<R | null>(null);

  const execute = React.useCallback(
    async (...args: Parameters<F>) => {
      setLoading(true);
      setError(null);
      setResult(null);

      try {
        const result = await fn(...args);
        setResult(result);
        if (options?.onSuccess) options.onSuccess(result);
      } catch (error) {
        if (error instanceof Error) setError(error);
        else setError(new Error("An unknown error occurred"));
        if (options?.onError) options.onError(error);
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fn, ...(dependencies ?? [])],
  );

  return { execute, loading, error, result } as const;
}

export default useAsync;
