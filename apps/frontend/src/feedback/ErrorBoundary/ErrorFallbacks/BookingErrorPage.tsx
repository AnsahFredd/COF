import { Container, Title, Text, Button, Stack, Paper, Group } from '@mantine/core';
import { IconRefresh, IconAlertTriangle, IconPhoneCall } from '@tabler/icons-react';
import { ERROR_CONFIG } from '../config';

export const BookingErrorPage = ({
  onRefresh,
  onContactSupport,
}: {
  onRefresh: () => void;
  onContactSupport: () => void;
}) => (
  <Container size="sm" py={60}>
    <Paper withBorder shadow="md" p={40} radius="md">
      <Stack align="center" gap="lg">
        <IconAlertTriangle size={64} color="var(--mantine-color-orange-6)" />

        <Stack align="center" gap="xs">
          <Title order={2} ta="center">
            Booking Error
          </Title>
          <Text c="dimmed" ta="center">
            We couldn't complete your booking. Your progress has been saved.
          </Text>
        </Stack>

        <Group>
          <Button leftSection={<IconRefresh size={16} />} onClick={onRefresh} variant="light">
            Refresh Page
          </Button>
          <Button leftSection={<IconPhoneCall size={16} />} onClick={onContactSupport}>
            Contact Support
          </Button>
        </Group>

        <Text size="sm" c="dimmed" ta="center">
          Need help? Call us at {ERROR_CONFIG.suppertPhone} or email {ERROR_CONFIG.supportEmail}
        </Text>
      </Stack>
    </Paper>
  </Container>
);
