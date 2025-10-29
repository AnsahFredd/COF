import { Stack, Text, Title, Center, Anchor, Group } from '@mantine/core';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import type { EmptyStateProps } from './interface';

export const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  minHeight,
}: EmptyStateProps) => {
  return (
    <Center style={{ minHeight }}>
      <Stack
        align="center"
        gap="lg"
        style={{
          maxWidth: 500,
          width: '100%',
          textAlign: 'center',
        }}
      >
        {icon && (
          <Center
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: 'var(--mantine-color-gray-1)',
            }}
          >
            {icon}
          </Center>
        )}

        <Stack gap="xs" align="center">
          <Title order={2} size="h3" fw={600}>
            {title}
          </Title>
          <Text c="dimmed" size="sm" maw={400}>
            {description}
          </Text>
        </Stack>

        {(actionLabel || secondaryActionLabel) && (
          <Stack gap="md" align="center" mt="md">
            {actionLabel && onAction && (
              <Anchor
                onClick={onAction}
                style={{
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 500,
                }}
              >
                <Group gap="xs">
                  <span>{actionLabel}</span>
                  <ArrowRight size={18} />
                </Group>
              </Anchor>
            )}
            {secondaryActionLabel && onSecondaryAction && (
              <Anchor
                onClick={onSecondaryAction}
                c="dimmed"
                style={{
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                <Group gap="xs">
                  <ArrowLeft size={16} />
                  <span>{secondaryActionLabel}</span>
                </Group>
              </Anchor>
            )}
          </Stack>
        )}
      </Stack>
    </Center>
  );
};
