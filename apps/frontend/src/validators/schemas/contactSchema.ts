/**
 * @file contactSchema.ts
 * @description Validation schema for the Contact form using Zod.
 * Reuses common validators from authSchemas for consistency.
 */

import { z } from 'zod';
import { emailValidator, nameValidator, phoneValidator } from '../base';

export const contactSchema = z.object({
  firstName: nameValidator('First name'),
  lastName: nameValidator('Last name'),
  email: emailValidator,
  phone: phoneValidator.optional(),
  subject: z
    .string()
    .min(1, 'Subject is required')
    .max(100, 'Subject must not exceed 100 characters')
    .trim(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters long')
    .max(1000, 'Message must not excceed 1000 characters')
    .trim(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
