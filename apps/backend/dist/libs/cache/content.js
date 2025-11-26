"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestimonials = exports.cacheTestimonials = exports.getGallery = exports.cacheGallery = exports.cacheQuoteRequest = exports.checkContactFormRateLimit = void 0;
const core_1 = require("./core");
const logger = (0, core_1.getLogger)();
/**
 * Rate limit contact form submissions
 */
const checkContactFormRateLimit = async (identifier) => {
    try {
        const client = (0, core_1.getClient)();
        const key = `${core_1.CACHE_KEYS.CONTACT_FORM}${identifier}`;
        const exists = await client.exists(key);
        if (exists) {
            logger.warn('Contact form rate limit hit', { identifier });
            return { success: true, data: false };
        }
        await client.set(key, '1', 'EX', core_1.CACHE_TTL.CONTACT_FORM);
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
        const client = (0, core_1.getClient)();
        const key = `${core_1.CACHE_KEYS.QUOTE_REQUEST}${quoteId}`;
        await client.set(key, JSON.stringify(quoteData), 'EX', core_1.CACHE_TTL.QUOTE_REQUEST);
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
/**
 * Cache gallery images by category
 */
const cacheGallery = async (category, images) => {
    try {
        const client = (0, core_1.getClient)();
        const key = `${core_1.CACHE_KEYS.GALLERY}${category}`;
        await client.set(key, JSON.stringify(images), 'EX', core_1.CACHE_TTL.GALLERY);
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
        const client = (0, core_1.getClient)();
        const key = `${core_1.CACHE_KEYS.GALLERY}${category}`;
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
        const client = (0, core_1.getClient)();
        await client.set(core_1.CACHE_KEYS.TESTIMONIALS, JSON.stringify(testimonials), 'EX', core_1.CACHE_TTL.TESTIMONIALS);
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
        const client = (0, core_1.getClient)();
        const data = await client.get(core_1.CACHE_KEYS.TESTIMONIALS);
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
