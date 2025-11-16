import React from 'react';
import { Box } from '@mantine/core';
import { IndicatorDotsProps } from '../interface';

export const IndicatorDots: React.FC<IndicatorDotsProps> = ({
  total,
  currentIndex,
  onDotClick,
}) => {
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0 5rem',
        marginTop: '1,5rem',
      }}
    >
      {Array.from({ length: total }).map((_, index) => (
        <Box
          key={index}
          style={{
            width: currentIndex === index ? '2rem' : '0.5rem',
            height: '0.25rem',
            backgroundColor: currentIndex === index ? '#a38e13' : '#9ca3af',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onClick={() => onDotClick(index)}
          role="button"
          aria-label={`Go to testimonial ${index + 1}`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onDotClick(index);
            }
          }}
        />
      ))}
    </Box>
  );
};
