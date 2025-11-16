/**
 * @file routes.ts
 * @description Frontend route definitions for client-side navigation.
 * These paths define what users see in their browser's address bar (e.g., https://yourapp.com/login).
 * Used with React Router for navigation between pages within the app.
 *
 */

/**
 * @constant ROUTES
 * @description Object containing all frontend route paths for the application.
 * These are client-side routes that React Router uses for navigation.
 * DO NOT confuse with API endpoints - these are browser URLs, not backend API calls.
 */

export const ROUTES = {
  // Public Routes
  HOME: '/',
  SERVICES: '/services',
  SERVICE_DETAILS: '/services/:slug',
  BOOKING: '/book-us',
  PORTFOLIO: '/portfolio-gallery',

  // Static Pages Routes
  ABOUT: '/about-us',
  CONTACT: '/contact-us',
  FAQ: '/faq',
  PRIVACY: '/privacy-policy',
  TERMS: '/terms-of-service',

  // Events
  EVENTS: '/events',
  EVENT_DETAILS: '/events/:id',
  EVENT_BOOKING: '/events/:id/booking',

  // Vendors
  VENDORS: '/vendors',
  VENDOR_DETAILS: '/vendors/:id',

  // Venues
  VENUES: '/venues',
  VENUE_DETAILS: '/venues/:id',

  // Auth
  SIGNUP: '/register',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',

  // User Dashboard
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  DASHBOARD_BOOKINGS: '/bookings',
  BOOKING_DETAILS: '/bookings/:id',
  WISHLIST: '/wishlist',
  SETTINGS: '/settings',

  // Checkout
  CHECKOUT: '/checkout',
  BOOKING_CONFIRMATION: '/booking/confirmation/:id',
} as const;

// Helper to generate dynamic routes

/**
 *
 * @function getEventBookingRoute
 * @decription Generate a full route path for specific event detail page.
 */
export const getEventDetailRoute = (id: string) => `/events/${id}`;

/**
 * @function getEventBookingRoute
 * @description Generate a full route path for specific event booking page.
 */

export const getEventBookingRoute = (id: string) => `/events/${id}/booking`;

/**
 * @function getVendorDetailRoute
 * @description Generate a full route path for a specific vendor detail page.
 */
export const getVendorDetailRoute = (id: string) => `/vendors/${id}`;

/**
 * @function getVenueDetailRoute
 * @description Generate a full route path for a specific venue detail page.
 */
export const getVenueDetailRoute = (id: string) => `/venues/${id}`;

/**
 * @function getBookingDetailRoute
 * @description Generate a full route path for a specific booking detail page.
 */
export const getBookingDetailRoute = (id: string) => `/bookings/${id}`;

/**
 * @function getBookingConfirmationRoute
 * @description Generate a full route path for a booking confirmation page.
 */
export const getBookingConfirmationRoute = (id: string) => `/booking/confirmation/${id}`;

//  Type Safety Helpers

/**
 * @typedef RouteKey
 * @description Type-safe union of all route keys (e.g., "HOME" | "LOGIN" | "EVENTS").
 */
export type RouteKey = keyof typeof ROUTES;

/**
 * @typedef RoutePath
 * @description Type-safe union of all route path strings (e.g., "/login" | "/events/:id").
 */
export type RoutePath = (typeof ROUTES)[RouteKey];
