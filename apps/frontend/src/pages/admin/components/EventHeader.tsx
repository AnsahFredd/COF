import {
  Box,
  Button,
  Collapse,
  Group,
  Paper,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
  Select,
} from '@mantine/core';
import {
  IconColumns,
  IconColumnsOff,
  IconFileSpreadsheet,
  IconFileText,
  IconRefresh,
  IconSearch,
  IconFilter,
} from '@tabler/icons-react';
import { Table, Column } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { Event } from 'src/services/api/events';
import { exportEvents, PageInfo } from '../helpers/exports';

interface EventHeaderProps {
  table: Table<Event>;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
  pageInfo?: PageInfo;
  statusFilter: string | null;
  eventTypeFilter: string | null;
  uniqueStatuses: string[];
  uniqueEventTypes: string[];
  onStatusFilterChange: (value: string | null) => void;
  onEventTypeFilterChange: (value: string | null) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

const getColumnLabel = (column: Column<Event, unknown>): string => {
  return (column.columnDef.meta as { columnName?: string })?.columnName || column.id;
};

export const EventHeader = ({
  table,
  onSearchChange,
  onRefresh,
  pageInfo,
  statusFilter,
  eventTypeFilter,
  uniqueStatuses,
  uniqueEventTypes,
  onStatusFilterChange,
  onEventTypeFilterChange,
  onResetFilters,
  hasActiveFilters,
}: EventHeaderProps) => {
  const [showColumns, setShowColumns] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const showExportButton = useMemo(() => {
    return table.getSelectedRowModel().rows.length > 0;
  }, [table]);

  const handleShowColumns = () => {
    setShowColumns(!showColumns);
    if (!showColumns) {
      // Close filters when opening columns
      setShowFilters(false);
    }
  };

  const handleShowFilters = () => {
    setShowFilters(!showFilters);
    if (!showFilters) {
      // Close columns when opening filters
      setShowColumns(false);
    }
  };

  const handleExport = async (format: 'csv' | 'excel') => {
    const events = table.getSelectedRowModel().rows.map((row) => row.original);
    if (events.length === 0) return;

    await exportEvents(events, table, format, {
      pageInfo,
      filenameBase: `customer_events_export_${new Date().getTime()}`,
    });
  };

  return (
    <Paper top="0" w="100%" p="xs" mb="xs" pos="sticky" withBorder radius="md">
      <Group justify="space-between" align="center" mb="xs">
        <Stack gap={0}>
          <Title order={3}>Customer Events</Title>
          <Text c="dimmed" size="sm">
            Manage event inquiries and requests
          </Text>
        </Stack>
        <Group>
          {showExportButton && (
            <Button.Group>
              <Button
                size="sm"
                variant="default"
                leftSection={<IconFileText size={16} />}
                onClick={() => handleExport('csv')}
              >
                Export CSV ({table.getSelectedRowModel().rows.length})
              </Button>
              <Button
                size="sm"
                variant="default"
                leftSection={<IconFileSpreadsheet size={16} />}
                onClick={() => handleExport('excel')}
              >
                Export Excel ({table.getSelectedRowModel().rows.length})
              </Button>
            </Button.Group>
          )}
        </Group>
      </Group>
      <Group gap="xs" w="100%">
        <TextInput
          flex="1"
          size="sm"
          placeholder="Search events by name, email, or phone..."
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

          <Button variant="default" size="sm" onClick={handleShowColumns}>
            {showColumns ? <IconColumnsOff size={16} /> : <IconColumns size={16} />}
          </Button>
        </Group>
      </Group>

      <Collapse in={showFilters}>
        <Box p="xs" mt="xs">
          <Stack gap="xs">
            <Group grow>
              <Select
                label="Status"
                placeholder="All statuses"
                data={uniqueStatuses}
                value={statusFilter}
                onChange={onStatusFilterChange}
                clearable
                size="sm"
              />
              <Select
                label="Event Type"
                placeholder="All event types"
                data={uniqueEventTypes}
                value={eventTypeFilter}
                onChange={onEventTypeFilterChange}
                clearable
                size="sm"
              />
            </Group>
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

      <Collapse in={showColumns}>
        <Box p="xs" mt="xs">
          <Group>
            {table.getAllColumns().map((column) => (
              <Switch
                key={column.id}
                label={getColumnLabel(column)}
                checked={column.getIsVisible()}
                disabled={!column.getCanHide()}
                onChange={column.getToggleVisibilityHandler()}
                display={column.getCanHide() ? 'block' : 'none'}
              />
            ))}
          </Group>
        </Box>
      </Collapse>
    </Paper>
  );
};
