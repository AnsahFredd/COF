import { Stack, Container, Box, Grid, Group, Text } from '@mantine/core';
import { IndicatorDots } from './components/IndicatorDots';
import { NavigationButtons } from './components/NavigationArrow';
import { TestimonialAvatar } from './components/TestimonailAvatar';
import { TestimonialContent } from './components/TestimonialContent';
import { SectionHeader } from './components/TestimonialHeader';
import { testimonials } from './constants/testimonials';
import { getGradientBackground } from './helpers';
import { useTestimonialNavigation } from './hooks/useTestimonials';

interface TestimonialCountProps {
  displayCount: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const TestimonialSection = ({
  displayCount,
  autoPlay = true,
  autoPlayInterval = 5000,
}: TestimonialCountProps) => {
  const visibleTestimonials = testimonials.slice(0, displayCount);

  const { currentIndex, next, prev, goTo, pause, resume } = useTestimonialNavigation(
    visibleTestimonials.length,
    { autoPlay, autoPlayInterval }
  );
  const currentTestimonial = visibleTestimonials[currentIndex];

  return (
    <Box
      py={{ base: 60, md: 100 }}
      style={getGradientBackground()}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <Container size="xl">
        <Stack gap="xl">
          <SectionHeader
            badge="Testimonials"
            title="What Our Clients Say"
            subtitle="Don't just take our word for it—hear from clients who've experienced unforgettable events"
          />

          <Grid gutter="xl" align="center">
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Stack align="center" gap="lg">
                <TestimonialAvatar
                  image={currentTestimonial.image}
                  name={currentTestimonial.name}
                />
                <Stack gap={4} align="center">
                  <Text fw={700} size="xl">
                    {currentTestimonial.name}
                  </Text>
                  <Text c="dimmed" size="sm">
                    {currentTestimonial.role}
                  </Text>
                </Stack>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 8 }}>
              <TestimonialContent testimonial={currentTestimonial} displayCount={displayCount} />

              <Group justify="space-between" align="center" mt="xl">
                <NavigationButtons onPrev={prev} onNext={next} />
                <IndicatorDots
                  total={visibleTestimonials.length}
                  current={currentIndex}
                  onChange={goTo}
                />
              </Group>
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default TestimonialSection;
