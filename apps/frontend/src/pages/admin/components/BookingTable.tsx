import { Card, Group, Stack, Table, Text, Loader, Center, Button } from '@mantine/core';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { useState } from 'react';
import { BookingTableColumns } from './BookingTableColumns';
import { BookingHeader } from './BookingHeader';

import { Booking } from 'src/services/api/bookings';

interface BookingTableProps {
  data: Booking[];
  loading?: boolean;
  onView: (booking: Booking) => void;
  onDelete: (booking: Booking) => void;
  onUpdateStatus: (
    booking: Booking,
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
  ) => void;
  onRefresh: () => void;
  onSearchChange: (value: string) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  statusFilter: string | null;
  eventTypeFilter: string | null;
  uniqueStatuses: string[];
  uniqueEventTypes: string[];
  onStatusFilterChange: (value: string | null) => void;
  onEventTypeFilterChange: (value: string | null) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const BookingTable = ({
  data,
  loading,
  onView,
  onDelete,
  onUpdateStatus,
  onRefresh,
  onSearchChange,
  onNextPage,
  onPreviousPage,
  hasNextPage,
  hasPreviousPage,
  statusFilter,
  eventTypeFilter,
  uniqueStatuses,
  uniqueEventTypes,
  onStatusFilterChange,
  onEventTypeFilterChange,
  onResetFilters,
  hasActiveFilters,
}: BookingTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const columns = BookingTableColumns({
    onView,
    onDelete,
    onUpdateStatus,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <BookingHeader
          table={table}
          onRefresh={onRefresh}
          onSearchChange={onSearchChange}
          statusFilter={statusFilter}
          eventTypeFilter={eventTypeFilter}
          uniqueStatuses={uniqueStatuses}
          uniqueEventTypes={uniqueEventTypes}
          onStatusFilterChange={onStatusFilterChange}
          onEventTypeFilterChange={onEventTypeFilterChange}
          onResetFilters={onResetFilters}
          hasActiveFilters={hasActiveFilters}
        />

        <Table striped highlightOnHover verticalSpacing="md" pb="xl" mb="xl">
          <Table.Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </Table.Th>
                ))}
              </Table.Tr>
            ))}
          </Table.Thead>
          <Table.Tbody>
            {loading ? (
              <Table.Tr>
                <Table.Td colSpan={columns.length}>
                  <Center py="xl">
                    <Loader size="md" />
                  </Center>
                </Table.Td>
              </Table.Tr>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <Table.Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Table.Td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={columns.length} style={{ textAlign: 'center' }}>
                  <Text c="dimmed">No bookings found</Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>

        <Group justify="center" mt="md">
          <Button onClick={onPreviousPage} disabled={!hasPreviousPage} variant="default">
            Previous
          </Button>
          <Button onClick={onNextPage} disabled={!hasNextPage} variant="default">
            Next
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};
