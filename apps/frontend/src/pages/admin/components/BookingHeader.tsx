import {
  Box,
  Button,
  Collapse,
  Group,
  Paper,
  Stack,
  Switch,
  Text,
  Title,
  TextInput,
  Select,
} from '@mantine/core';
import {
  IconColumns,
  IconColumnsOff,
  IconFileSpreadsheet,
  IconFileText,
  IconRefresh,
  IconFilter,
  IconSearch,
} from '@tabler/icons-react';
import { Table } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { Booking } from 'src/services/api/bookings';
import { exportBookings } from '../helpers/booking';

interface BookingHeaderProps {
  table: Table<Booking>;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
  statusFilter: string | null;
  eventTypeFilter: string | null;
  uniqueStatuses: string[];
  uniqueEventTypes: string[];
  onStatusFilterChange: (value: string | null) => void;
  onEventTypeFilterChange: (value: string | null) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

const getColumnLabel = (column: any): string => {
  return column.columnDef.meta?.columnName || column.id;
};

export const BookingHeader = ({
  table,
  onRefresh,
  onSearchChange,
  statusFilter,
  eventTypeFilter,
  uniqueStatuses,
  uniqueEventTypes,
  onStatusFilterChange,
  onEventTypeFilterChange,
  onResetFilters,
  hasActiveFilters,
}: BookingHeaderProps) => {
  const [showColumns, setShowColumns] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const showExportButton = useMemo(() => {
    return table.getSelectedRowModel().rows.length > 0;
  }, [table, table?.getState().rowSelection]);

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
    const bookings = table.getSelectedRowModel().rows.map((row) => row.original);
    if (bookings.length === 0) return;

    await exportBookings(bookings, table, format, {
      filenameBase: `bookings_export_${new Date().getTime()}`,
    });
  };

  return (
    <Paper top="0" w="100%" p="xs" mb="xs" pos="sticky" withBorder radius="md">
      <Group justify="space-between" align="center" mb="xs">
        <Stack gap={0}>
          <Title order={3}>Bookings</Title>
          <Text c="dimmed" size="sm">
            Track and manage event bookings
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
          flex={1}
          size="sm"
          placeholder="Search bookings..."
          leftSection={<IconSearch size={20} />}
          onChange={(event) => onSearchChange(event.currentTarget.value)}
        />
        <Group gap={2} ml="auto">
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
