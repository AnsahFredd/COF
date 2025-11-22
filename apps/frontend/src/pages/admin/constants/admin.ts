export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export const BOOKING_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
};

export const EVENT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
};

export const STATUS_COLORS = {
  pending: 'yellow',
  confirmed: 'green',
  cancelled: 'red',
  completed: 'blue',
  draft: 'gray',
  published: 'green',
};

export const CUSTOMER_EVENT_STATUS_COLORS: Record<string, string> = {
  NEW: 'blue',
  CONTACTED: 'cyan',
  QUOTED: 'yellow',
  CONVERTED: 'green',
  DECLINED: 'red',
};
