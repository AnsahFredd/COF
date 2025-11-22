/**
 * @file contactSchema.ts
 * @description Validation schema for the Contact form using Zod.
 * Reuses common validators from authSchemas for consistency.
 */

import { z } from 'zod';
import { emailValidator, phoneValidator } from '../base';

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters')
    .trim(),
  email: emailValidator,
  phone: phoneValidator,
  eventType: z.string().min(1, 'Please select an event type'),
  eventDate: z
    .date()
    .nullable()
    .refine((date) => date !== null, {
      message: 'Event date is required',
    }),
  eventLocation: z
    .string()
    .min(2, 'Event location is required')
    .max(200, 'Event location must not exceed 200 characters')
    .trim(),
  message: z.string().max(1000, 'Message must not exceed 1000 characters').trim().optional(),
  budget: z.string().min(1, 'Budget is required').trim(),
  guestCount: z
    .number()
    .int('Guest count must be a whole number')
    .positive('Guest count must be at least 1')
    .max(10000, 'Guest count seems unrealistic'),
  preferredContactMethod: z.string().min(1, 'Please select a preferred contact method'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
