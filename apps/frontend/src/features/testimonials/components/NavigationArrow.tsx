import { ActionIcon, Group } from '@mantine/core';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NavigationArrowProps } from '../interface';

export const NavigationButtons: React.FC<NavigationArrowProps> = ({ onPrev, onNext }) => (
  <Group gap="xs">
    <ActionIcon
      variant="light"
      color="gold"
      size="xl"
      radius="xl"
      onClick={onPrev}
      aria-label="Previous testimonial"
    >
      <ChevronLeft size={24} />
    </ActionIcon>
    <ActionIcon
      variant="light"
      color="gold"
      size="xl"
      radius="xl"
      onClick={onNext}
      aria-label="Next testimonial"
    >
      <ChevronRight size={24} />
    </ActionIcon>
  </Group>
);
