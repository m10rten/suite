import { useStorage } from "./use-storage";

/**
 * @description {useSessionStorage} - useSessionStorage
 * @param key - The key to use for the storage
 * @param initialValue - The initial value to use
 *
 * Returns a stateful value, a setter and a boolean to indicate if the value exists in the storage before the first render.
 */
export function useSessionStorage<T>(key: string, initialValue: T) {
  return useStorage(window.sessionStorage)(key, initialValue);
}
