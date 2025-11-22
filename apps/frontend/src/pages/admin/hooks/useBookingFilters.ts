import { useMemo, useState } from 'react';
import type { Booking } from 'src/services/api/bookings';

export interface BookingFilters {
  search: string;
  status: string | null;
  eventType: string | null;
}

export const useBookingFilters = (bookings: Booking[] | undefined) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [eventTypeFilter, setEventTypeFilter] = useState<string | null>(null);

  // Extract unique statuses from backend data
  const uniqueStatuses = useMemo(() => {
    if (!bookings) return [];
    const statuses = new Set(bookings.map((booking) => booking.status));
    return Array.from(statuses).sort();
  }, [bookings]);

  // Extract unique event types from backend data
  const uniqueEventTypes = useMemo(() => {
    if (!bookings) return [];
    const eventTypes = new Set(bookings.map((booking) => booking.eventType));
    return Array.from(eventTypes).sort();
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    if (!bookings) return [];

    return bookings.filter((booking) => {
      // Search filter - check event type, location, and status
      const searchLower = search.toLowerCase();
      const matchesSearch =
        !search ||
        booking.eventType.toLowerCase().includes(searchLower) ||
        booking.eventLocation.toLowerCase().includes(searchLower) ||
        booking.status.toLowerCase().includes(searchLower);

      // Status filter
      const matchesStatus = !statusFilter || booking.status === statusFilter;

      // Event type filter
      const matchesEventType = !eventTypeFilter || booking.eventType === eventTypeFilter;

      return matchesSearch && matchesStatus && matchesEventType;
    });
  }, [bookings, search, statusFilter, eventTypeFilter]);

  const resetFilters = () => {
    setSearch('');
    setStatusFilter(null);
    setEventTypeFilter(null);
  };

  return {
    // Filter state
    search,
    statusFilter,
    eventTypeFilter,
    uniqueStatuses,
    uniqueEventTypes,
    // Filter setters
    setSearch,
    setStatusFilter,
    setEventTypeFilter,
    // Filtered data
    filteredBookings,
    // Utility
    resetFilters,
    hasActiveFilters: search !== '' || statusFilter !== null || eventTypeFilter !== null,
  };
};
