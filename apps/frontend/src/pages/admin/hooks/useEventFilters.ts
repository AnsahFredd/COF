import { useMemo, useState } from 'react';
import type { Event } from 'src/services/api/events';
import { extractUniqueStatuses, extractUniqueEventTypes } from '../helpers';

export interface EventFilters {
  search: string;
  status: string | null;
  eventType: string | null;
}

export const useEventFilters = (events: Event[] | undefined) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [eventTypeFilter, setEventTypeFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(true);

  // Extract unique statuses and event types from backend data
  const uniqueStatuses = useMemo(() => {
    return events ? extractUniqueStatuses(events) : [];
  }, [events]);

  const uniqueEventTypes = useMemo(() => {
    return events ? extractUniqueEventTypes(events) : [];
  }, [events]);

  const filteredEvents = useMemo(() => {
    if (!events) return [];

    return events.filter((event) => {
      // Search filter - check name, email, and phone
      const searchLower = search.toLowerCase();
      const matchesSearch =
        !search ||
        event.fullName.toLowerCase().includes(searchLower) ||
        event.email.toLowerCase().includes(searchLower) ||
        event.phone.toLowerCase().includes(searchLower);

      // Status filter
      const matchesStatus = !statusFilter || event.status === statusFilter;

      // Event Type filter
      const matchesEventType = !eventTypeFilter || event.eventType === eventTypeFilter;

      return matchesSearch && matchesStatus && matchesEventType;
    });
  }, [events, search, statusFilter, eventTypeFilter]);

  const resetFilters = () => {
    setSearch('');
    setStatusFilter(null);
    setEventTypeFilter(null);
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  return {
    // Filter state
    search,
    statusFilter,
    eventTypeFilter,
    showFilters,
    uniqueStatuses,
    uniqueEventTypes,
    // Filter setters
    setSearch,
    setStatusFilter,
    setEventTypeFilter,
    toggleFilters,
    // Filtered data
    filteredEvents,
    // Utility
    resetFilters,
    hasActiveFilters: search !== '' || statusFilter !== null || eventTypeFilter !== null,
  };
};
