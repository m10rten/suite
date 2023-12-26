import { useEffect, useState } from "react";

export function useStorage(storage: Storage) {
  return function useStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    const setValue = (value: T) => {
      setStoredValue(value);
      storage.setItem(key, JSON.stringify(value));
    };

    useEffect(() => {
      const item = storage.getItem(key);
      setStoredValue(item ? JSON.parse(item) : initialValue);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValue]);

    return {
      value: storedValue,
      set: setValue,
      exists: storage.getItem(key) !== null && storage.getItem(key) !== undefined,
    } as const;
  };
}