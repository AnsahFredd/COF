"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerEventRepository = void 0;
const database_1 = require("src/config/database");
exports.customerEventRepository = {
    create: async (data) => {
        return await database_1.prisma.customerEvent.create({ data });
    },
    findAll: async (userId) => {
        const where = userId ? { userId } : {};
        return await database_1.prisma.customerEvent.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
    },
    findById: async (id) => {
        return await database_1.prisma.customerEvent.findUnique({ where: { id } });
    },
    update: async (id, data) => {
        return await database_1.prisma.customerEvent.update({
            where: { id },
            data,
        });
    },
    delete: async (id) => {
        return await database_1.prisma.customerEvent.delete({
            where: { id },
        });
    },
};
