import { Anchor, Badge, Checkbox, Group, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { formatDate } from '../helpers';
import { useUserHasPermission } from 'src/hooks/useUserHasPermission';
import { User } from 'src/services/api/users';
import { AdminPermission } from '../../../constants/permissions';

interface UserTableColumnProps {
  onDelete: (user: User) => void;
}

export const UserTableColumns = ({ onDelete }: UserTableColumnProps): ColumnDef<User>[] => {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
        />
      ),
      meta: { columnName: 'Select' },
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: 'firstName',
      header: 'First Name',
      meta: { columnName: 'First Name' },
      cell: ({ row }) => row.original.firstName,
    },
    {
      id: 'lastName',
      header: 'Last Name',
      meta: { columnName: 'Last Name' },
      cell: ({ row }) => row.original.lastName,
    },
    {
      id: 'email',
      header: 'Email',
      meta: { columnName: 'Email' },
      cell: ({ row }) => <Text size="sm">{row.original.email}</Text>,
    },
    {
      id: 'role',
      header: 'Role',
      meta: { columnName: 'Role' },
      cell: ({ row }) => (
        <Badge color={row.original.role === 'ADMIN' ? 'red' : 'blue'} variant="light">
          {row.original.role}
        </Badge>
      ),
    },
    {
      id: 'verified',
      header: 'Email Verified',
      meta: { columnName: 'Email Verified' },
      cell: ({ row }) => (
        <Badge color={row.original.isEmailVerified ? 'green' : 'gray'} variant="light">
          {row.original.isEmailVerified ? 'Yes' : 'No'}
        </Badge>
      ),
    },
    {
      id: 'createdAt',
      header: 'Joined',
      meta: { columnName: 'Joined' },
      cell: ({ row }) => <Text size="sm">{formatDate(new Date(row.original.createdAt))}</Text>,
    },
    {
      id: 'actions',
      header: 'Actions',
      meta: { columnName: 'Actions' },
      cell: ({ row }) => <UserActionCell user={row.original} onDelete={onDelete} />,
      enableHiding: false,
    },
  ];
};

interface UserActionCellProps {
  user: User;
  onDelete: (user: User) => void;
}

const UserActionCell: React.FC<UserActionCellProps> = ({ user, onDelete }) => {
  const hasManagePermission = useUserHasPermission(AdminPermission.MANAGE_USERS);

  return (
    <Group gap="xs" justify="center">
      <Anchor
        variant="light"
        c={hasManagePermission ? 'red' : 'dimmed'}
        style={{ cursor: hasManagePermission ? 'pointer' : 'not-allowed' }}
        onClick={() => hasManagePermission && onDelete(user)}
      >
        <IconTrash size={16} />
      </Anchor>
    </Group>
  );
};
