import { prisma } from 'src/config/database';
import { Prisma } from '@prisma/client';

export const customerEventRepository = {
  create: async (data: Prisma.CustomerEventCreateInput) => {
    return await prisma.customerEvent.create({ data });
  },

  findAll: async (userId?: string) => {
    const where = userId ? { userId } : {};
    return await prisma.customerEvent.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  },

  findById: async (id: string) => {
    return await prisma.customerEvent.findUnique({ where: { id } });
  },

  update: async (id: string, data: Prisma.CustomerEventUpdateInput) => {
    return await prisma.customerEvent.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string) => {
    return await prisma.customerEvent.delete({
      where: { id },
    });
  },
};
