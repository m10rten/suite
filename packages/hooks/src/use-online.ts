import { useState } from "react";

import useEventListener from "./use-event-listener";

export function useOnline() {
  const [online, setOnline] = useState(window?.navigator?.onLine);
  const handler = () => {
    if (typeof window === "undefined" || !window || !window?.navigator) return;
    setOnline(window?.navigator?.onLine || false);
  };
  useEventListener("online", handler);
  useEventListener("offline", handler);

  return online;
}
