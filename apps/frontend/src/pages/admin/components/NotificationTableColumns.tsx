import { ActionIcon, Badge, Checkbox, Group, Text, Tooltip } from '@mantine/core';
import { IconCheck, IconEye, IconTrash, IconBell } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { calculateItemNumber, formatDate } from '../helpers';
import { useUserHasPermission } from 'src/hooks/useUserHasPermission';
import { PageInfo } from 'src/interfaces';
import { Notification } from 'src/services/api/notifications';
import { AdminPermission } from '../../../constants/permissions';

interface NotificationTableColumnProps {
  pageInfo?: PageInfo;
  onView: (notification: Notification) => void;
  onDelete: (notification: Notification) => void;
  onMarkAsRead: (notification: Notification) => void;
}

export const NotificationTableColumns = ({
  pageInfo,
  onView,
  onDelete,
  onMarkAsRead,
}: NotificationTableColumnProps): ColumnDef<Notification>[] => {
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
      id: 'index',
      header: '#',
      meta: { columnName: '#' },
      cell: ({ row, table }) => {
        const index = table.getRowModel().rows.findIndex((r) => r.id === row.id);
        return calculateItemNumber(pageInfo!, index);
      },
    },
    {
      id: 'icon',
      header: '',
      meta: { columnName: 'Icon' },
      cell: ({ row }) => <IconBell size={20} color={row.original.isRead ? 'gray' : '#228be6'} />,
      enableSorting: false,
    },
    {
      id: 'notification',
      header: 'Notification',
      meta: { columnName: 'Notification' },
      cell: ({ row }) => (
        <div>
          <Text fw={500} size="sm">
            {row.original.title}
          </Text>
          {row.original.message && (
            <Text size="xs" c="dimmed" lineClamp={1}>
              {row.original.message}
            </Text>
          )}
        </div>
      ),
    },
    {
      id: 'createdAt',
      header: 'Received',
      meta: { columnName: 'Received' },
      cell: ({ row }) => (
        <Text size="sm">
          {row.original.createdAt ? formatDate(new Date(row.original.createdAt)) : 'N/A'}
        </Text>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      meta: { columnName: 'Status' },
      cell: ({ row }) => (
        <Badge color={row.original.isRead ? 'gray' : 'blue'} variant="light">
          {row.original.isRead ? 'Read' : 'Unread'}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      meta: { columnName: 'Actions' },
      cell: ({ row }) => (
        <NotificationActionCell
          notification={row.original}
          onView={onView}
          onDelete={onDelete}
          onMarkAsRead={onMarkAsRead}
        />
      ),
      enableHiding: false,
    },
  ];
};

interface NotificationActionCellProps {
  notification: Notification;
  onView: (notification: Notification) => void;
  onDelete: (notification: Notification) => void;
  onMarkAsRead: (notification: Notification) => void;
}

const NotificationActionCell: React.FC<NotificationActionCellProps> = ({
  notification,
  onView,
  onDelete,
  onMarkAsRead,
}) => {
  const hasViewPermission = useUserHasPermission(AdminPermission.VIEW_NOTIFICATIONS);
  const hasManagePermission = useUserHasPermission(AdminPermission.MANAGE_NOTIFICATIONS);

  return (
    <Group gap="xs">
      <Tooltip label="View Details">
        <ActionIcon
          variant="light"
          color="blue"
          onClick={() => hasViewPermission && onView(notification)}
          disabled={!hasViewPermission}
        >
          <IconEye size={16} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Mark as Read">
        <ActionIcon
          variant="light"
          color="green"
          onClick={() => hasManagePermission && onMarkAsRead(notification)}
          disabled={!hasManagePermission || notification.isRead}
        >
          <IconCheck size={16} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Delete">
        <ActionIcon
          variant="light"
          color="red"
          onClick={() => hasManagePermission && onDelete(notification)}
          disabled={!hasManagePermission}
        >
          <IconTrash size={16} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};
