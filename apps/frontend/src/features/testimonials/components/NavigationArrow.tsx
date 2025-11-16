import React from 'react';
import { ActionIcon } from '@mantine/core';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NavigationArrowProps } from '../interface';

export const NavigationArrow: React.FC<NavigationArrowProps> = ({ direction, onClick }) => {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
  const position = direction === 'left' ? { left: '1rem' } : { right: '1rem' };

  return (
    <ActionIcon
      variant="subtle"
      c="gold.6"
      size="xl"
      radius="xl"
      pos="absolute"
      style={{
        ...position,
        top: '50%',
        transform: 'translateY(-50%)',
        transition: 'all 0.2s',
      }}
      onClick={onClick}
      aria-label={`${direction === 'left' ? 'Previous' : 'Next'} testimonial`}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(163, 142, 19, 0.1)';
        e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
      }}
    >
      <Icon size={28} strokeWidth={2} />
    </ActionIcon>
  );
};
