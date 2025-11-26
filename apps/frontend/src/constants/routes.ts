/**
 * @file routes.ts
 * @description Frontend route definitions for client-side navigation.
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

  // Events (Public)
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

  // Admin Routes
  ADMIN: {
    ROOT: '/admin',
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    EVENTS: '/admin/events',
    BOOKINGS: '/admin/bookings',
    NOTIFICATIONS: '/admin/notifications',
    SETTINGS: '/admin/settings',
    PORTFOLIO: '/admin/portfolio',
  },

  // Checkout
  CHECKOUT: '/checkout',
  BOOKING_CONFIRMATION: '/booking/confirmation/:id',
} as const;

// Helper to generate dynamic routes
export const getEventDetailRoute = (id: string) => `/events/${id}`;
export const getEventBookingRoute = (id: string) => `/events/${id}/booking`;
export const getVendorDetailRoute = (id: string) => `/vendors/${id}`;
export const getVenueDetailRoute = (id: string) => `/venues/${id}`;
export const getBookingDetailRoute = (id: string) => `/bookings/${id}`;
export const getBookingConfirmationRoute = (id: string) => `/booking/confirmation/${id}`;

// Type Safety Helpers
export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
