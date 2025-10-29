/**
 * This hook delays updating a value until after a specified period of inactivaity
 * It's typically used to prevent excessive API calls or expensive computaion
 * while a user is typing, scrolling, or adjusting filters
 *
 * @param value The input value to debounce
 * @param delay The delay duration in milliseconds
 * @returns The dobounced value
 */

import { useState, useEffect } from 'react';

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearInterval(handler);
  }, [value, delay]);

  return debouncedValue;
};
