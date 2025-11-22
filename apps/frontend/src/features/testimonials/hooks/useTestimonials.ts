import { useCallback, useEffect, useState } from 'react';

interface useTestimonialNavigationOptions {
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const useTestimonialNavigation = (
  totalItems: number,
  options: useTestimonialNavigationOptions = {}
) => {
  const { autoPlay = false, autoPlayInterval = 5000 } = options;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const intervalId = setInterval(next, autoPlayInterval);

    return () => clearInterval(intervalId);
  }, [autoPlay, autoPlayInterval, isPaused, next]);

  return {
    currentIndex,
    next,
    prev,
    goTo,
    pause,
    resume,
  };
};
