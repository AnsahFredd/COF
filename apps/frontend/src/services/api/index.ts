/**
 * @file index.ts
 * @description Central export file for all services
 */

export { default as authService } from './auth';
export { default as dashboardService } from './dashboard';
export { default as usersService } from './users';
export { default as bookingsService } from './bookings';
export { default as eventsService } from './events';
export { default as notificationsService } from './notifications';
export { default as portfolioService } from './portfolio';

// Export types
export type { LoginCredentials, RegisterData, AuthResponse, CurrentUser } from './auth';
export type { DashboardStats, ChartDataPoint } from './dashboard';
export type { User, UsersResponse, CreateUserData, UpdateUserData } from './users';
export type { Booking, BookingsResponse, CreateBookingData, UpdateBookingData } from './bookings';
export type { Event, EventsResponse, CreateEventData, UpdateEventData } from './events';
export type { Notification } from './notifications';
export type { PortfolioItem, CreatePortfolioItemData } from './portfolio';
