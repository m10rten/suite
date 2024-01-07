import { useState } from "react";

import { useEventListener } from "./use-event-listener";

/**
 * Use key hook to detect when a key is pressed on the keyboard, uses `useEventListener` under the hood
 * @param key Key to listen to
 * @param callback Callback to be called when key is pressed
 * @returns Whether the key is pressed or not
 */
export function useKey<T>(
  key: string,
  callback: (event: KeyboardEvent) => void | PromiseLike<T> | Promise<T> | T,
) {
  const [pressed, setPressed] = useState(false);

  useEventListener("keydown", async (event) => {
    if (event.key === key) {
      setPressed(true);
      await callback(event);
    }
  });

  useEventListener("keyup", (event) => {
    if (event.key === key) {
      setPressed(false);
    }
  });

  return pressed;
}
