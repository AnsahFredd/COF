import { Redis, RedisOptions } from 'ioredis';
import { Logger } from './types';

const createLogger = (): Logger => ({
  info: (msg, meta) => console.log(`[CACHE-INFO] ${msg}`, meta || ''),
  error: (msg, meta) => console.error(`[CACHE-ERROR] ${msg}`, meta || ''),
  warn: (msg, meta) => console.warn(`[CACHE-WARN] ${msg}`, meta || ''),
});

// Singleton Redis client
let redisClient: Redis | null = null;
let logger: Logger = createLogger();

export const getLogger = (): Logger => logger;

/**
 * Initialize Redis connection for event planning service
 */
export const initializeCache = (customLogger?: Logger): Redis => {
  if (redisClient) {
    logger.warn('Redis client already initialized');
    return redisClient;
  }

  if (customLogger) {
    logger = customLogger;
  }

  const config: RedisOptions = {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD,
    db: Number(process.env.REDIS_DB) || 0,
    keyPrefix: process.env.REDIS_KEY_PREFIX || 'eventplanner:',
    connectTimeout: 10000,
    maxRetriesPerRequest: 3,
    retryStrategy: (times: number) => {
      if (times > 10) return null;
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
  };

  try {
    redisClient = new Redis(config);

    redisClient.on('ready', () => {
      logger.info('Redis cache ready for event planning service');
    });

    redisClient.on('error', (err) => {
      logger.error('Redis connection error', { error: err.message });
    });

    redisClient.on('reconnecting', () => {
      logger.warn('Redis reconnecting...');
    });

    return redisClient;
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to initialize Redis', { error: err.message });
    throw new Error(`Redis initialization failed: ${err.message}`);
  }
};

/**
 * Get Redis client instance
 */
export const getClient = (): Redis => {
  if (!redisClient) {
    throw new Error('Redis not initialized. Call initializeCache() first.');
  }
  return redisClient;
};

/**
 * Close Redis connection gracefully
 */
export const closeCache = async (): Promise<void> => {
  if (!redisClient) {
    return;
  }

  try {
    await redisClient.quit();
    logger.info('Redis connection closed');
    redisClient = null;
  } catch (error) {
    const err = error as Error;
    logger.error('Error during graceful shutdown', { error: err.message });
    redisClient?.disconnect();
    redisClient = null;
  }
};

/**
 * Check Redis connection status
 */
export const isConnected = (): boolean => {
  return redisClient?.status === 'ready';
};

// Cache key prefixes for event planning service
export const CACHE_KEYS = {
  SERVICE_PACKAGE: 'package:',
  PACKAGE_LIST: 'packages:list',
  PACKAGE_CATEGORY: 'packages:category:',
  BOOKING: 'booking:',
  CLIENT_BOOKINGS: 'client:bookings:',
  CLIENT_PROFILE: 'client:profile:',
  AVAILABILITY: 'availability:',
  AVAILABILITY_MONTH: 'availability:month:',
  PRICING: 'pricing:',
  POPULAR_PACKAGES: 'packages:popular',
  TESTIMONIALS: 'testimonials',
  GALLERY: 'gallery:',
  CONTACT_FORM: 'contact:',
  QUOTE_REQUEST: 'quote:',
} as const;

// Cache TTL constants (in seconds)
export const CACHE_TTL = {
  PACKAGE: 3600, // 1 hour
  PACKAGE_LIST: 1800, // 30 minutes
  BOOKING: 900, // 15 minutes
  CLIENT_BOOKINGS: 600, // 10 minutes
  CLIENT_PROFILE: 1800, // 30 minutes
  AVAILABILITY: 300, // 5 minutes
  PRICING: 3600, // 1 hour
  POPULAR_PACKAGES: 1800, // 30 minutes
  TESTIMONIALS: 7200, // 2 hours
  GALLERY: 3600, // 1 hour
  CONTACT_FORM: 300, // 5 minutes (rate limiting)
  QUOTE_REQUEST: 600, // 10 minutes
} as const;
