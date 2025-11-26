import { Prisma } from '@prisma/client';
import { prisma } from 'src/config/database';

export const userRepository = {
  create: async (data: Prisma.UserCreateInput) => {
    return await prisma.user.create({ data });
  },

  findAll: async (options: { cursor?: string; limit?: number; filter?: any } = {}) => {
    const { cursor, limit = 10, filter } = options;
    const where = { ...filter };

    const queryOptions: any = {
      where,
      take: limit + 1,
      orderBy: { createdAt: 'desc' },
    };

    if (cursor) {
      queryOptions.cursor = { id: cursor };
      queryOptions.skip = 1;
    }

    const items = await prisma.user.findMany(queryOptions);

    let nextCursor: string | null = null;
    if (items.length > limit) {
      const nextItem = items.pop();
      nextCursor = nextItem?.id || null;
    }

    return {
      data: items,
      meta: {
        nextCursor,
        hasMore: !!nextCursor,
      },
    };
  },

  findById: async (id: string) => {
    return await prisma.user.findUnique({ where: { id } });
  },

  findByEmail: async (email: string) => {
    return await prisma.user.findUnique({ where: { email } });
  },

  update: async (id: string, data: Prisma.UserUpdateInput) => {
    return await prisma.user.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string) => {
    return await prisma.user.delete({
      where: { id },
    });
  },
};
