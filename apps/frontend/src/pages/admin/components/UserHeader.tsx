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
import { User } from 'src/services/api/users';
import { exportUsers } from '../helpers/user';

interface UserHeaderProps {
  table: Table<User>;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
  roleFilter: string | null;
  emailVerifiedFilter: boolean | null;
  uniqueRoles: string[];
  onRoleFilterChange: (value: string | null) => void;
  onEmailVerifiedFilterChange: (value: boolean | null) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

const getColumnLabel = (column: Column<User, unknown>): string => {
  return (column.columnDef.meta as { columnName?: string })?.columnName || column.id;
};

export const UserHeader = ({
  table,
  onSearchChange,
  onRefresh,
  roleFilter,
  emailVerifiedFilter,
  uniqueRoles,
  onRoleFilterChange,
  onEmailVerifiedFilterChange,
  onResetFilters,
  hasActiveFilters,
}: UserHeaderProps) => {
  const [showColumns, setShowColumns] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const rowSelection = table.getState().rowSelection;
  const showExportButton = useMemo(() => {
    return table.getSelectedRowModel().rows.length > 0;
  }, [table, rowSelection]);

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

  const handleExport = (format: 'csv' | 'excel') => {
    const users = table.getSelectedRowModel().rows.map((row) => row.original);
    if (users.length === 0) return;
    exportUsers(users, table, format);
  };

  return (
    <Paper top="0" w="100%" p="xs" mb="xs" pos="sticky" withBorder radius="md">
      <Group justify="space-between" align="center" mb="xs">
        <Stack gap={0}>
          <Title order={3}>Users</Title>
          <Text c="dimmed" size="sm">
            Manage system users and roles
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
          placeholder="Search users..."
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
                label="Role"
                placeholder="All roles"
                data={uniqueRoles}
                value={roleFilter}
                onChange={onRoleFilterChange}
                clearable
                size="sm"
              />
              <Select
                label="Email Verified"
                placeholder="All"
                data={[
                  { value: 'true', label: 'Verified' },
                  { value: 'false', label: 'Not Verified' },
                ]}
                value={emailVerifiedFilter === null ? null : String(emailVerifiedFilter)}
                onChange={(value) =>
                  onEmailVerifiedFilterChange(value === null ? null : value === 'true')
                }
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
