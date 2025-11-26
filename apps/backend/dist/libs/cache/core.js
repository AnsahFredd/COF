"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CACHE_TTL = exports.CACHE_KEYS = exports.isConnected = exports.closeCache = exports.getClient = exports.initializeCache = exports.getLogger = void 0;
const ioredis_1 = require("ioredis");
const createLogger = () => ({
    info: (msg, meta) => console.log(`[CACHE-INFO] ${msg}`, meta || ''),
    error: (msg, meta) => console.error(`[CACHE-ERROR] ${msg}`, meta || ''),
    warn: (msg, meta) => console.warn(`[CACHE-WARN] ${msg}`, meta || ''),
});
// Singleton Redis client
let redisClient = null;
let logger = createLogger();
const getLogger = () => logger;
exports.getLogger = getLogger;
/**
 * Initialize Redis connection for event planning service
 */
const initializeCache = (customLogger) => {
    if (redisClient) {
        logger.warn('Redis client already initialized');
        return redisClient;
    }
    if (customLogger) {
        logger = customLogger;
    }
    const config = {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD,
        db: Number(process.env.REDIS_DB) || 0,
        keyPrefix: process.env.REDIS_KEY_PREFIX || 'eventplanner:',
        connectTimeout: 10000,
        maxRetriesPerRequest: 3,
        retryStrategy: (times) => {
            if (times > 10)
                return null;
            const delay = Math.min(times * 50, 2000);
            return delay;
        },
    };
    try {
        redisClient = new ioredis_1.Redis(config);
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
    }
    catch (error) {
        const err = error;
        logger.error('Failed to initialize Redis', { error: err.message });
        throw new Error(`Redis initialization failed: ${err.message}`);
    }
};
exports.initializeCache = initializeCache;
/**
 * Get Redis client instance
 */
const getClient = () => {
    if (!redisClient) {
        throw new Error('Redis not initialized. Call initializeCache() first.');
    }
    return redisClient;
};
exports.getClient = getClient;
/**
 * Close Redis connection gracefully
 */
const closeCache = async () => {
    if (!redisClient) {
        return;
    }
    try {
        await redisClient.quit();
        logger.info('Redis connection closed');
        redisClient = null;
    }
    catch (error) {
        const err = error;
        logger.error('Error during graceful shutdown', { error: err.message });
        redisClient?.disconnect();
        redisClient = null;
    }
};
exports.closeCache = closeCache;
/**
 * Check Redis connection status
 */
const isConnected = () => {
    return redisClient?.status === 'ready';
};
exports.isConnected = isConnected;
// Cache key prefixes for event planning service
exports.CACHE_KEYS = {
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
};
// Cache TTL constants (in seconds)
exports.CACHE_TTL = {
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
};
