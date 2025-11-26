"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRepository = void 0;
const database_1 = require("src/config/database");
exports.bookingRepository = {
    create: async (data) => {
        return await database_1.prisma.booking.create({ data });
    },
    findAll: async (options) => {
        const { cursor, limit = 10, userId, filter } = options;
        const where = {
            ...(userId ? { userId } : {}),
            ...filter,
        };
        const queryOptions = {
            where,
            take: limit + 1, // Fetch one extra to determine if there's a next page
            orderBy: { createdAt: 'desc' },
        };
        if (cursor) {
            queryOptions.cursor = { id: cursor };
            queryOptions.skip = 1; // Skip the cursor itself
        }
        const items = await database_1.prisma.booking.findMany(queryOptions);
        let nextCursor = null;
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
    findById: async (id) => {
        return await database_1.prisma.booking.findUnique({ where: { id } });
    },
    update: async (id, data) => {
        return await database_1.prisma.booking.update({
            where: { id },
            data,
        });
    },
    delete: async (id) => {
        return await database_1.prisma.booking.delete({
            where: { id },
        });
    },
};
