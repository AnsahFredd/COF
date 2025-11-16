import React from 'react';
import { Stack, Title, Text, Anchor, Box } from '@mantine/core';
import { Quote } from 'lucide-react';
import { Testimonial } from '../interface';
import { ROUTES } from 'src/constants/routes';

interface TestimonialContentProps {
  testimonial: Testimonial;
}

export const TestimonialContent: React.FC<TestimonialContentProps> = ({ testimonial }) => {
  return (
    <Stack align="center" gap="lg">
      <Box c="gold.5">
        <Quote size={40} strokeWidth={1.5} />
      </Box>

      <Title order={2} size="2rem" ta="center" fw={400} style={{ fontFamily: '' }}>
        What Our Clients Are Saying
      </Title>

      <Title order={3} size="1.25rem" ta="center" fw={500} mt="xs" style={{ fontFamily: '' }}>
        {testimonial.name}
      </Title>

      <Text size="md" c="gray" ta="center" maw="800px" lh={1.7} style={{ fontFamily: '' }}>
        {testimonial.message}
      </Text>

      <Text size="sm" fw={500} ta="center" style={{ fontFamily: '' }}>
        {testimonial.role}
      </Text>

      <Anchor
        href={ROUTES.ABOUT}
        c="gold.6"
        size="sm"
        fw={500}
        style={{
          fontFamily: '',
          textDecoration: 'none',
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        View All Testimonials
      </Anchor>
    </Stack>
  );
};
