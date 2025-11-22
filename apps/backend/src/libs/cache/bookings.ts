import { BookingRequest, CacheResult } from './types';
import { getClient, CACHE_KEYS, CACHE_TTL, getLogger } from './core';

const logger = getLogger();

/**
 * Cache booking request
 */
export const cacheBooking = async (booking: BookingRequest): Promise<CacheResult<void>> => {
  try {
    const client = getClient();
    const key = `${CACHE_KEYS.BOOKING}${booking.id}`;
    await client.set(key, JSON.stringify(booking), 'EX', CACHE_TTL.BOOKING);
    logger.info('Booking cached', { bookingId: booking.id });
    return { success: true };
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to cache booking', { error: err.message });
    return { success: false, error: err.message };
  }
};

/**
 * Get cached booking
 */
export const getBooking = async (
  bookingId: string
): Promise<CacheResult<BookingRequest | null>> => {
  try {
    const client = getClient();
    const key = `${CACHE_KEYS.BOOKING}${bookingId}`;
    const data = await client.get(key);

    if (!data) {
      return { success: true, data: null };
    }

    const booking = JSON.parse(data) as BookingRequest;
    return { success: true, data: booking };
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to get booking', { error: err.message });
    return { success: false, error: err.message };
  }
};

/**
 * Update booking status
 */
export const updateBookingStatus = async (
  bookingId: string,
  status: BookingRequest['status']
): Promise<CacheResult<void>> => {
  try {
    const client = getClient();
    const key = `${CACHE_KEYS.BOOKING}${bookingId}`;
    const data = await client.get(key);

    if (data) {
      const booking = JSON.parse(data) as BookingRequest;
      booking.status = status;
      await client.set(key, JSON.stringify(booking), 'EX', CACHE_TTL.BOOKING);
      logger.info('Booking status updated', { bookingId, status });
    }

    return { success: true };
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to update booking status', { error: err.message });
    return { success: false, error: err.message };
  }
};
