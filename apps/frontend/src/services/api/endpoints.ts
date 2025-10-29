/**
 * @file endpoints.ts
 * @description Backend API endpoint definitions for making HTTP requests.
 * These are the URLs where your React app sends data to the backend server (e.g., https://api.yourapp.com/auth/login).
 * Used with axios/fetch to communicate with your API.
 *
 * DO NOT confuse with frontend routes (routes.ts) - these are for API calls, not browser navigation.
 *
 */

/**
 * @constant API_ENDPOINTS
 * @description Centralized object containing all backend API endpoint URLs.
 * Organized by feature/resource for easy navigation and maintenance.
 *
 * Benefits:
 * - Single source of truth for all API URLs
 * - TypeScript autocomplete support
 * - Easy to update if backend routes change
 * - Prevents typos from hardcoded strings scattered throughout codebase
 */

export const API_ENDPOINTS = {
  //  Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register', // renamed SIGNUP → REGISTER for standard naming
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    ME: '/auth/me',
  },

  //  Events
  EVENTS: {
    LIST: '/events',
    DETAIL: (id: string) => `/events/${id}`,
    CREATE: '/events',
    UPDATE: (id: string) => `/events/${id}`,
    DELETE: (id: string) => `/events/${id}`,
    FEATURED: '/events/featured',
    CATEGORIES: '/events/categories',
    SEARCH: '/events/search',
  },

  //  Bookings
  BOOKINGS: {
    LIST: '/bookings',
    DETAIL: (id: string) => `/bookings/${id}`,
    CREATE: '/bookings',
    CANCEL: (id: string) => `/bookings/${id}/cancel`,
    MY_BOOKINGS: '/bookings/my-bookings',
    CHECK_AVAILABILITY: '/bookings/check-availability',
  },

  //  Vendors
  VENDORS: {
    LIST: '/vendors',
    DETAIL: (id: string) => `/vendors/${id}`,
    REVIEWS: (id: string) => `/vendors/${id}/reviews`,
    PORTFOLIO: (id: string) => `/vendors/${id}/portfolio`,
  },

  //  Venues
  VENUES: {
    LIST: '/venues',
    DETAIL: (id: string) => `/venues/${id}`,
    AVAILABILITY: (id: string) => `/venues/${id}/availability`,
  },

  //  Payments
  PAYMENTS: {
    CREATE_INTENT: '/payments/create-intent',
    CONFIRM: '/payments/confirm',
    WEBHOOK: '/payments/webhook',
  },

  //  Reviews
  REVIEWS: {
    LIST: '/reviews',
    CREATE: '/reviews',
    UPDATE: (id: string) => `/reviews/${id}`,
    DELETE: (id: string) => `/reviews/${id}`,
  },

  // User
  USER: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
    UPLOAD_AVATAR: '/users/avatar',
  },

  //  Wishlist
  WISHLIST: {
    LIST: '/wishlist',
    ADD: '/wishlist',
    REMOVE: (id: string) => `/wishlist/${id}`,
  },

  //  Notifications
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/read-all',
  },
} as const;
