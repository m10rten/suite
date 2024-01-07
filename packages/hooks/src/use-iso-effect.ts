import { useEffect, useLayoutEffect } from "react";

/**
 * Use isomorphic layout effect hook for when you need to use layout effect in SSR
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
