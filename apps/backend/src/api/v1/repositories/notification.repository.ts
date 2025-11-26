import { Prisma } from '@prisma/client';
import { prisma } from 'src/config/database';

export const notificationRepository = {
  create: async (data: Prisma.NotificationCreateInput) => {
    return await prisma.notification.create({ data });
  },

  findAll: async (userId?: string) => {
    const where = userId ? { userId } : {};
    return await prisma.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  },

  findById: async (id: string) => {
    return await prisma.notification.findUnique({ where: { id } });
  },

  update: async (id: string, data: Prisma.NotificationUpdateInput) => {
    return await prisma.notification.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string) => {
    return await prisma.notification.delete({
      where: { id },
    });
  },
};
