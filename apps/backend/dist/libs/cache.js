"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidateAvailabilityCaches = exports.invalidatePackageCaches = exports.invalidateClientCaches = exports.getTestimonials = exports.cacheTestimonials = exports.getGallery = exports.cacheGallery = exports.cacheQuoteRequest = exports.checkContactFormRateLimit = exports.getMonthAvailability = exports.cacheMonthAvailability = exports.getAvailability = exports.cacheAvailability = exports.getClientBookings = exports.cacheClientBookings = exports.getClientProfile = exports.cacheClientProfile = exports.updateBookingStatus = exports.getBooking = exports.cacheBooking = exports.getPackagesByCategory = exports.cachePackagesByCategory = exports.getPackageList = exports.cachePackageList = exports.getServicePackage = exports.cacheServicePackage = exports.isConnected = exports.closeCache = exports.initializeCache = void 0;
const ioredis_1 = require("ioredis");
const createLogger = () => ({
    info: (msg, meta) => console.log(`[CACHE-INFO] ${msg}`, meta || ''),
    error: (msg, meta) => console.error(`[CACHE-ERROR] ${msg}`, meta || ''),
    warn: (msg, meta) => console.warn(`[CACHE-WARN] ${msg}`, meta || ''),
});
// Singleton Redis client
let redisClient = null;
let logger = createLogger();
// Cache key prefixes for event planning service
const CACHE_KEYS = {
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
const CACHE_TTL = {
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
        redisClient.disconnect();
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
// ============================================
// SERVICE PACKAGE CACHING
// ============================================
/**
 * Cache service package details
 */
const cacheServicePackage = async (pkg) => {
    try {
        const client = getClient();
        const key = `${CACHE_KEYS.SERVICE_PACKAGE}${pkg.id}`;
        await client.set(key, JSON.stringify(pkg), 'EX', CACHE_TTL.PACKAGE);
        logger.info('Service package cached', { packageId: pkg.id });
        return { success: true };
    }
    catch (error) {
        const err = error;
        logger.error('Failed to cache package', { error: err.message });
        return { success: false, error: err.message };
    }
};
exports.cacheServicePackage = cacheServicePackage;
/**
 * Get cached service package
 */
const getServicePackage = async (packageId) => {
    try {
        const client = getClient();
        const key = `${CACHE_KEYS.SERVICE_PACKAGE}${packageId}`;
        const data = await client.get(key);
        if (!data) {
            return { success: true, data: null };
        }
        const pkg = JSON.parse(data);
        return { success: true, data: pkg };
    }
    catch (error) {
        const err = error;
        logger.error('Failed to get package', { error: err.message });
        return { success: false, error: err.message };
    }
};
exports.getServicePackage = getServicePackage;
/**
 * Cache all service packages
 */
const cachePackageList = async (packages) => {
    try {
        const client = getClient();
        await client.set(CACHE_KEYS.PACKAGE_LIST, JSON.stringify(packages), 'EX', CACHE_TTL.PACKAGE_LIST);
        logger.info('Package list cached', { count: packages.length });
        return { success: true };
    }
    catch (error) {
        const err = error;
        logger.error('Failed to cache package list', { error: err.message });
        return { success: false, error: err.message };
    }
};
exports.cachePackageList = cachePackageList;
/**
 * Get cached package list
 */
const getPackageList = async () => {
    try {
        const client = getClient();
        const data = await client.get(CACHE_KEYS.PACKAGE_LIST);
        if (!data) {
            return { success: true, data: null };
        }
        const packages = JSON.parse(data);
        return { success: true, data: packages };
    }
    catch (error) {
        const err = error;
        logger.error('Failed to get package list', { error: err.message });
        return { success: false, error: err.message };
    }
};
exports.getPackageList = getPackageList;
/**
 * Cache packages by category (wedding, birthday, etc.)
 */
const cachePackagesByCategory = async (category, packages) => {
    try {
        const client = getClient();
        const key = `${CACHE_KEYS.PACKAGE_CATEGORY}${category}`;
        await client.set(key, JSON.stringify(packages), 'EX', CACHE_TTL.PACKAGE_LIST);
        logger.info('Category packages cached', { category, count: packages.length });
        return { success: true };
    }
    catch (error) {
        const err = error;
        logger.error('Failed to cache category packages', { error: err.message });
        return { success: false, error: err.message };
    }
};
exports.cachePackagesByCategory = cachePackagesByCategory;
/**
 * Get cached packages by category
 */
const getPackagesByCategory = async (category) => {
    try {
        const client = getClient();
        const key = `${CACHE_KEYS.PACKAGE_CATEGORY}${category}`;
        const data = await client.get(key);
        if (!data) {
            return { success: true, data: null };
        }
        const packages = JSON.parse(data);
        return { success: true, data: packages };
    }
    catch (error) {
        const err = error;
        logger.error('Failed to get category packages', { error: err.message });
        return { success: false, error: err.message };
    }
};
exports.getPackagesByCategory = getPackagesByCategory;
// ============================================
// BOOKING REQUEST CACHING
// ============================================
/**
 * Cache booking request
 */
const cacheBooking = async (booking) => {
    try {
        const client = getClient();
        const key = `${CACHE_KEYS.BOOKING}${booking.id}`;
        await client.set(key, JSON.stringify(booking), 'EX', CACHE_TTL.BOOKING);
        logger.info('Booking cached', { bookingId: booking.id });
        return { success: true };
    }
    catch (error) {
        const err = error;
        logger.error('Failed to cache booking', { error: err.message });
        return { success: false, error: err.message };
    }
};
exports.cacheBooking = cacheBooking;
/**
 * Get cached booking
 */
const getBooking = async (bookingId) => {
    try {
        const client = getClient();
        const key = `${CACHE_KEYS.BOOKING}${bookingId}`;
        const data = await client.get(key);
        if (!data) {
            return { success: true, data: null };
        }
        const booking = JSON.parse(data);
        return { success: true, data: booking };
    }
    catch (error) {
        const err = error;
        logger.error('Failed to get booking', { error: err.message });
        return { success: false, error: err.message };
    }
};
exports.getBooking = getBooking;
/**
 * Update booking status
 */
const updateBookingStatus = async (bookingId, status) => {
    try {
        const client = getClient();
        const key = `${CACHE_KEYS.BOOKING}${bookingId}`;
        const data = await client.get(key);
        if (data) {
            const booking = JSON.parse(data);
            booking.status = status;
            await client.set(key, JSON.stringify(booking), 'EX', CACHE_TTL.BOOKING);
            logger.info('Booking status updated', { bookingId, status });
        }
        return { success: true };
    }
    catch (error) {
        const err = error;
        logger.error('Failed to update booking status', { error: err.message });
        return { success: false, error: err.message };
    }
};
exports.updateBookingStatus = updateBookingStatus;
// ============================================
// CLIENT MANAGEMENT
// ============================================
/**
 * Cache client profile
 */
const cacheClientProfile = async (client) => {
    try {
        const redisClient = getClient();
        const key = `${CACHE_KEYS.CLIENT_PROFILE}${client.id}`;
        await redisClient.set(key, JSON.stringify(client), 'EX', CACHE_TTL.CLIENT_PROFILE);
        logger.info('Client profile cached', { clientId: client.id });
        return { success: true };
    }
    catch (error) {
        const err = error;
        logger.error('Failed to cache client profile', { error: err.message });
        return { success: false, error: err.message };
    }
};
exports.cacheClientProfile = cacheClientProfile;
/**
 * Get cached client profile
 */
const getClientProfile = async (clientId) => {
    try {
        const client = getClient();
        const key = `${CACHE_KEYS.CLIENT_PROFILE}${clientId}`;
        const data = await client.get(key);
        if (!data) {
            return { success: true, data: null };
        }
        const profile = JSON.parse(data);
        return { success: true, data: profile };
    }
    catch (error) {
        const err = error;
        logger.error('Failed to get client profile', { error: err.message });
        return { success: false, error: err.message };
    }
};
exports.getClientProfile = getClientProfile;
/**
 * Cache client's booking history
 */
const cacheClientBookings = async (clientId, bookings) => {
    try {
        const client = getClient();
        const key = `${CACHE_KEYS.CLIENT_BOOKINGS}${clientId}`;
        await client.set(key, JSON.stringify(bookings), 'EX', CACHE_TTL.CLIENT_BOOKINGS);
        logger.info('Client bookings cached', { clientId, count: bookings.length });
        return { success: true };
    }
    catch (error) {
        const err = error;
        logger.error('Failed to cache client bookings', { error: err.message });
        return { success: false, error: err.message };
    }
};
exports.cacheClientBookings = cacheClientBookings;
/**
 * Get client's cached bookings
 */
const getClientBookings = async (clientId) => {
    try {
        const client = getClient();
        const key = `${CACHE_KEYS.CLIENT_BOOKINGS}${clientId}`;
        const data = await client.get(key);
        if (!data) {
            return { success: true, data: null };
        }
        const bookings = JSON.parse(data);
        return { success: true, data: bookings };
    }
    catch (error) {
        const err = error;
        logger.error('Failed to get client bookings', { error: err.message });
        return { success: false, error: err.message };
    }
};
exports.getClientBookings = getClientBookings;
// ============================================
// AVAILABILITY CALENDAR
// ============================================
/**
 * Cache availability for a specific date
 */
const cacheAvailability = async (date, isAvailable, bookingId) => {
    try {
        const client = getClient();
        const key = `${CACHE_KEYS.AVAILABILITY}${date}`;
        const slot = { date, isAvailable, bookingId };
        await client.set(key, JSON.stringify(slot), 'EX', CACHE_TTL.AVAILABILITY);
        logger.info('Availability cached', { date, isAvailable });
        return { success: true };
    }
    catch (error) {
        const err = error;
        logger.error('Failed to cache availability', { error: err.message });
        return { success: false, error: err.message };
    }
};
exports.cacheAvailability = cacheAvailability;
/**
 * Get availability for a specific date
 */
const getAvailability = async (date) => {
    try {
        const client = getClient();
        const key = `${CACHE_KEYS.AVAILABILITY}${date}`;
        const data = await client.get(key);
        if (!data) {
            return { success: true, data: null };
        }
        const slot = JSON.parse(data);
        return { success: true, data: slot };
    }
    catch (error) {
        const err = error;
        logger.error('Failed to get availability', { error: err.message });
        return { success: false, error: err.message };
    }
};
exports.getAvailability = getAvailability;
/**
 * Cache month's availability (for calendar view)
 */
const cacheMonthAvailability = async (yearMonth, slots) => {
    try {
        const client = getClient();
        const key = `${CACHE_KEYS.AVAILABILITY_MONTH}${yearMonth}`;
        await client.set(key, JSON.stringify(slots), 'EX', CACHE_TTL.AVAILABILITY);
        logger.info('Month availability cached', { yearMonth, count: slots.length });
        return { success: true };
    }
    catch (error) {
        const err = error;
        logger.error('Failed to cache month availability', { error: err.message });
        return { success: false, error: err.message };
    }
};
exports.cacheMonthAvailability = cacheMonthAvailability;
/**
 * Get month's availability
 */
const getMonthAvailability = async (yearMonth) => {
    try {
        const client = getClient();
        const key = `${CACHE_KEYS.AVAILABILITY_MONTH}${yearMonth}`;
        const data = await client.get(key);
        if (!data) {
            return { success: true, data: null };
        }
        const slots = JSON.parse(data);
        return { success: true, data: slots };
    }
    catch (error) {
        const err = error;
        logger.error('Failed to get month availability', { error: err.message });
        return { success: false, error: err.message };
    }
};
exports.getMonthAvailability = getMonthAvailability;
// ============================================
// QUOTE REQUESTS & CONTACT FORMS
// ============================================
/**
 * Rate limit contact form submissions
 */
const checkContactFormRateLimit = async (identifier) => {
    try {
        const client = getClient();
        const key = `${CACHE_KEYS.CONTACT_FORM}${identifier}`;
        const exists = await client.exists(key);
        if (exists) {
            logger.warn('Contact form rate limit hit', { identifier });
            return { success: true, data: false };
        }
        await client.set(key, '1', 'EX', CACHE_TTL.CONTACT_FORM);
        return { success: true, data: true };
    }
    catch (error) {
        const err = error;
        logger.error('Failed to check rate limit', { error: err.message });
        return { success: false, error: err.message };
    }
};
exports.checkContactFormRateLimit = checkContactFormRateLimit;
/**
 * Cache quote request
 */
const cacheQuoteRequest = async (quoteId, quoteData) => {
    try {
        const client = getClient();
        const key = `${CACHE_KEYS.QUOTE_REQUEST}${quoteId}`;
        await client.set(key, JSON.stringify(quoteData), 'EX', CACHE_TTL.QUOTE_REQUEST);
        logger.info('Quote request cached', { quoteId });
        return { success: true };
    }
    catch (error) {
        const err = error;
        logger.error('Failed to cache quote request', { error: err.message });
        return { success: false, error: err.message };
    }
};
exports.cacheQuoteRequest = cacheQuoteRequest;
// ============================================
// GALLERY & TESTIMONIALS
// ============================================
/**
 * Cache gallery images by category
 */
const cacheGallery = async (category, images) => {
    try {
        const client = getClient();
        const key = `${CACHE_KEYS.GALLERY}${category}`;
        await client.set(key, JSON.stringify(images), 'EX', CACHE_TTL.GALLERY);
        logger.info('Gallery cached', { category, count: images.length });
        return { success: true };
    }
    catch (error) {
        const err = error;
        logger.error('Failed to cache gallery', { error: err.message });
        return { success: false, error: err.message };
    }
};
exports.cacheGallery = cacheGallery;
/**
 * Get cached gallery
 */
const getGallery = async (category) => {
    try {
        const client = getClient();
        const key = `${CACHE_KEYS.GALLERY}${category}`;
        const data = await client.get(key);
        if (!data) {
            return { success: true, data: null };
        }
        const images = JSON.parse(data);
        return { success: true, data: images };
    }
    catch (error) {
        const err = error;
        logger.error('Failed to get gallery', { error: err.message });
        return { success: false, error: err.message };
    }
};
exports.getGallery = getGallery;
/**
 * Cache testimonials
 */
const cacheTestimonials = async (testimonials) => {
    try {
        const client = getClient();
        await client.set(CACHE_KEYS.TESTIMONIALS, JSON.stringify(testimonials), 'EX', CACHE_TTL.TESTIMONIALS);
        logger.info('Testimonials cached', { count: testimonials.length });
        return { success: true };
    }
    catch (error) {
        const err = error;
        logger.error('Failed to cache testimonials', { error: err.message });
        return { success: false, error: err.message };
    }
};
exports.cacheTestimonials = cacheTestimonials;
/**
 * Get cached testimonials
 */
const getTestimonials = async () => {
    try {
        const client = getClient();
        const data = await client.get(CACHE_KEYS.TESTIMONIALS);
        if (!data) {
            return { success: true, data: null };
        }
        const testimonials = JSON.parse(data);
        return { success: true, data: testimonials };
    }
    catch (error) {
        const err = error;
        logger.error('Failed to get testimonials', { error: err.message });
        return { success: false, error: err.message };
    }
};
exports.getTestimonials = getTestimonials;
// ============================================
// CACHE INVALIDATION
// ============================================
/**
 * Invalidate all client-related caches
 */
const invalidateClientCaches = async (clientId) => {
    try {
        const client = getClient();
        const keys = [
            `${CACHE_KEYS.CLIENT_PROFILE}${clientId}`,
            `${CACHE_KEYS.CLIENT_BOOKINGS}${clientId}`,
        ];
        await client.del(...keys);
        logger.info('Client caches invalidated', { clientId });
        return { success: true };
    }
    catch (error) {
        const err = error;
        logger.error('Failed to invalidate client caches', { error: err.message });
        return { success: false, error: err.message };
    }
};
exports.invalidateClientCaches = invalidateClientCaches;
/**
 * Invalidate all package caches
 */
const invalidatePackageCaches = async () => {
    try {
        const client = getClient();
        const pattern = `${CACHE_KEYS.PACKAGE_CATEGORY}*`;
        const keys = await client.keys(pattern);
        keys.push(CACHE_KEYS.PACKAGE_LIST, CACHE_KEYS.POPULAR_PACKAGES);
        if (keys.length > 0) {
            await client.del(...keys);
            logger.info('Package caches invalidated', { count: keys.length });
        }
        return { success: true };
    }
    catch (error) {
        const err = error;
        logger.error('Failed to invalidate package caches', { error: err.message });
        return { success: false, error: err.message };
    }
};
exports.invalidatePackageCaches = invalidatePackageCaches;
/**
 * Invalidate availability caches for a date range
 */
const invalidateAvailabilityCaches = async (yearMonth) => {
    try {
        const client = getClient();
        const pattern = `${CACHE_KEYS.AVAILABILITY}*`;
        const keys = await client.keys(pattern);
        keys.push(`${CACHE_KEYS.AVAILABILITY_MONTH}${yearMonth}`);
        if (keys.length > 0) {
            await client.del(...keys);
            logger.info('Availability caches invalidated', { count: keys.length });
        }
        return { success: true };
    }
    catch (error) {
        const err = error;
        logger.error('Failed to invalidate availability caches', {
            error: err.message,
        });
        return { success: false, error: err.message };
    }
};
exports.invalidateAvailabilityCaches = invalidateAvailabilityCaches;
// Export organized cache service
exports.default = {
    // Core
    initialize: exports.initializeCache,
    close: exports.closeCache,
    isConnected: exports.isConnected,
    // Service Packages
    cacheServicePackage: exports.cacheServicePackage,
    getServicePackage: exports.getServicePackage,
    cachePackageList: exports.cachePackageList,
    getPackageList: exports.getPackageList,
    cachePackagesByCategory: exports.cachePackagesByCategory,
    getPackagesByCategory: exports.getPackagesByCategory,
    // Bookings
    cacheBooking: exports.cacheBooking,
    getBooking: exports.getBooking,
    updateBookingStatus: exports.updateBookingStatus,
    // Clients
    cacheClientProfile: exports.cacheClientProfile,
    getClientProfile: exports.getClientProfile,
    cacheClientBookings: exports.cacheClientBookings,
    getClientBookings: exports.getClientBookings,
    // Availability
    cacheAvailability: exports.cacheAvailability,
    getAvailability: exports.getAvailability,
    cacheMonthAvailability: exports.cacheMonthAvailability,
    getMonthAvailability: exports.getMonthAvailability,
    // Contact & Quotes
    checkContactFormRateLimit: exports.checkContactFormRateLimit,
    cacheQuoteRequest: exports.cacheQuoteRequest,
    // Gallery & Testimonials
    cacheGallery: exports.cacheGallery,
    getGallery: exports.getGallery,
    cacheTestimonials: exports.cacheTestimonials,
    getTestimonials: exports.getTestimonials,
    // Cache Invalidation
    invalidateClientCaches: exports.invalidateClientCaches,
    invalidatePackageCaches: exports.invalidatePackageCaches,
    invalidateAvailabilityCaches: exports.invalidateAvailabilityCaches,
};
