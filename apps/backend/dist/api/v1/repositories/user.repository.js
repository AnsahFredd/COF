"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const database_1 = require("src/config/database");
exports.userRepository = {
    create: async (data) => {
        return await database_1.prisma.user.create({ data });
    },
    findAll: async (options = {}) => {
        const { cursor, limit = 10, filter } = options;
        const where = { ...filter };
        const queryOptions = {
            where,
            take: limit + 1,
            orderBy: { createdAt: 'desc' },
        };
        if (cursor) {
            queryOptions.cursor = { id: cursor };
            queryOptions.skip = 1;
        }
        const items = await database_1.prisma.user.findMany(queryOptions);
        let nextCursor = null;
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
    findById: async (id) => {
        return await database_1.prisma.user.findUnique({ where: { id } });
    },
    findByEmail: async (email) => {
        return await database_1.prisma.user.findUnique({ where: { email } });
    },
    update: async (id, data) => {
        return await database_1.prisma.user.update({
            where: { id },
            data,
        });
    },
    delete: async (id) => {
        return await database_1.prisma.user.delete({
            where: { id },
        });
    },
};
