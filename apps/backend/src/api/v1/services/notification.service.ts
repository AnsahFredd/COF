import { Prisma } from '@prisma/client';
import { notificationRepository } from '../repositories/notification.repository';

export const notificationService = {
  createNotification: async (data: Prisma.NotificationCreateInput) => {
    return await notificationRepository.create(data);
  },

  getAllNotifications: async (userId?: string) => {
    return await notificationRepository.findAll(userId);
  },

  getNotificationById: async (id: string) => {
    const result = await notificationRepository.findById(id);
    if (!result) throw new Error('Notification Not Found!');
    return result;
  },

  updateNotification: async (id: string, data: Prisma.NotificationUpdateInput) => {
    const exists = await notificationRepository.findById(id);
    if (!exists) throw new Error('Notification Not Found!');
    return await notificationRepository.update(id, data);
  },

  deleteNotification: async (id: string) => {
    const exists = await notificationRepository.findById(id);
    if (!exists) throw new Error('Notification Not Found!');
    return await notificationRepository.delete(id);
  },
};
