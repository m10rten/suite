import { useEffect, useState } from "react";

/**
 * @description {useDebounce} - Debounce a value for a given delay
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds
 * @returns {T} Debounced value
 */
export function useDebounce<T>(value: T, delay: number | undefined = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
