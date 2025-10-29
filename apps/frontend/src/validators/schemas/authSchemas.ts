/**
 * @file authSchemas.ts
 * @description Authentication validation schemas using Zod for runtime validation of auth forms and API requests.
 *
 * Available schemas: login, signup, forgotPassword, resetPassword, changePassword, verifyEmail, resendVerification
 */

import { z } from 'zod';

const emailValidator = z
  .email({ message: 'Please enter a valid email address' })
  .min(1, 'Email is required')
  .toLowerCase()
  .trim();

const passwordValidator = z
  .string()
  .min(1, 'Password is required')
  .min(8, 'Password must be at least 8 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  );

const phoneValidator = z
  .string()
  .regex(
    /^(\+233|0)(2[0-9]|5[0-9])[0-9]{7}$/,
    'Please enter a valid phone number (e.g., 0244 123 456)'
  )
  .optional();

const nameValidator = (fieldName: string) =>
  z
    .string()
    .min(1, `${fieldName} is required`)
    .min(2, `${fieldName} must be at least 2 characters`)
    .max(50, `${fieldName} must not exceed 50 characters`)
    .regex(/^[a-zA-Z\s]+$/, `${fieldName} can only contain letters and spaces`)
    .trim();

//  Auth Schemas

export const loginSchema = z.object({
  email: emailValidator,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export const signupSchema = z
  .object({
    firstName: nameValidator('First name'),
    lastName: nameValidator('Last name'),
    email: emailValidator,
    phone: phoneValidator,
    password: passwordValidator,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: emailValidator,
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Reset token is required'),
    password: passwordValidator,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: passwordValidator,
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from current password',
    path: ['newPassword'],
  });

export const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
});

export const resendVerificationSchema = z.object({
  email: emailValidator,
});

//  TypeScript Types

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;
export type ResendVerificationFormData = z.infer<typeof resendVerificationSchema>;
