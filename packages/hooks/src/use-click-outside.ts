import { RefObject } from "react";

import { useEventListener } from "./use-event-listener";

type Handler = (event: MouseEvent) => void;
/**
 * Use click outside hook to detect click outside of a component
 * @param ref Ref of the component
 * @param handler Handler to be called when click outside
 * @param mouseEvent Mouse event to listen to
 */
export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: "mousedown" | "mouseup" = "mousedown",
): void {
  useEventListener(mouseEvent, (event) => {
    const el = ref?.current;

    // Do nothing if clicking ref's element or descendent elements
    if (!el || el.contains(event.target as Node)) {
      return;
    }

    handler(event);
  });
}

export default useOnClickOutside;
