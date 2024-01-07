import { useCallback, useEffect, useState } from "react";

/**
 * Use scroll hook to detect when the user scrolls past a certain threshold
 * @param threshold Threshold to be scrolled past
 * @returns {boolean} Whether the user has scrolled past the threshold or not
 */
export function useScroll(threshold: number): boolean {
  const [scrolled, setScrolled] = useState(false);

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return scrolled;
}

export default useScroll;
