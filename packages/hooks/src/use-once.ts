import { useEffect, type EffectCallback } from "react";

/**
 * Use once hook to run an effect only once (on mount)
 * @param callback Callback to be called once
 */
export function useOnce(callback: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, []);
}

export default useOnce;
