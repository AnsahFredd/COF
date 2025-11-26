import { CacheResult } from './types';
import { getClient, CACHE_KEYS, CACHE_TTL, getLogger } from './core';

const logger = getLogger();

/**
 * Rate limit contact form submissions
 */
export const checkContactFormRateLimit = async (
  identifier: string
): Promise<CacheResult<boolean>> => {
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
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to check rate limit', { error: err.message });
    return { success: false, error: err.message };
  }
};

/**
 * Cache quote request
 */
export const cacheQuoteRequest = async (
  quoteId: string,
  quoteData: any
): Promise<CacheResult<void>> => {
  try {
    const client = getClient();
    const key = `${CACHE_KEYS.QUOTE_REQUEST}${quoteId}`;
    await client.set(key, JSON.stringify(quoteData), 'EX', CACHE_TTL.QUOTE_REQUEST);
    logger.info('Quote request cached', { quoteId });
    return { success: true };
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to cache quote request', { error: err.message });
    return { success: false, error: err.message };
  }
};

/**
 * Cache gallery images by category
 */
export const cacheGallery = async (category: string, images: any[]): Promise<CacheResult<void>> => {
  try {
    const client = getClient();
    const key = `${CACHE_KEYS.GALLERY}${category}`;
    await client.set(key, JSON.stringify(images), 'EX', CACHE_TTL.GALLERY);
    logger.info('Gallery cached', { category, count: images.length });
    return { success: true };
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to cache gallery', { error: err.message });
    return { success: false, error: err.message };
  }
};

/**
 * Get cached gallery
 */
export const getGallery = async (category: string): Promise<CacheResult<any[] | null>> => {
  try {
    const client = getClient();
    const key = `${CACHE_KEYS.GALLERY}${category}`;
    const data = await client.get(key);

    if (!data) {
      return { success: true, data: null };
    }

    const images = JSON.parse(data);
    return { success: true, data: images };
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to get gallery', { error: err.message });
    return { success: false, error: err.message };
  }
};

/**
 * Cache testimonials
 */
export const cacheTestimonials = async (testimonials: any[]): Promise<CacheResult<void>> => {
  try {
    const client = getClient();
    await client.set(
      CACHE_KEYS.TESTIMONIALS,
      JSON.stringify(testimonials),
      'EX',
      CACHE_TTL.TESTIMONIALS
    );
    logger.info('Testimonials cached', { count: testimonials.length });
    return { success: true };
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to cache testimonials', { error: err.message });
    return { success: false, error: err.message };
  }
};

/**
 * Get cached testimonials
 */
export const getTestimonials = async (): Promise<CacheResult<any[] | null>> => {
  try {
    const client = getClient();
    const data = await client.get(CACHE_KEYS.TESTIMONIALS);

    if (!data) {
      return { success: true, data: null };
    }

    const testimonials = JSON.parse(data);
    return { success: true, data: testimonials };
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to get testimonials', { error: err.message });
    return { success: false, error: err.message };
  }
};
