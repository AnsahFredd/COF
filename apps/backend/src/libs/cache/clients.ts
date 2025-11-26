import { ClientProfile, BookingRequest, CacheResult } from './types';
import { getClient, CACHE_KEYS, CACHE_TTL, getLogger } from './core';

const logger = getLogger();

/**
 * Cache client profile
 */
export const cacheClientProfile = async (client: ClientProfile): Promise<CacheResult<void>> => {
  try {
    const redisClient = getClient();
    const key = `${CACHE_KEYS.CLIENT_PROFILE}${client.id}`;
    await redisClient.set(key, JSON.stringify(client), 'EX', CACHE_TTL.CLIENT_PROFILE);
    logger.info('Client profile cached', { clientId: client.id });
    return { success: true };
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to cache client profile', { error: err.message });
    return { success: false, error: err.message };
  }
};

/**
 * Get cached client profile
 */
export const getClientProfile = async (
  clientId: string
): Promise<CacheResult<ClientProfile | null>> => {
  try {
    const client = getClient();
    const key = `${CACHE_KEYS.CLIENT_PROFILE}${clientId}`;
    const data = await client.get(key);

    if (!data) {
      return { success: true, data: null };
    }

    const profile = JSON.parse(data) as ClientProfile;
    return { success: true, data: profile };
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to get client profile', { error: err.message });
    return { success: false, error: err.message };
  }
};

/**
 * Cache client's booking history
 */
export const cacheClientBookings = async (
  clientId: string,
  bookings: BookingRequest[]
): Promise<CacheResult<void>> => {
  try {
    const client = getClient();
    const key = `${CACHE_KEYS.CLIENT_BOOKINGS}${clientId}`;
    await client.set(key, JSON.stringify(bookings), 'EX', CACHE_TTL.CLIENT_BOOKINGS);
    logger.info('Client bookings cached', { clientId, count: bookings.length });
    return { success: true };
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to cache client bookings', { error: err.message });
    return { success: false, error: err.message };
  }
};

/**
 * Get client's cached bookings
 */
export const getClientBookings = async (
  clientId: string
): Promise<CacheResult<BookingRequest[] | null>> => {
  try {
    const client = getClient();
    const key = `${CACHE_KEYS.CLIENT_BOOKINGS}${clientId}`;
    const data = await client.get(key);

    if (!data) {
      return { success: true, data: null };
    }

    const bookings = JSON.parse(data) as BookingRequest[];
    return { success: true, data: bookings };
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to get client bookings', { error: err.message });
    return { success: false, error: err.message };
  }
};

/**
 * Invalidate all client-related caches
 */
export const invalidateClientCaches = async (clientId: string): Promise<CacheResult<void>> => {
  try {
    const client = getClient();
    const keys = [
      `${CACHE_KEYS.CLIENT_PROFILE}${clientId}`,
      `${CACHE_KEYS.CLIENT_BOOKINGS}${clientId}`,
    ];
    await client.del(...keys);
    logger.info('Client caches invalidated', { clientId });
    return { success: true };
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to invalidate client caches', { error: err.message });
    return { success: false, error: err.message };
  }
};
