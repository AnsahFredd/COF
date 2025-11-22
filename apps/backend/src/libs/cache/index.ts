import * as core from './core';
import * as packages from './packages';
import * as bookings from './bookings';
import * as clients from './clients';
import * as availability from './availability';
import * as content from './content';

export * from './types';
export * from './core';
export * from './packages';
export * from './bookings';
export * from './clients';
export * from './availability';
export * from './content';

const cacheService = {
  ...core,
  ...packages,
  ...bookings,
  ...clients,
  ...availability,
  ...content,
  // Alias initialize for backward compatibility if needed, though core has initializeCache
  initialize: core.initializeCache,
  close: core.closeCache,
};

export default cacheService;
