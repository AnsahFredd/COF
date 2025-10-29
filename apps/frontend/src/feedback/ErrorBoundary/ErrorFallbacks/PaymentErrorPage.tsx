import { Container, Title, Text, Button, Stack, Paper } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import { ERROR_CONFIG } from '../config';

export const PaymentErrorPage = ({ onGoToBookings }: { onGoToBookings: () => void }) => (
  <Container size="sm" py={60}>
    <Paper withBorder shadow="md" p={40} radius="md" bg="red.0">
      <Stack align="center" gap="lg">
        <IconAlertTriangle size={64} color="var(--mantine-color-red-7)" />

        <Stack align="center" gap="xs">
          <Title order={2} ta="center" c="red.9">
            Payment Processing Error
          </Title>
          <Text c="red.8" ta="center" fw={500}>
            Your payment was not processed. You have not been charged.
          </Text>
        </Stack>

        <Button size="lg" onClick={onGoToBookings} fullWidth>
          Return to Bookings
        </Button>

        <Text size="sm" c="red.9" ta="center" fw={600}>
          If you were charged, please contact us immediately at {ERROR_CONFIG.suppertPhone}
        </Text>
      </Stack>
    </Paper>
  </Container>
);
