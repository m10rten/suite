import { useState } from "react";

/**
 * Use copy to clipboard hook to copy a value to the clipboard
 *
 * @description {useCopyToClipboard} - Copy a value to the clipboard
 * @returns  - The copied value and the copy function
 */
export function useCopyToClipboard() {
  const [copied, setCopiedText] = useState<string | null>(null);

  const copy = async (text: string) => {
    if (!navigator?.clipboard) {
      // eslint-disable-next-line no-console
      console.warn("Clipboard not supported");
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn("Copy failed", error);
      setCopiedText(null);
      return false;
    }
  };

  return [copied, copy] as const;
}

export default useCopyToClipboard;
