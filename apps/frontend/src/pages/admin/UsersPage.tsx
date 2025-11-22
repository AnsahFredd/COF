import { Group, Stack, Text, Title } from '@mantine/core';
import { useState } from 'react';
import { UserTable } from './components/UserTable';
import { useUserFilters } from './hooks/useUserFilters';
import { useApi } from './hooks/useApi';
import { usersService } from 'src/services/api/users';
import type { User } from 'src/services/api/users';

const UsersPage = () => {
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [cursorStack, setCursorStack] = useState<string[]>([]);
  const {
    data: usersData,
    loading,
    refetch,
  } = useApi(() => usersService.getUsers(cursor, 10), [cursor]);

  const {
    setSearch,
    roleFilter,
    setRoleFilter,
    emailVerifiedFilter,
    setEmailVerifiedFilter,
    uniqueRoles,
    filteredUsers,
    resetFilters,
    hasActiveFilters,
  } = useUserFilters(usersData?.data);

  const handleDelete = async (user: User) => {
    if (window.confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
      await usersService.deleteUser(user.id);
      refetch();
    }
  };

  const handleNextPage = () => {
    if (usersData?.meta.nextCursor) {
      setCursorStack((prev) => [...prev, cursor || '']);
      setCursor(usersData.meta.nextCursor);
    }
  };

  const handlePreviousPage = () => {
    if (cursorStack.length > 0) {
      const prevCursor = cursorStack[cursorStack.length - 1];
      setCursor(prevCursor === '' ? undefined : prevCursor);
      setCursorStack((prev) => prev.slice(0, -1));
    }
  };

  return (
    <div className="page-container">
      <Stack gap="lg">
        <Group justify="space-between" align="center">
          <div>
            <Title order={2}>Users Management</Title>
            <Text c="dimmed" size="sm">
              Manage system users and roles
            </Text>
          </div>
        </Group>

        <UserTable
          data={filteredUsers || []}
          loading={loading}
          onDelete={handleDelete}
          onSearchChange={setSearch}
          onRefresh={refetch}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
          hasNextPage={!!usersData?.meta.hasMore}
          hasPreviousPage={cursorStack.length > 0}
          roleFilter={roleFilter}
          emailVerifiedFilter={emailVerifiedFilter}
          uniqueRoles={uniqueRoles}
          onRoleFilterChange={setRoleFilter}
          onEmailVerifiedFilterChange={setEmailVerifiedFilter}
          onResetFilters={resetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </Stack>
    </div>
  );
};

export default UsersPage;
