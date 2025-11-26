import { useMemo, useState } from 'react';
import type { Notification } from 'src/services/api/notifications';

export interface NotificationFilters {
  search: string;
  readStatus: 'all' | 'read' | 'unread';
}

export const useNotificationFilters = (notifications: Notification[] | undefined | null) => {
  const [search, setSearch] = useState('');
  const [readStatusFilter, setReadStatusFilter] = useState<'all' | 'read' | 'unread'>('all');

  const filteredNotifications = useMemo(() => {
    if (!notifications) return [];

    return notifications.filter((notification) => {
      // Search filter - check title and message
      const searchLower = search.toLowerCase();
      const matchesSearch =
        !search ||
        notification.title.toLowerCase().includes(searchLower) ||
        notification.message.toLowerCase().includes(searchLower);

      // Read status filter
      const matchesReadStatus =
        readStatusFilter === 'all' ||
        (readStatusFilter === 'read' && notification.isRead) ||
        (readStatusFilter === 'unread' && !notification.isRead);

      return matchesSearch && matchesReadStatus;
    });
  }, [notifications, search, readStatusFilter]);

  const resetFilters = () => {
    setSearch('');
    setReadStatusFilter('all');
  };

  return {
    // Filter state
    search,
    readStatusFilter,
    // Filter setters
    setSearch,
    setReadStatusFilter,
    // Filtered data
    filteredNotifications,
    // Utility
    resetFilters,
    hasActiveFilters: search !== '' || readStatusFilter !== 'all',
  };
};
