"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const index_1 = require("./index");
const logger_1 = require("../libs/logger");
exports.prisma = global.prisma ||
    new client_1.PrismaClient({
        log: index_1.config.nodeEnv === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
// save instance to global in development
if (index_1.config.nodeEnv !== 'production') {
    global.prisma = exports.prisma;
}
const connectToDB = async () => {
    try {
        await exports.prisma.$connect();
        logger_1.logger.info('Database connected successfully');
    }
    catch (error) {
        logger_1.logger.error('Database connection failed!', error);
        process.exit(1);
    }
};
exports.connectToDB = connectToDB;
