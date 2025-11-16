import React from 'react';
import { Container, Paper } from '@mantine/core';
import { useTestimonials } from './hooks/useTestimonials';
import { TestimonialContent } from './components/TestimonialContent';
import { NavigationArrow } from './components/NavigationArrow';
import { IndicatorDots } from './components/IndicatorDots';
import { Testimonials } from './constants/testimonials';

const TestimonialSection: React.FC = () => {
  const { currentIndex, currentTestimonial, total, next, previous, goToIndex } = useTestimonials({
    testimonials: Testimonials,
  });

  return (
    <Container size="80rem" px="md" py="xl">
      <Paper
        radius="xl"
        shadow="md"
        p={{ base: 'xl', sm: '3rem' }}
        pos="relative"
        style={{ overflow: 'visible' }}
      >
        <TestimonialContent testimonial={currentTestimonial} />

        <NavigationArrow direction="left" onClick={previous} />
        <NavigationArrow direction="right" onClick={next} />

        <IndicatorDots total={total} currentIndex={currentIndex} onDotClick={goToIndex} />
      </Paper>
    </Container>
  );
};

export default TestimonialSection;
