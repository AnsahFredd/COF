import { ActionIcon, Badge, Checkbox, Group, Text, Menu } from '@mantine/core';
import { IconCheck, IconEye, IconTrash, IconX, IconDots } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { formatDate, getStatusColor } from '../helpers';
import { useUserHasPermission } from 'src/hooks/useUserHasPermission';
import { Booking } from 'src/services/api/bookings';
import { AdminPermission } from '../../../constants/permissions';
import { STATUS_COLORS } from '../constants/admin';

interface BookingTableColumnProps {
  onView: (booking: Booking) => void;
  onDelete: (booking: Booking) => void;
  onUpdateStatus: (
    booking: Booking,
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
  ) => void;
}

export const BookingTableColumns = ({
  onView,
  onDelete,
  onUpdateStatus,
}: BookingTableColumnProps): ColumnDef<Booking>[] => {
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
      meta: { columnName: 'Select', exportable: false },
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
      id: 'id',
      header: 'ID',
      meta: { columnName: 'ID' },
      cell: ({ row }) => <Text size="sm">{row.original.id.substring(0, 8)}...</Text>,
    },
    {
      id: 'eventType',
      header: 'Event Type',
      meta: { columnName: 'Event Type' },
      cell: ({ row }) => <Text fw={500}>{row.original.eventType}</Text>,
    },
    {
      id: 'eventDetails',
      header: 'Event Details',
      meta: { columnName: 'Event Details', exportable: false },
      cell: ({ row }) => (
        <div>
          <Text size="sm">{formatDate(new Date(row.original.eventDate))}</Text>
          <Text size="xs" c="dimmed">
            {row.original.eventLocation}
          </Text>
        </div>
      ),
    },
    {
      id: 'eventDate',
      header: 'Event Date',
      meta: { columnName: 'Event Date' },
      cell: ({ row }) => <Text size="sm">{formatDate(new Date(row.original.eventDate))}</Text>,
    },
    {
      id: 'eventLocation',
      header: 'Event Location',
      meta: { columnName: 'Event Location' },
      cell: ({ row }) => <Text size="sm">{row.original.eventLocation}</Text>,
    },
    {
      id: 'budget',
      header: 'Budget',
      meta: { columnName: 'Budget' },
      cell: ({ row }) => <Text>{row.original.budget || 'N/A'}</Text>,
    },
    {
      id: 'status',
      header: 'Status',
      meta: { columnName: 'Status' },
      cell: ({ row }) => (
        <Badge
          color={getStatusColor(row.original.status.toLowerCase() as keyof typeof STATUS_COLORS)}
          variant="light"
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: 'createdAt',
      header: 'Created',
      meta: { columnName: 'Created' },
      cell: ({ row }) => <Text size="sm">{formatDate(new Date(row.original.createdAt))}</Text>,
    },
    {
      id: 'actions',
      header: 'Actions',
      meta: { columnName: 'Actions', exportable: false },
      cell: ({ row }) => (
        <BookingActionCell
          booking={row.original}
          onView={onView}
          onDelete={onDelete}
          onUpdateStatus={onUpdateStatus}
        />
      ),
      enableHiding: false,
    },
  ];
};

interface BookingActionCellProps {
  booking: Booking;
  onView: (booking: Booking) => void;
  onDelete: (booking: Booking) => void;
  onUpdateStatus: (
    booking: Booking,
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
  ) => void;
}

const BookingActionCell: React.FC<BookingActionCellProps> = ({
  booking,
  onView,
  onDelete,
  onUpdateStatus,
}) => {
  const hasViewPermission = useUserHasPermission(AdminPermission.VIEW_BOOKINGS);
  const hasEditPermission = useUserHasPermission(AdminPermission.EDIT_BOOKINGS);
  const hasDeletePermission = useUserHasPermission(AdminPermission.DELETE_BOOKINGS);

  return (
    <Group gap="xs" justify="center">
      <ActionIcon
        variant="light"
        color="blue"
        onClick={() => hasViewPermission && onView(booking)}
        disabled={!hasViewPermission}
      >
        <IconEye size={16} />
      </ActionIcon>

      <Menu shadow="md" width={200}>
        <Menu.Target>
          <ActionIcon variant="light" color="gray">
            <IconDots size={16} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          {booking.status === 'PENDING' && (
            <>
              <Menu.Item
                leftSection={<IconCheck size={16} />}
                onClick={() => hasEditPermission && onUpdateStatus(booking, 'CONFIRMED')}
                disabled={!hasEditPermission}
                color="green"
              >
                Confirm Booking
              </Menu.Item>
              <Menu.Item
                leftSection={<IconX size={16} />}
                onClick={() => hasEditPermission && onUpdateStatus(booking, 'CANCELLED')}
                disabled={!hasEditPermission}
                color="orange"
              >
                Cancel Booking
              </Menu.Item>
              <Menu.Divider />
            </>
          )}

          <Menu.Item
            color="red"
            leftSection={<IconTrash size={16} />}
            onClick={() => hasDeletePermission && onDelete(booking)}
            disabled={!hasDeletePermission}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};
