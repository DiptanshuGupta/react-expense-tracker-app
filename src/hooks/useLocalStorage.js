import { useEffect, useRef, useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const isFirst = useRef(true);
  const [value, setValue] = useState(() => {
    try {
      const json = localStorage.getItem(key);
      return json ? JSON.parse(json) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    // Avoid writing initial value back on mount
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage quota or privacy errors
    }
  }, [key, value]);

  return [value, setValue];
}