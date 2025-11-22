/**
 * @file notifications.ts
 * @description Notifications API endpoints
 */

import { api } from './api';

// Match backend Prisma schema
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export const notificationsService = {
  /**
   * Get all notifications
   */
  getNotifications: async (): Promise<Notification[]> => {
    const response = await api.get<{ success: boolean; data: Notification[] }>('/notifications');
    return response.data;
  },

  /**
   * Mark notification as read
   */
  markAsRead: async (id: string): Promise<{ success: boolean }> => {
    return api.patch<{ success: boolean }>(`/notifications/${id}`, { isRead: true });
  },

  /**
   * Mark all notifications as read
   */
  markAllAsRead: async (): Promise<{ success: boolean }> => {
    // This endpoint might not exist yet, but we'll keep it for future
    return api.patch<{ success: boolean }>('/notifications/read-all');
  },

  /**
   * Delete notification
   */
  deleteNotification: async (id: string): Promise<{ success: boolean }> => {
    return api.delete<{ success: boolean }>(`/notifications/${id}`);
  },
};

export default notificationsService;
