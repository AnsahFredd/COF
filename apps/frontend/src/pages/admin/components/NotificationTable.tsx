import { Paper, Group, Pagination, Stack, Table, Text, Loader, Center } from '@mantine/core';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { useState } from 'react';
import { NotificationTableColumns } from './NotificationTableColumns';
import { NotificationHeader } from './NotificationHeader';
import { PageInfo } from 'src/interfaces';
import { Notification } from 'src/services/api/notifications';

interface NotificationTableProps {
  data: Notification[];
  pageInfo?: PageInfo;
  loading?: boolean;
  onView: (notification: Notification) => void;
  onDelete: (notification: Notification) => void;
  onMarkAsRead: (notification: Notification) => void;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
  page: number;
  onPageChange: (page: number) => void;
  totalPages: number;
  readStatusFilter: 'all' | 'read' | 'unread';
  onReadStatusFilterChange: (value: 'all' | 'read' | 'unread') => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const NotificationTable = ({
  data,
  pageInfo,
  loading,
  onView,
  onDelete,
  onMarkAsRead,
  onSearchChange,
  onRefresh,
  page,
  onPageChange,
  totalPages,
  readStatusFilter,
  onReadStatusFilterChange,
  onResetFilters,
  hasActiveFilters,
}: NotificationTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const columns = NotificationTableColumns({ pageInfo, onView, onDelete, onMarkAsRead });

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
    <Paper top="0" w="100%" p="xs" mb="xs" pos="sticky" radius="md" withBorder>
      <Stack gap="md">
        <NotificationHeader
          onSearchChange={onSearchChange}
          onRefresh={onRefresh}
          readStatusFilter={readStatusFilter}
          onReadStatusFilterChange={onReadStatusFilterChange}
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
                  <Text c="dimmed">No notifications found</Text>
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
    </Paper>
  );
};
