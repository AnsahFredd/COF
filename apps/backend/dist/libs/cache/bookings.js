"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookingStatus = exports.getBooking = exports.cacheBooking = void 0;
const core_1 = require("./core");
const logger = (0, core_1.getLogger)();
/**
 * Cache booking request
 */
const cacheBooking = async (booking) => {
    try {
        const client = (0, core_1.getClient)();
        const key = `${core_1.CACHE_KEYS.BOOKING}${booking.id}`;
        await client.set(key, JSON.stringify(booking), 'EX', core_1.CACHE_TTL.BOOKING);
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
        const client = (0, core_1.getClient)();
        const key = `${core_1.CACHE_KEYS.BOOKING}${bookingId}`;
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
        const client = (0, core_1.getClient)();
        const key = `${core_1.CACHE_KEYS.BOOKING}${bookingId}`;
        const data = await client.get(key);
        if (data) {
            const booking = JSON.parse(data);
            booking.status = status;
            await client.set(key, JSON.stringify(booking), 'EX', core_1.CACHE_TTL.BOOKING);
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
