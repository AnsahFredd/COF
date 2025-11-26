import { z } from 'zod';
import { EventType, BookingStatus } from '@prisma/client';

// Schema for creating a booking
export const createBookingSchema = z.object({
  body: z.object({
    userId: z.string().min(1, 'User ID is required'),
    eventType: z.nativeEnum(EventType, {
      errorMap: () => ({ message: 'Invalid event type' }),
    }),
    eventDate: z.string().datetime('Invalid date format'),
    eventLocation: z.string().min(3, 'Event location must be at least 3 characters'),
    budget: z.string().optional(),
    message: z.string().optional(),
    customerEventId: z.string().optional(),
  }),
});

// Schema for updating a booking
export const updateBookingSchema = z.object({
  body: z.object({
    eventType: z.nativeEnum(EventType).optional(),
    eventDate: z.string().datetime().optional(),
    eventLocation: z.string().min(3).optional(),
    budget: z.string().optional(),
    message: z.string().optional(),
    status: z.nativeEnum(BookingStatus).optional(),
    customerEventId: z.string().optional(),
  }),
});

// TypeScript types inferred from schemas
export type CreateBookingDto = z.infer<typeof createBookingSchema>['body'];
export type UpdateBookingDto = z.infer<typeof updateBookingSchema>['body'];
