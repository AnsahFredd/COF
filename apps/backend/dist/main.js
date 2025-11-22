"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
const config_1 = require("./config");
const logger_1 = require("./libs/logger");
const startServer = async () => {
    try {
        await (0, database_1.connectToDB)();
        const server = app_1.default.listen(config_1.config.port, () => {
            logger_1.logger.info(`Server running on port ${config_1.config.port}`);
        });
        // Graceful shutdown function handler
        const shutdown = async () => {
            logger_1.logger.info('SIGTERM signal received: closing HTTP server');
            server.close(async () => {
                logger_1.logger.info('HTTP server closed');
                await database_1.prisma.$disconnect();
                logger_1.logger.info('Database connection closed');
                process.exit(0);
            });
        };
        process.on('SIGTERM', shutdown);
        process.on('SIGINT', shutdown);
    }
    catch (error) {
        logger_1.logger.error('Failed to start server', error);
        process.exit(1);
    }
};
startServer();
