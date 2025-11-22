import {
  Badge,
  Group,
  Pagination,
  Stack,
  Title,
  Text,
  Button,
  Modal,
  Textarea,
} from '@mantine/core';
import { useState } from 'react';
import { useApi } from '../../pages/admin/hooks/useApi';
import { useEventFilters } from '../../pages/admin/hooks/useEventFilters';
import { eventsService } from 'src/services/api/events';
import type { Event } from 'src/services/api/events';
import { formatDate } from '../../pages/admin/helpers';
import { showNotification } from '@mantine/notifications';
import { EventTable } from './components/EventTable';

// Helper function for status colors
const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    NEW: 'blue',
    CONTACTED: 'cyan',
    QUOTED: 'yellow',
    CONVERTED: 'green',
    DECLINED: 'red',
  };
  return colors[status] || 'gray';
};

const EventsPage = () => {
  const [page, setPage] = useState(1);
  const [viewModalOpened, setViewModalOpened] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const {
    data: eventsData,
    loading,
    refetch,
  } = useApi(() => eventsService.getEvents(page), [page]);

  // Use the filtering hook
  const {
    setSearch,
    filteredEvents,
    statusFilter,
    setStatusFilter,
    eventTypeFilter,
    setEventTypeFilter,
    uniqueStatuses,
    uniqueEventTypes,
    resetFilters,
    hasActiveFilters,
  } = useEventFilters(eventsData?.data);

  const handleView = (event: Event) => {
    setSelectedEvent(event);
    setViewModalOpened(true);
  };

  const handleDelete = async (event: Event) => {
    if (window.confirm(`Are you sure you want to delete the inquiry from ${event.fullName}?`)) {
      try {
        await eventsService.deleteEvent(event.id);
        showNotification({
          title: 'Success',
          message: 'Customer event deleted successfully',
          color: 'green',
        });
        refetch();
      } catch (error) {
        showNotification({
          title: 'Error',
          message: 'Failed to delete customer event',
          color: 'red',
        });
      }
    }
  };

  const handleUpdateStatus = async (event: Event, newStatus: string) => {
    try {
      await eventsService.updateEvent(event.id, { status: newStatus });
      showNotification({
        title: 'Success',
        message: 'Status updated successfully',
        color: 'green',
      });
      refetch();
    } catch (error) {
      showNotification({
        title: 'Error',
        message: 'Failed to update status',
        color: 'red',
      });
    }
  };

  return (
    <div className="page-container">
      <Stack gap="lg">
        <EventTable
          data={filteredEvents || []}
          pageInfo={{
            page: eventsData?.page || 1,
            limit: eventsData?.limit || 10,
            total: eventsData?.total || 0,
            totalPages: Math.ceil((eventsData?.total || 0) / (eventsData?.limit || 10)),
          }}
          loading={loading}
          onView={handleView}
          onDelete={handleDelete}
          onUpdateStatus={handleUpdateStatus}
          onSearchChange={setSearch}
          onRefresh={refetch}
          page={page}
          onPageChange={setPage}
          totalPages={Math.ceil((eventsData?.total || 0) / (eventsData?.limit || 10))}
          statusFilter={statusFilter}
          eventTypeFilter={eventTypeFilter}
          uniqueStatuses={uniqueStatuses}
          uniqueEventTypes={uniqueEventTypes}
          onStatusFilterChange={setStatusFilter}
          onEventTypeFilterChange={setEventTypeFilter}
          onResetFilters={resetFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {eventsData && eventsData.total > 10 && (
          <Group justify="center" mt="xl">
            <Pagination total={Math.ceil(eventsData.total / 10)} value={page} onChange={setPage} />
          </Group>
        )}
      </Stack>

      {/* View Details Modal */}
      <Modal
        opened={viewModalOpened}
        onClose={() => setViewModalOpened(false)}
        title={<Title order={3}>Customer Event Details</Title>}
        size="lg"
      >
        {selectedEvent && (
          <Stack gap="md">
            <Group grow>
              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Full Name
                </Text>
                <Text>{selectedEvent.fullName}</Text>
              </div>
              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Email
                </Text>
                <Text>{selectedEvent.email}</Text>
              </div>
            </Group>
            <Group grow>
              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Phone
                </Text>
                <Text>{selectedEvent.phone}</Text>
              </div>
              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Preferred Contact
                </Text>
                <Text>{selectedEvent.preferredContactMethod}</Text>
              </div>
            </Group>
            <Group grow>
              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Event Type
                </Text>
                <Text>{selectedEvent.eventType.replace('_', ' ')}</Text>
              </div>
              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Event Date
                </Text>
                <Text>{formatDate(new Date(selectedEvent.eventDate))}</Text>
              </div>
            </Group>
            <Group grow>
              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Location
                </Text>
                <Text>{selectedEvent.eventLocation}</Text>
              </div>
              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Guest Count
                </Text>
                <Text fw={500}>{selectedEvent.guestCount || 'Not specified'}</Text>
              </div>
            </Group>
            <Group grow>
              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Budget
                </Text>
                <Text>{selectedEvent.budget}</Text>
              </div>
              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Status
                </Text>
                <Badge color={getStatusColor(selectedEvent.status)} variant="light">
                  {selectedEvent.status}
                </Badge>
              </div>
            </Group>
            {selectedEvent.message && (
              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Message
                </Text>
                <Textarea value={selectedEvent.message} readOnly autosize minRows={3} />
              </div>
            )}
            <Group grow>
              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Submitted
                </Text>
                <Text size="sm">{formatDate(new Date(selectedEvent.createdAt))}</Text>
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
    </div>
  );
};

export default EventsPage;
