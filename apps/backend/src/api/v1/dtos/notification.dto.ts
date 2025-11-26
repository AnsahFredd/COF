import { z } from 'zod';

// Schema for creating a notification
export const createNotificationSchema = z.object({
  body: z.object({
    userId: z.string().min(1, 'User ID is required'),
    title: z.string().min(3, 'Title must be at least 3 characters'),
    message: z.string().min(5, 'Message must be at least 5 characters'),
  }),
});

// Schema for updating a notification
export const updateNotificationSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    message: z.string().min(5).optional(),
    isRead: z.boolean().optional(),
  }),
});

// TypeScript types inferred from schemas
export type CreateNotificationDto = z.infer<typeof createNotificationSchema>['body'];
export type UpdateNotificationDto = z.infer<typeof updateNotificationSchema>['body'];
