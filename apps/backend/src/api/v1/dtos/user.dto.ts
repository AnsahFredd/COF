import { z } from 'zod';

// Schema for creating a user
export const createUserSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    role: z.enum(['ADMIN', 'USER']).optional(),
  }),
});

// Schema for updating a user
export const updateUserSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address').optional(),
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    role: z.enum(['ADMIN', 'USER']).optional(),
    avatar: z.string().url().optional(),
  }),
});

// Schema for changing password
export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters'),
  }),
});

// TypeScript types inferred from schemas
export type CreateUserDto = z.infer<typeof createUserSchema>['body'];
export type UpdateUserDto = z.infer<typeof updateUserSchema>['body'];
export type ChangePasswordDto = z.infer<typeof changePasswordSchema>['body'];
