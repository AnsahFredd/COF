import { AvailabilitySlot, CacheResult } from './types';
import { getClient, CACHE_KEYS, CACHE_TTL, getLogger } from './core';

const logger = getLogger();

/**
 * Cache availability for a specific date
 */
export const cacheAvailability = async (
  date: string,
  isAvailable: boolean,
  bookingId?: string
): Promise<CacheResult<void>> => {
  try {
    const client = getClient();
    const key = `${CACHE_KEYS.AVAILABILITY}${date}`;
    const slot: AvailabilitySlot = { date, isAvailable, bookingId };
    await client.set(key, JSON.stringify(slot), 'EX', CACHE_TTL.AVAILABILITY);
    logger.info('Availability cached', { date, isAvailable });
    return { success: true };
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to cache availability', { error: err.message });
    return { success: false, error: err.message };
  }
};

/**
 * Get availability for a specific date
 */
export const getAvailability = async (
  date: string
): Promise<CacheResult<AvailabilitySlot | null>> => {
  try {
    const client = getClient();
    const key = `${CACHE_KEYS.AVAILABILITY}${date}`;
    const data = await client.get(key);

    if (!data) {
      return { success: true, data: null };
    }

    const slot = JSON.parse(data) as AvailabilitySlot;
    return { success: true, data: slot };
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to get availability', { error: err.message });
    return { success: false, error: err.message };
  }
};

/**
 * Cache month's availability (for calendar view)
 */
export const cacheMonthAvailability = async (
  yearMonth: string,
  slots: AvailabilitySlot[]
): Promise<CacheResult<void>> => {
  try {
    const client = getClient();
    const key = `${CACHE_KEYS.AVAILABILITY_MONTH}${yearMonth}`;
    await client.set(key, JSON.stringify(slots), 'EX', CACHE_TTL.AVAILABILITY);
    logger.info('Month availability cached', { yearMonth, count: slots.length });
    return { success: true };
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to cache month availability', { error: err.message });
    return { success: false, error: err.message };
  }
};

/**
 * Get month's availability
 */
export const getMonthAvailability = async (
  yearMonth: string
): Promise<CacheResult<AvailabilitySlot[] | null>> => {
  try {
    const client = getClient();
    const key = `${CACHE_KEYS.AVAILABILITY_MONTH}${yearMonth}`;
    const data = await client.get(key);

    if (!data) {
      return { success: true, data: null };
    }

    const slots = JSON.parse(data) as AvailabilitySlot[];
    return { success: true, data: slots };
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to get month availability', { error: err.message });
    return { success: false, error: err.message };
  }
};

/**
 * Invalidate availability caches for a date range
 */
export const invalidateAvailabilityCaches = async (
  yearMonth: string
): Promise<CacheResult<void>> => {
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
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to invalidate availability caches', {
      error: err.message,
    });
    return { success: false, error: err.message };
  }
};
