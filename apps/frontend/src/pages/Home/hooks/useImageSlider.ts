import { useState, useEffect } from 'react';

interface UseImageSliderProps {
  images: string[];
  interval?: number;
}

export const useImageSlider = ({ images, interval = 5000 }: UseImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return {
    currentIndex,
    goToSlide,
  };
};
