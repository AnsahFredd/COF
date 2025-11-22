import { ServicePackage, CacheResult } from './types';
import { getClient, CACHE_KEYS, CACHE_TTL, getLogger } from './core';

const logger = getLogger();

/**
 * Cache service package details
 */
export const cacheServicePackage = async (pkg: ServicePackage): Promise<CacheResult<void>> => {
  try {
    const client = getClient();
    const key = `${CACHE_KEYS.SERVICE_PACKAGE}${pkg.id}`;
    await client.set(key, JSON.stringify(pkg), 'EX', CACHE_TTL.PACKAGE);
    logger.info('Service package cached', { packageId: pkg.id });
    return { success: true };
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to cache package', { error: err.message });
    return { success: false, error: err.message };
  }
};

/**
 * Get cached service package
 */
export const getServicePackage = async (
  packageId: string
): Promise<CacheResult<ServicePackage | null>> => {
  try {
    const client = getClient();
    const key = `${CACHE_KEYS.SERVICE_PACKAGE}${packageId}`;
    const data = await client.get(key);

    if (!data) {
      return { success: true, data: null };
    }

    const pkg = JSON.parse(data) as ServicePackage;
    return { success: true, data: pkg };
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to get package', { error: err.message });
    return { success: false, error: err.message };
  }
};

/**
 * Cache all service packages
 */
export const cachePackageList = async (packages: ServicePackage[]): Promise<CacheResult<void>> => {
  try {
    const client = getClient();
    await client.set(
      CACHE_KEYS.PACKAGE_LIST,
      JSON.stringify(packages),
      'EX',
      CACHE_TTL.PACKAGE_LIST
    );
    logger.info('Package list cached', { count: packages.length });
    return { success: true };
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to cache package list', { error: err.message });
    return { success: false, error: err.message };
  }
};

/**
 * Get cached package list
 */
export const getPackageList = async (): Promise<CacheResult<ServicePackage[] | null>> => {
  try {
    const client = getClient();
    const data = await client.get(CACHE_KEYS.PACKAGE_LIST);

    if (!data) {
      return { success: true, data: null };
    }

    const packages = JSON.parse(data) as ServicePackage[];
    return { success: true, data: packages };
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to get package list', { error: err.message });
    return { success: false, error: err.message };
  }
};

/**
 * Cache packages by category (wedding, birthday, etc.)
 */
export const cachePackagesByCategory = async (
  category: string,
  packages: ServicePackage[]
): Promise<CacheResult<void>> => {
  try {
    const client = getClient();
    const key = `${CACHE_KEYS.PACKAGE_CATEGORY}${category}`;
    await client.set(key, JSON.stringify(packages), 'EX', CACHE_TTL.PACKAGE_LIST);
    logger.info('Category packages cached', { category, count: packages.length });
    return { success: true };
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to cache category packages', { error: err.message });
    return { success: false, error: err.message };
  }
};

/**
 * Get cached packages by category
 */
export const getPackagesByCategory = async (
  category: string
): Promise<CacheResult<ServicePackage[] | null>> => {
  try {
    const client = getClient();
    const key = `${CACHE_KEYS.PACKAGE_CATEGORY}${category}`;
    const data = await client.get(key);

    if (!data) {
      return { success: true, data: null };
    }

    const packages = JSON.parse(data) as ServicePackage[];
    return { success: true, data: packages };
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to get category packages', { error: err.message });
    return { success: false, error: err.message };
  }
};

/**
 * Invalidate all package caches
 */
export const invalidatePackageCaches = async (): Promise<CacheResult<void>> => {
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
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to invalidate package caches', { error: err.message });
    return { success: false, error: err.message };
  }
};
