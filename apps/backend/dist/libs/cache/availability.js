"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidateAvailabilityCaches = exports.getMonthAvailability = exports.cacheMonthAvailability = exports.getAvailability = exports.cacheAvailability = void 0;
const core_1 = require("./core");
const logger = (0, core_1.getLogger)();
/**
 * Cache availability for a specific date
 */
const cacheAvailability = async (date, isAvailable, bookingId) => {
    try {
        const client = (0, core_1.getClient)();
        const key = `${core_1.CACHE_KEYS.AVAILABILITY}${date}`;
        const slot = { date, isAvailable, bookingId };
        await client.set(key, JSON.stringify(slot), 'EX', core_1.CACHE_TTL.AVAILABILITY);
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
        const client = (0, core_1.getClient)();
        const key = `${core_1.CACHE_KEYS.AVAILABILITY}${date}`;
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
        const client = (0, core_1.getClient)();
        const key = `${core_1.CACHE_KEYS.AVAILABILITY_MONTH}${yearMonth}`;
        await client.set(key, JSON.stringify(slots), 'EX', core_1.CACHE_TTL.AVAILABILITY);
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
        const client = (0, core_1.getClient)();
        const key = `${core_1.CACHE_KEYS.AVAILABILITY_MONTH}${yearMonth}`;
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
/**
 * Invalidate availability caches for a date range
 */
const invalidateAvailabilityCaches = async (yearMonth) => {
    try {
        const client = (0, core_1.getClient)();
        const pattern = `${core_1.CACHE_KEYS.AVAILABILITY}*`;
        const keys = await client.keys(pattern);
        keys.push(`${core_1.CACHE_KEYS.AVAILABILITY_MONTH}${yearMonth}`);
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
