import { Booking, User } from '@prisma/client';
import { toPublicUser } from './user.mapper';

/**
 * Booking with optional user relation
 */
type BookingWithUser = Booking & {
  user?: User;
};

/**
 * Maps a Booking entity to a public response object
 */
export const toPublicBooking = (booking: BookingWithUser) => ({
  id: booking.id,
  userId: booking.userId,
  eventType: booking.eventType,
  eventDate: booking.eventDate,
  eventLocation: booking.eventLocation,
  budget: booking.budget,
  message: booking.message,
  status: booking.status,
  customerEventId: booking.customerEventId,
  createdAt: booking.createdAt,
  updatedAt: booking.updatedAt,
  // Include user data if it was loaded in the query
  ...(booking.user && { user: toPublicUser(booking.user) }),
});

/**
 * Maps multiple bookings to public response objects
 */
export const toPublicBookings = (bookings: BookingWithUser[]) => bookings.map(toPublicBooking);

/**
 * Maps a booking to a minimal summary (for lists)
 */
export const toBookingSummary = (booking: Booking) => ({
  id: booking.id,
  eventType: booking.eventType,
  eventDate: booking.eventDate,
  eventLocation: booking.eventLocation,
  status: booking.status,
  createdAt: booking.createdAt,
});

/**
 * Type definitions for mapped responses
 */
export type PublicBooking = ReturnType<typeof toPublicBooking>;
export type BookingSummary = ReturnType<typeof toBookingSummary>;
