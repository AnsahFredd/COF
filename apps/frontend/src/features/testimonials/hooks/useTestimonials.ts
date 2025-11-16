import { useState, useEffect, useCallback } from 'react';
import { Testimonial } from '../interface';

interface UseTestimonialProps {
  testimonials: Testimonial[];
}

export const useTestimonials = ({ testimonials }: UseTestimonialProps) => {
  const displayedTestimonials = testimonials.slice(0, 3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = displayedTestimonials.length;

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const previous = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 10000);
    return () => clearInterval(timer);
  }, [next]);

  return {
    currentTestimonial: displayedTestimonials[currentIndex],
    currentIndex,
    total,
    displayedTestimonials,
    next,
    previous,
    goToIndex,
  };
};
