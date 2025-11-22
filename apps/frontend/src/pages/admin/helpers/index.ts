import { STATUS_COLORS, CUSTOMER_EVENT_STATUS_COLORS } from '../constants/admin';
import type { Event } from 'src/services/api/events';

// Format a Date object to "MMM dd, yyyy"
export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Format a number to USD currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Get a color for a given status
export const getStatusColor = (status: keyof typeof STATUS_COLORS): string => {
  return STATUS_COLORS[status] || 'gray';
};

// Extract unique status values from events for dynamic filter generation
export const extractUniqueStatuses = (events: Event[]): string[] => {
  if (!events || events.length === 0) return [];
  const uniqueStatuses = new Set(events.map((event) => event.status));
  return Array.from(uniqueStatuses).sort();
};

// Extract unique event types from events for dynamic filter generation
export const extractUniqueEventTypes = (events: Event[]): string[] => {
  if (!events || events.length === 0) return [];
  const uniqueEventTypes = new Set(events.map((event) => event.eventType));
  return Array.from(uniqueEventTypes).sort();
};

// Calculate pagination-aware item number
export interface PageInfo {
  page: number;
  limit: number;
  total: number;
}

export const calculateItemNumber = (pageInfo: PageInfo, rowIndex: number): number => {
  return (pageInfo.page - 1) * pageInfo.limit + rowIndex + 1;
};

// Get color for customer event status (dynamic, handles any status)
export const getCustomerEventStatusColor = (status: string): string => {
  // Use predefined colors if available, otherwise provide sensible defaults
  if (CUSTOMER_EVENT_STATUS_COLORS[status]) {
    return CUSTOMER_EVENT_STATUS_COLORS[status];
  }

  // Dynamic fallback based on common status patterns
  const statusLower = status.toLowerCase();
  if (statusLower.includes('new') || statusLower.includes('pending')) return 'blue';
  if (statusLower.includes('contact') || statusLower.includes('progress')) return 'cyan';
  if (statusLower.includes('quote') || statusLower.includes('estimate')) return 'yellow';
  if (
    statusLower.includes('convert') ||
    statusLower.includes('success') ||
    statusLower.includes('complete')
  )
    return 'green';
  if (
    statusLower.includes('decline') ||
    statusLower.includes('reject') ||
    statusLower.includes('cancel')
  )
    return 'red';

  return 'gray'; // Default fallback
};
