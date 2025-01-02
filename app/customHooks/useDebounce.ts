import { useEffect, useState } from "react";

// ? Custom hook to use debouncing

export const useDebounce = (
  value: string,
  milliseconds: number = 700
): { debouncedValue: string } => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, milliseconds);

    return () => {
      clearTimeout(timer);
    };
  }, [value, milliseconds]);

  return { debouncedValue };
};
