"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
// Schema for creating a user
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email address'),
        password: zod_1.z.string().min(8, 'Password must be at least 8 characters'),
        name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
        role: zod_1.z.enum(['ADMIN', 'USER']).optional(),
    }),
});
// Schema for updating a user
exports.updateUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email address').optional(),
        name: zod_1.z.string().min(2, 'Name must be at least 2 characters').optional(),
        role: zod_1.z.enum(['ADMIN', 'USER']).optional(),
        avatar: zod_1.z.string().url().optional(),
    }),
});
// Schema for changing password
exports.changePasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        currentPassword: zod_1.z.string().min(1, 'Current password is required'),
        newPassword: zod_1.z.string().min(8, 'New password must be at least 8 characters'),
    }),
});
