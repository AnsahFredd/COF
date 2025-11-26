import { Notification, User } from '@prisma/client';
import { toPublicUser } from './user.mapper';

/**
 * Notification with optional user relation
 */
type NotificationWithUser = Notification & {
  user?: User;
};

/**
 * Maps a Notification entity to a public response object
 */
export const toPublicNotification = (notification: NotificationWithUser) => ({
  id: notification.id,
  userId: notification.userId,
  title: notification.title,
  message: notification.message,
  isRead: notification.isRead,
  createdAt: notification.createdAt,
  updatedAt: notification.updatedAt,
  // Include user data if it was loaded in the query
  ...(notification.user && { user: toPublicUser(notification.user) }),
});

/**
 * Maps multiple notifications to public response objects
 */
export const toPublicNotifications = (notifications: NotificationWithUser[]) =>
  notifications.map(toPublicNotification);

/**
 * Maps a notification to a minimal summary (for notification badges)
 */
export const toNotificationSummary = (notification: Notification) => ({
  id: notification.id,
  title: notification.title,
  isRead: notification.isRead,
  createdAt: notification.createdAt,
});

/**
 * Type definitions for mapped responses
 */
export type PublicNotification = ReturnType<typeof toPublicNotification>;
export type NotificationSummary = ReturnType<typeof toNotificationSummary>;
