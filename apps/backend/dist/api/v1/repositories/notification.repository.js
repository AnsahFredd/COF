"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRepository = void 0;
const database_1 = require("src/config/database");
exports.notificationRepository = {
    create: async (data) => {
        return await database_1.prisma.notification.create({ data });
    },
    findAll: async (userId) => {
        const where = userId ? { userId } : {};
        return await database_1.prisma.notification.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
    },
    findById: async (id) => {
        return await database_1.prisma.notification.findUnique({ where: { id } });
    },
    update: async (id, data) => {
        return await database_1.prisma.notification.update({
            where: { id },
            data,
        });
    },
    delete: async (id) => {
        return await database_1.prisma.notification.delete({
            where: { id },
        });
    },
};
