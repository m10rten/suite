import { useCallback } from "react";
import { useSearchParams, type URLSearchParamsInit } from "react-router-dom";

/**
 * @description {useQueryState} - A hook to manage a query state
 * @param key - The key to use for the query
 * @param init - The initial value to use
 *
 * Returns a stateful value and a setter.
 */
export const useQueryState = (key: string, init?: URLSearchParamsInit) => {
  const [searchParams, setSearchParams] = useSearchParams(init);

  const setQuery = useCallback(
    (value: URLSearchParamsInit) => {
      if (key) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - This throws an error because somehow it infers as undefined
        setSearchParams({ ...searchParams, [key]: value });
      } else {
        if (value) setSearchParams(value);
        else setSearchParams("");
      }
    },
    [key, searchParams, setSearchParams],
  );

  return [searchParams.get(key) || "", setQuery] as const;
};
