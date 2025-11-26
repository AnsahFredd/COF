import { Card, Group, Pagination, Stack, Table, Text } from '@mantine/core';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { useState } from 'react';
import { EventTableColumns } from './EventTableColumns';
import { EventHeader } from './EventHeader';
import { PageInfo } from 'src/interfaces';
import { Event } from 'src/services/api/events';

interface EventTableProps {
  data: Event[];
  pageInfo?: PageInfo;
  loading?: boolean;
  onView: (event: Event) => void;
  onDelete: (event: Event) => void;
  onUpdateStatus: (event: Event, status: string) => void;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
  page: number;
  onPageChange: (page: number) => void;
  totalPages: number;
  statusFilter: string | null;
  eventTypeFilter: string | null;
  uniqueStatuses: string[];
  uniqueEventTypes: string[];
  onStatusFilterChange: (value: string | null) => void;
  onEventTypeFilterChange: (value: string | null) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const EventTable = ({
  data,
  pageInfo,
  loading,
  onView,
  onDelete,
  onUpdateStatus,
  onSearchChange,
  onRefresh,
  page,
  onPageChange,
  totalPages,
  statusFilter,
  eventTypeFilter,
  uniqueStatuses,
  uniqueEventTypes,
  onStatusFilterChange,
  onEventTypeFilterChange,
  onResetFilters,
  hasActiveFilters,
}: EventTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const columns = EventTableColumns({ pageInfo, onView, onDelete, onUpdateStatus });

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
        <EventHeader
          table={table}
          onSearchChange={onSearchChange}
          onRefresh={onRefresh}
          statusFilter={statusFilter}
          eventTypeFilter={eventTypeFilter}
          uniqueStatuses={uniqueStatuses}
          uniqueEventTypes={uniqueEventTypes}
          onStatusFilterChange={onStatusFilterChange}
          onEventTypeFilterChange={onEventTypeFilterChange}
          onResetFilters={onResetFilters}
          hasActiveFilters={hasActiveFilters}
        />

        <Table striped highlightOnHover withTableBorder withColumnBorders>
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
                <Table.Td colSpan={columns.length} style={{ textAlign: 'center' }}>
                  Loading...
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
                  <Text c="dimmed">No events found</Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>

        {totalPages > 1 && (
          <Group justify="center" mt="md">
            <Pagination total={totalPages} value={page} onChange={onPageChange} />
          </Group>
        )}
      </Stack>
    </Card>
  );
};
