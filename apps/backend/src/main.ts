import app from './app';
import { connectToDB, prisma } from './config/database';
import { config } from './config';
import { logger } from './libs/logger';
import { startJobs } from './jobs';

const startServer = async () => {
  try {
    await connectToDB();

    // Start background jobs
    startJobs();

    const server = app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
    });

    // Graceful shutdown function handler
    const shutdown = async () => {
      logger.info('SIGTERM signal received: closing HTTP server');
      server.close(async () => {
        logger.info('HTTP server closed');
        await prisma.$disconnect();
        logger.info('Database connection closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();
