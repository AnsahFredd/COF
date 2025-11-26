import { Prisma } from '@prisma/client';
import { prisma } from 'src/config/database';

export const bookingRepository = {
  create: async (data: Prisma.BookingCreateInput) => {
    return await prisma.booking.create({ data });
  },

  findAll: async (options: { cursor?: string; limit?: number; userId?: string; filter?: any }) => {
    const { cursor, limit = 10, userId, filter } = options;
    const where = {
      ...(userId ? { userId } : {}),
      ...filter,
    };

    const queryOptions: any = {
      where,
      take: limit + 1, // Fetch one extra to determine if there's a next page
      orderBy: { createdAt: 'desc' },
    };

    if (cursor) {
      queryOptions.cursor = { id: cursor };
      queryOptions.skip = 1; // Skip the cursor itself
    }

    const items = await prisma.booking.findMany(queryOptions);

    let nextCursor: string | null = null;
    if (items.length > limit) {
      const nextItem = items.pop(); // Remove the extra item
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
    return await prisma.booking.findUnique({ where: { id } });
  },
  update: async (id: string, data: Prisma.BookingUpdateInput) => {
    return await prisma.booking.update({
      where: { id },
      data,
    });
  },
  delete: async (id: string) => {
    return await prisma.booking.delete({
      where: { id },
    });
  },
};
