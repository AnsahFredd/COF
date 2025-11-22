import { Paper, Stack, Box, Text } from '@mantine/core';
import { getCardGradient } from '../helpers';
import { TestimonialContentProps } from '../interface';

export const TestimonialContent: React.FC<TestimonialContentProps> = ({ testimonial }) => {
  return (
    <Paper radius="xl" p={{ base: 'xl', md: '2.5rem' }} shadow="lg" style={getCardGradient()}>
      <Stack gap="xl">
        <Box>
          <Text size="6rem" lh={1} fw={700} c="gold.2" style={{ fontFamily: 'Georgia, serif' }}>
            "
          </Text>
        </Box>

        <Text
          size="xl"
          lh={1.8}
          c="dark.8"
          fw={400}
          style={{
            marginTop: '-2rem',
            fontStyle: 'italic',
          }}
        >
          {testimonial.message}
        </Text>
      </Stack>
    </Paper>
  );
};
