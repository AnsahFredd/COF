import { ActionIcon, Badge, Checkbox, Group, Text, Tooltip, Menu } from '@mantine/core';
import { IconCheck, IconEye, IconTrash, IconDots } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { calculateItemNumber, formatDate, getCustomerEventStatusColor } from '../helpers';
import { useUserHasPermission } from 'src/hooks/useUserHasPermission';
import { PageInfo } from 'src/interfaces';
import { Event } from 'src/services/api/events';
import { AdminPermission } from '../../../constants/permissions';

interface EventTableColumnProps {
  pageInfo?: PageInfo;
  onView: (event: Event) => void;
  onDelete: (event: Event) => void;
  onUpdateStatus: (event: Event, status: string) => void;
}

export const EventTableColumns = ({
  pageInfo,
  onView,
  onDelete,
  onUpdateStatus,
}: EventTableColumnProps): ColumnDef<Event>[] => {
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
      id: 'fullName',
      header: 'Name',
      meta: { columnName: 'Name' },
      cell: ({ row }) => <Text fw={500}>{row.original.fullName}</Text>,
    },
    {
      id: 'contact',
      header: 'Contact',
      meta: { columnName: 'Contact' },
      cell: ({ row }) => (
        <div>
          <Text size="sm">{row.original.email}</Text>
          <Text size="xs" c="dimmed">
            {row.original.phone}
          </Text>
        </div>
      ),
    },
    {
      id: 'eventDetails',
      header: 'Event Details',
      meta: { columnName: 'Event Details' },
      cell: ({ row }) => (
        <div>
          <Text size="sm" fw={500}>
            {row.original.eventType.replace('_', ' ')}
          </Text>
          <Text size="xs" c="dimmed">
            {formatDate(new Date(row.original.eventDate))}
          </Text>
          <Text size="xs" c="dimmed">
            {row.original.eventLocation}
          </Text>
        </div>
      ),
    },
    {
      id: 'guestCount',
      header: 'Guests',
      meta: { columnName: 'Guests' },
      cell: ({ row }) => <Text fw={500}>{row.original.guestCount || 'N/A'}</Text>,
    },
    {
      id: 'budget',
      header: 'Budget',
      meta: { columnName: 'Budget' },
      cell: ({ row }) => <Text>{row.original.budget}</Text>,
    },
    {
      id: 'status',
      header: 'Status',
      meta: { columnName: 'Status' },
      cell: ({ row }) => (
        <Badge color={getCustomerEventStatusColor(row.original.status)} variant="light">
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      meta: { columnName: 'Actions' },
      cell: ({ row }) => (
        <EventActionCell
          event={row.original}
          onView={onView}
          onDelete={onDelete}
          onUpdateStatus={onUpdateStatus}
        />
      ),
      enableHiding: false,
    },
  ];
};

interface EventActionCellProps {
  event: Event;
  onView: (event: Event) => void;
  onDelete: (event: Event) => void;
  onUpdateStatus: (event: Event, status: string) => void;
}

const EventActionCell: React.FC<EventActionCellProps> = ({
  event,
  onView,
  onDelete,
  onUpdateStatus,
}) => {
  const hasViewPermission = useUserHasPermission(AdminPermission.VIEW_EVENTS);
  const hasEditPermission = useUserHasPermission(AdminPermission.EDIT_EVENTS);
  const hasDeletePermission = useUserHasPermission(AdminPermission.DELETE_EVENTS);

  return (
    <Group gap="xs">
      <Tooltip label="View Details">
        <ActionIcon
          variant="light"
          color="blue"
          onClick={() => hasViewPermission && onView(event)}
          disabled={!hasViewPermission}
        >
          <IconEye size={16} />
        </ActionIcon>
      </Tooltip>

      <Menu shadow="md" width={200}>
        <Menu.Target>
          <ActionIcon variant="light" color="gray">
            <IconDots size={16} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconCheck size={16} />}
            onClick={() => hasEditPermission && onUpdateStatus(event, 'CONTACTED')}
            disabled={!hasEditPermission || event.status !== 'NEW'}
          >
            Mark as Contacted
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item
            color="red"
            leftSection={<IconTrash size={16} />}
            onClick={() => hasDeletePermission && onDelete(event)}
            disabled={!hasDeletePermission}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};
