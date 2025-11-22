import { Badge, Button, Group, Modal, Container, Stack, Text, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import { useState } from 'react';
import { NotificationTable } from './components/NotificationTable';
import { formatDate } from './helpers/index';
import { useApi } from './hooks/useApi';
import { notificationsService } from 'src/services/api/notifications';
import type { Notification } from 'src/services/api/notifications';

import { useNotificationFilters } from './hooks/useNotificationFilters';

const NotificationPage = () => {
  const [page, setPage] = useState(1);
  const [viewModalOpened, setViewModalOpened] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const {
    data: notificationsData,
    loading,
    refetch,
  } = useApi(() => notificationsService.getNotifications(), []);

  const {
    setSearch,
    readStatusFilter,
    setReadStatusFilter,
    filteredNotifications,
    resetFilters,
    hasActiveFilters,
  } = useNotificationFilters(notificationsData);

  // Client-side pagination
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filteredNotifications.length / ITEMS_PER_PAGE);
  const paginatedNotifications = filteredNotifications.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleView = (notification: Notification) => {
    setSelectedNotification(notification);
    setViewModalOpened(true);
  };

  const handleDelete = async (notification: Notification) => {
    if (window.confirm(`Are you sure you want to delete this notification?`)) {
      try {
        await notificationsService.deleteNotification(notification.id);
        showNotification({
          title: 'Success',
          message: 'Notification deleted successfully',
          color: 'green',
        });
        refetch();
      } catch (error) {
        showNotification({
          title: 'Error',
          message: 'Failed to delete notification',
          color: 'red',
        });
      }
    }
  };

  const handleMarkAsRead = async (notification: Notification) => {
    try {
      await notificationsService.markAsRead(notification.id);
      showNotification({
        title: 'Success',
        message: 'Notification marked as read',
        color: 'green',
      });
      refetch();
    } catch (error) {
      showNotification({
        title: 'Error',
        message: 'Failed to mark as read',
        color: 'red',
      });
    }
  };

  return (
    <Container w="100%" fluid p="md">
      <Stack gap="lg">
        <NotificationTable
          data={paginatedNotifications}
          pageInfo={{
            page,
            limit: ITEMS_PER_PAGE,
            total: filteredNotifications.length,
            totalPages,
          }}
          loading={loading}
          onView={handleView}
          onDelete={handleDelete}
          onMarkAsRead={handleMarkAsRead}
          onSearchChange={setSearch}
          onRefresh={refetch}
          page={page}
          onPageChange={setPage}
          totalPages={totalPages}
          readStatusFilter={readStatusFilter}
          onReadStatusFilterChange={setReadStatusFilter}
          onResetFilters={resetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </Stack>

      {/* View Details Modal */}
      <Modal
        opened={viewModalOpened}
        onClose={() => setViewModalOpened(false)}
        title={<Title order={3}>Notification Details</Title>}
        size="lg"
      >
        {selectedNotification && (
          <Stack gap="md">
            <div>
              <Text size="sm" fw={500} c="dimmed">
                Title
              </Text>
              <Text>{selectedNotification.title}</Text>
            </div>
            {selectedNotification.message && (
              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Message
                </Text>
                <Text>{selectedNotification.message}</Text>
              </div>
            )}
            <Group grow>
              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Received
                </Text>
                <Text size="sm">
                  {selectedNotification.createdAt
                    ? formatDate(new Date(selectedNotification.createdAt))
                    : 'N/A'}
                </Text>
              </div>
              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Status
                </Text>
                <Badge color={selectedNotification.isRead ? 'gray' : 'blue'} variant="light">
                  {selectedNotification.isRead ? 'Read' : 'Unread'}
                </Badge>
              </div>
            </Group>
            <Group justify="flex-end" mt="md">
              <Button variant="light" onClick={() => setViewModalOpened(false)}>
                Close
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </Container>
  );
};

export default NotificationPage;
