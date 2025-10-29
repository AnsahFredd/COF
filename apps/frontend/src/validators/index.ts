/**
 * @file index.ts
 * @description Main entry point for all validation schemas.
 * Centralized exports for easy imports throughout the application.
 *
 * @example
 * import { loginSchema, signupSchema, type LoginFormData } from '@/validators';
 */

// ===== Auth Schemas =====
export {
  loginSchema,
  signupSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  verifyEmailSchema,
  type LoginFormData,
  type SignupFormData,
  type ForgotPasswordFormData,
  type ResetPasswordFormData,
  type ChangePasswordFormData,
  type VerifyEmailFormData,
} from './schemas/authSchemas';
