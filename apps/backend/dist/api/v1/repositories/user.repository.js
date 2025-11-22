"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const database_1 = require("src/config/database");
exports.userRepository = {
    create: async (data) => {
        return await database_1.prisma.user.create({ data });
    },
    findAll: async () => {
        return await database_1.prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
        });
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
