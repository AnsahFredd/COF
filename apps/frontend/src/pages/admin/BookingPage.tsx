import { Button, Container, Group, Modal, Stack, Text, Textarea, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';
import { BookingTable } from './components/BookingTable';
import { formatDate } from './helpers';
import { useApi } from './hooks/useApi';
import { useBookingFilters } from './hooks/useBookingFilters';
import { bookingsService } from 'src/services/api/bookings';
import type { Booking } from 'src/services/api/bookings';

const BookingsPage = () => {
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [cursorStack, setCursorStack] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [viewModalOpened, setViewModalOpened] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const {
    data: bookingsData,
    loading,
    refetch,
  } = useApi(() => bookingsService.getBookings(cursor, 10, search), [cursor, search]);

  // Use booking filters
  const {
    statusFilter,
    eventTypeFilter,
    uniqueStatuses,
    uniqueEventTypes,
    setStatusFilter,
    setEventTypeFilter,
    filteredBookings,
    resetFilters,
    hasActiveFilters,
  } = useBookingFilters(bookingsData?.data);

  const handleView = (booking: Booking) => {
    setSelectedBooking(booking);
    setViewModalOpened(true);
  };

  const handleDelete = async (booking: Booking) => {
    if (window.confirm(`Are you sure you want to delete booking #${booking.id.substring(0, 8)}?`)) {
      try {
        await bookingsService.deleteBooking(booking.id);
        showNotification({
          title: 'Success',
          message: 'Booking deleted successfully',
          color: 'green',
        });
        refetch();
      } catch (error) {
        showNotification({
          title: 'Error',
          message: 'Failed to delete booking',
          color: 'red',
        });
      }
    }
  };

  const handleUpdateStatus = async (
    booking: Booking,
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
  ) => {
    try {
      await bookingsService.updateBookingStatus(booking.id, status);
      showNotification({
        title: 'Success',
        message: `Booking status updated to ${status}`,
        color: 'green',
      });
      refetch();
    } catch (error) {
      showNotification({
        title: 'Error',
        message: 'Failed to update booking status',
        color: 'red',
      });
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCursor(undefined); // Reset to first page when searching
    setCursorStack([]);
  };

  const handleNextPage = () => {
    if (bookingsData?.meta.nextCursor) {
      setCursorStack((prev) => [...prev, cursor || '']);
      setCursor(bookingsData.meta.nextCursor);
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
    <Container w="100%" fluid p="md">
      <Stack gap="lg">
        <BookingTable
          data={filteredBookings || []}
          loading={loading}
          onView={handleView}
          onDelete={handleDelete}
          onUpdateStatus={handleUpdateStatus}
          onRefresh={refetch}
          onSearchChange={handleSearchChange}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
          hasNextPage={!!bookingsData?.meta.hasMore}
          hasPreviousPage={cursorStack.length > 0}
          statusFilter={statusFilter}
          eventTypeFilter={eventTypeFilter}
          uniqueStatuses={uniqueStatuses}
          uniqueEventTypes={uniqueEventTypes}
          onStatusFilterChange={setStatusFilter}
          onEventTypeFilterChange={setEventTypeFilter}
          onResetFilters={resetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </Stack>

      {/* View Details Modal */}
      <Modal
        opened={viewModalOpened}
        onClose={() => setViewModalOpened(false)}
        title={<Title order={3}>Booking Details</Title>}
        size="lg"
      >
        {selectedBooking && (
          <Stack gap="md">
            <Group grow>
              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Booking ID
                </Text>
                <Text>{selectedBooking.id}</Text>
              </div>
              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Status
                </Text>
                <Text>{selectedBooking.status}</Text>
              </div>
            </Group>
            <Group grow>
              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Event Type
                </Text>
                <Text>{selectedBooking.eventType}</Text>
              </div>
              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Event Date
                </Text>
                <Text>{formatDate(new Date(selectedBooking.eventDate))}</Text>
              </div>
            </Group>
            <Group grow>
              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Location
                </Text>
                <Text>{selectedBooking.eventLocation}</Text>
              </div>
              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Budget
                </Text>
                <Text>{selectedBooking.budget || 'N/A'}</Text>
              </div>
            </Group>
            {selectedBooking.message && (
              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Message
                </Text>
                <Textarea value={selectedBooking.message} readOnly autosize minRows={3} />
              </div>
            )}
            <Group grow>
              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Created At
                </Text>
                <Text size="sm">{formatDate(new Date(selectedBooking.createdAt))}</Text>
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

export default BookingsPage;
