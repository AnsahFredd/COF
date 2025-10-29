import { Container, Title, Text, Button, Stack, Paper, Group } from '@mantine/core';
import { IconRefresh, IconHome, IconAlertTriangle } from '@tabler/icons-react';
import { ERROR_CONFIG } from '../config';
import { env } from 'src/config/env';

export const GlobaErrorPage = ({
  error,
  onReset,
  onGoHome,
  customMessage,
}: {
  error: Error | null;
  onReset: () => void;
  onGoHome: () => void;
  customMessage?: string;
}) => (
  <Container size="sm" py={80}>
    <Paper withBorder shadow="md" p={40} radius="md">
      <Stack align="center" gap="lg">
        <IconAlertTriangle size={64} color="var(--mantine-color-red-6)" />

        <Stack align="center" gap="xs">
          <Title order={2} ta="center">
            Oops! Something went wrong.
          </Title>
          <Text c="dimmed" ta="center">
            {customMessage ||
              "We're sorry for the inconvenience. An error occurred while processing your request."}
          </Text>
        </Stack>

        {env.NODE_ENV === 'development' && error && (
          <Paper withBorder p="md" bg="gray.0" w="100%">
            <Text size="sm" fw={600} mb="xs">
              Error Details (Development Only);
            </Text>
            <Text size="xs" c="red" style={{ fontFamily: 'monospace' }}>
              {error.toString()}
            </Text>
          </Paper>
        )}

        <Group>
          <Button leftSection={<IconRefresh size={16} />} onClick={onReset} variant="light">
            Try Again
          </Button>
          <Button leftSection={<IconHome size={16} />} onClick={onGoHome}>
            Go to Homepage
          </Button>
        </Group>

        <Text size="xs" c="dimmed" ta="center">
          If this problem persists, please{' '}
          <Text component="a" href={ERROR_CONFIG.contactUrl} c="blue" td="underline" span>
            contact our support team
          </Text>
          .
        </Text>
      </Stack>
    </Paper>
  </Container>
);
