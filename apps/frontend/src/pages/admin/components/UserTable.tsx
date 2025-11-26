import { Card, Group, Stack, Table, Text, Button } from '@mantine/core';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { useState } from 'react';
import { UserTableColumns } from './UserTableColumns';
import { UserHeader } from './UserHeader';

import { User } from 'src/services/api/users';

interface UserTableProps {
  data: User[];
  loading?: boolean;
  onDelete: (user: User) => void;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  roleFilter: string | null;
  emailVerifiedFilter: boolean | null;
  uniqueRoles: string[];
  onRoleFilterChange: (value: string | null) => void;
  onEmailVerifiedFilterChange: (value: boolean | null) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const UserTable = ({
  data,
  loading,
  onDelete,
  onSearchChange,
  onRefresh,
  onNextPage,
  onPreviousPage,
  hasNextPage,
  hasPreviousPage,
  roleFilter,
  emailVerifiedFilter,
  uniqueRoles,
  onRoleFilterChange,
  onEmailVerifiedFilterChange,
  onResetFilters,
  hasActiveFilters,
}: UserTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const columns = UserTableColumns({ onDelete });

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
        <UserHeader
          table={table}
          onSearchChange={onSearchChange}
          onRefresh={onRefresh}
          roleFilter={roleFilter}
          emailVerifiedFilter={emailVerifiedFilter}
          uniqueRoles={uniqueRoles}
          onRoleFilterChange={onRoleFilterChange}
          onEmailVerifiedFilterChange={onEmailVerifiedFilterChange}
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
                  <Text c="dimmed">No users found</Text>
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
