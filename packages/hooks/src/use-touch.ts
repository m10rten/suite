import { useState } from "react";

import { useEventListener } from "./use-event-listener";

/**
 * Use touch hook to detect when a touch event is fired, uses `useEventListener` under the hood
 * @param callback Callback to be called when touch event is fired
 * @returns Whether the user has touched or not
 */
export function useTouch<T>(
  callback: (event: TouchEvent) => void | PromiseLike<T> | Promise<T> | T,
) {
  const [touched, setTouched] = useState(false);

  useEventListener("touchstart", async (event) => {
    setTouched(true);
    await callback(event);
  });

  return touched;
}

export default useTouch;
