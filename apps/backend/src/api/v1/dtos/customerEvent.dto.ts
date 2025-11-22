import { z } from 'zod';
import { EventType, ContactMethod, CustomerEventStatus } from '@prisma/client';

// Schema for creating a customer event
export const createCustomerEventSchema = z.object({
  body: z.object({
    fullName: z.string().min(3, 'Full name must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 characters'),
    eventType: z.nativeEnum(EventType, {
      errorMap: () => ({ message: 'Invalid event type' }),
    }),
    eventDate: z.string().datetime('Invalid date format'),
    eventLocation: z.string().min(3, 'Event location must be at least 3 characters'),
    message: z.string().optional(),
    budget: z.string().min(1, 'Budget is required'),
    guestCount: z.number().int().positive('Guest count must be a positive number').optional(),
    preferredContactMethod: z.nativeEnum(ContactMethod, {
      errorMap: () => ({ message: 'Invalid contact method' }),
    }),
    userId: z.string().optional(),
  }),
});

// Schema for updating a customer event
export const updateCustomerEventSchema = z.object({
  body: z.object({
    fullName: z.string().min(3).optional(),
    email: z.string().email().optional(),
    phone: z.string().min(10).optional(),
    eventType: z.nativeEnum(EventType).optional(),
    eventDate: z.string().datetime().optional(),
    eventLocation: z.string().min(3).optional(),
    message: z.string().optional(),
    budget: z.string().optional(),
    guestCount: z.number().int().positive().optional(),
    preferredContactMethod: z.nativeEnum(ContactMethod).optional(),
    status: z.nativeEnum(CustomerEventStatus).optional(),
    assignedTo: z.string().optional(),
    notes: z.string().optional(),
  }),
});

// TypeScript types inferred from schemas
export type CreateCustomerEventDto = z.infer<typeof createCustomerEventSchema>['body'];
export type UpdateCustomerEventDto = z.infer<typeof updateCustomerEventSchema>['body'];
