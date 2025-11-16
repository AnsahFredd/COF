/**
 * @file validators/base/index.ts
 * @description Reusable Zod validators for form fields.
 */
import { z } from 'zod';

// Email Validator
export const emailValidator = z
  .string()
  .email({ message: 'Please enter a valid email address' })
  .min(1, 'Email is required')
  .toLowerCase()
  .trim();

// Password Validator
export const passwordValidator = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain at least one uppercase, one lowercase, and one number'
  );

// Phone Validator
export const phoneValidator = z
  .string()
  .regex(
    /^(\+233|0)(2[0-9]|5[0-9])[0-9]{7}$/,
    'Please enter a valid phone number (e.g., 0244 123 456)'
  );

// Name Validator Factory
export const nameValidator = (fieldName: string) =>
  z
    .string()
    .min(2, `${fieldName} must be at least 2 characters`)
    .max(50, `${fieldName} must not exceed 50 characters`)
    .regex(/^[a-zA-Z\s]+$/, `${fieldName} can only contain letters and spaces`)
    .trim();
