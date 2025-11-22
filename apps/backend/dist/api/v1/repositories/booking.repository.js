"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRepository = void 0;
const database_1 = require("src/config/database");
exports.bookingRepository = {
    create: async (data) => {
        return await database_1.prisma.booking.create({ data });
    },
    findAll: async (userId) => {
        const where = userId ? { userId } : {};
        return await database_1.prisma.booking.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
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
