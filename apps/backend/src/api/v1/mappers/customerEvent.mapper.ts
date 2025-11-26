import { CustomerEvent, User, Booking } from '@prisma/client';
import { toPublicUser } from './user.mapper';

/**
 * CustomerEvent with optional relations
 */
type CustomerEventWithRelations = CustomerEvent & {
  user?: User;
  bookings?: Booking[];
};

/**
 * Maps a CustomerEvent entity to a public response object
 */
export const toPublicCustomerEvent = (event: CustomerEventWithRelations) => ({
  id: event.id,
  fullName: event.fullName,
  email: event.email,
  phone: event.phone,
  eventType: event.eventType,
  eventDate: event.eventDate,
  eventLocation: event.eventLocation,
  message: event.message,
  budget: event.budget,
  preferredContactMethod: event.preferredContactMethod,
  status: event.status,
  userId: event.userId,
  assignedTo: event.assignedTo,
  notes: event.notes,
  createdAt: event.createdAt,
  updatedAt: event.updatedAt,
  // Include user data if it was loaded in the query
  ...(event.user && { user: toPublicUser(event.user) }),
  // Include bookings count if loaded
  ...(event.bookings && { bookingsCount: event.bookings.length }),
});

/**
 * Maps multiple customer events to public response objects
 */
export const toPublicCustomerEvents = (events: CustomerEventWithRelations[]) =>
  events.map(toPublicCustomerEvent);

/**
 * Maps a customer event to a minimal summary (for admin lists)
 */
export const toCustomerEventSummary = (event: CustomerEvent) => ({
  id: event.id,
  fullName: event.fullName,
  email: event.email,
  phone: event.phone,
  eventType: event.eventType,
  eventDate: event.eventDate,
  status: event.status,
  createdAt: event.createdAt,
});

/**
 * Type definitions for mapped responses
 */
export type PublicCustomerEvent = ReturnType<typeof toPublicCustomerEvent>;
export type CustomerEventSummary = ReturnType<typeof toCustomerEventSummary>;
