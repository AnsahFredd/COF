import {
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
  Button,
  Box,
  Collapse,
  Select,
} from '@mantine/core';
import { IconRefresh, IconSearch, IconFilter } from '@tabler/icons-react';
import { useState } from 'react';

interface NotificationHeaderProps {
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
  readStatusFilter: 'all' | 'read' | 'unread';
  onReadStatusFilterChange: (value: 'all' | 'read' | 'unread') => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const NotificationHeader = ({
  onSearchChange,
  onRefresh,
  readStatusFilter,
  onReadStatusFilterChange,
  onResetFilters,
  hasActiveFilters,
}: NotificationHeaderProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <Paper top="0" w="100%" p="xs" mb="xs" pos="sticky" withBorder radius="md">
      <Group justify="space-between" align="center" mb="xs">
        <Stack gap={0}>
          <Title order={3}>Notifications</Title>
          <Text c="dimmed" size="sm">
            Stay updated with the latest activities
          </Text>
        </Stack>
      </Group>
      <Group gap="xs" w="100%">
        <TextInput
          flex="1"
          size="sm"
          placeholder="Search by title or message..."
          leftSection={<IconSearch size={20} />}
          onChange={(event) => onSearchChange(event.currentTarget.value)}
        />
        <Group gap={2}>
          <Button px="xs" size="sm" variant="default" onClick={onRefresh}>
            <IconRefresh size={16} />
          </Button>

          <Button px="xs" size="sm" variant="default" onClick={handleShowFilters}>
            <IconFilter size={16} />
          </Button>
        </Group>
      </Group>

      <Collapse in={showFilters}>
        <Box p="xs" mt="xs">
          <Stack gap="xs">
            <Select
              label="Read Status"
              placeholder="All notifications"
              data={[
                { value: 'all', label: 'All' },
                { value: 'read', label: 'Read' },
                { value: 'unread', label: 'Unread' },
              ]}
              value={readStatusFilter}
              onChange={(value) => onReadStatusFilterChange(value as 'all' | 'read' | 'unread')}
              size="sm"
            />
            {hasActiveFilters && (
              <Group justify="flex-end">
                <Button size="xs" variant="subtle" onClick={onResetFilters}>
                  Reset Filters
                </Button>
              </Group>
            )}
          </Stack>
        </Box>
      </Collapse>
    </Paper>
  );
};
