"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidateClientCaches = exports.getClientBookings = exports.cacheClientBookings = exports.getClientProfile = exports.cacheClientProfile = void 0;
const core_1 = require("./core");
const logger = (0, core_1.getLogger)();
/**
 * Cache client profile
 */
const cacheClientProfile = async (client) => {
    try {
        const redisClient = (0, core_1.getClient)();
        const key = `${core_1.CACHE_KEYS.CLIENT_PROFILE}${client.id}`;
        await redisClient.set(key, JSON.stringify(client), 'EX', core_1.CACHE_TTL.CLIENT_PROFILE);
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
        const client = (0, core_1.getClient)();
        const key = `${core_1.CACHE_KEYS.CLIENT_PROFILE}${clientId}`;
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
        const client = (0, core_1.getClient)();
        const key = `${core_1.CACHE_KEYS.CLIENT_BOOKINGS}${clientId}`;
        await client.set(key, JSON.stringify(bookings), 'EX', core_1.CACHE_TTL.CLIENT_BOOKINGS);
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
        const client = (0, core_1.getClient)();
        const key = `${core_1.CACHE_KEYS.CLIENT_BOOKINGS}${clientId}`;
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
/**
 * Invalidate all client-related caches
 */
const invalidateClientCaches = async (clientId) => {
    try {
        const client = (0, core_1.getClient)();
        const keys = [
            `${core_1.CACHE_KEYS.CLIENT_PROFILE}${clientId}`,
            `${core_1.CACHE_KEYS.CLIENT_BOOKINGS}${clientId}`,
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
