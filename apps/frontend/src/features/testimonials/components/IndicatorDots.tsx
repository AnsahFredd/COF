import { Group, Box } from '@mantine/core';
import { IndicatorDotsProps } from '../interface';

export const IndicatorDots: React.FC<IndicatorDotsProps> = ({ total, current, onChange }) => {
  return (
    <Group gap="xs">
      {Array.from({ length: total }).map((_, idx) => (
        <Box
          key={idx}
          onClick={() => onChange(idx)}
          style={{
            width: idx === current ? 32 : 8,
            height: 8,
            borderRadius: 4,
            backgroundColor:
              idx === current ? 'var(--mantine-color-gold-5)' : 'var(--mantine-color-gray-3)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          role="button"
          aria-label={`Go to testimonial ${idx + 1}`}
          tabIndex={0}
        />
      ))}
    </Group>
  );
};
