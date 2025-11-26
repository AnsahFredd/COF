"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidatePackageCaches = exports.getPackagesByCategory = exports.cachePackagesByCategory = exports.getPackageList = exports.cachePackageList = exports.getServicePackage = exports.cacheServicePackage = void 0;
const core_1 = require("./core");
const logger = (0, core_1.getLogger)();
/**
 * Cache service package details
 */
const cacheServicePackage = async (pkg) => {
    try {
        const client = (0, core_1.getClient)();
        const key = `${core_1.CACHE_KEYS.SERVICE_PACKAGE}${pkg.id}`;
        await client.set(key, JSON.stringify(pkg), 'EX', core_1.CACHE_TTL.PACKAGE);
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
        const client = (0, core_1.getClient)();
        const key = `${core_1.CACHE_KEYS.SERVICE_PACKAGE}${packageId}`;
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
        const client = (0, core_1.getClient)();
        await client.set(core_1.CACHE_KEYS.PACKAGE_LIST, JSON.stringify(packages), 'EX', core_1.CACHE_TTL.PACKAGE_LIST);
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
        const client = (0, core_1.getClient)();
        const data = await client.get(core_1.CACHE_KEYS.PACKAGE_LIST);
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
        const client = (0, core_1.getClient)();
        const key = `${core_1.CACHE_KEYS.PACKAGE_CATEGORY}${category}`;
        await client.set(key, JSON.stringify(packages), 'EX', core_1.CACHE_TTL.PACKAGE_LIST);
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
        const client = (0, core_1.getClient)();
        const key = `${core_1.CACHE_KEYS.PACKAGE_CATEGORY}${category}`;
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
/**
 * Invalidate all package caches
 */
const invalidatePackageCaches = async () => {
    try {
        const client = (0, core_1.getClient)();
        const pattern = `${core_1.CACHE_KEYS.PACKAGE_CATEGORY}*`;
        const keys = await client.keys(pattern);
        keys.push(core_1.CACHE_KEYS.PACKAGE_LIST, core_1.CACHE_KEYS.POPULAR_PACKAGES);
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
