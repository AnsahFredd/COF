"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNotificationSchema = exports.createNotificationSchema = void 0;
const zod_1 = require("zod");
// Schema for creating a notification
exports.createNotificationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().min(1, 'User ID is required'),
        title: zod_1.z.string().min(3, 'Title must be at least 3 characters'),
        message: zod_1.z.string().min(5, 'Message must be at least 5 characters'),
    }),
});
// Schema for updating a notification
exports.updateNotificationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(3).optional(),
        message: zod_1.z.string().min(5).optional(),
        isRead: zod_1.z.boolean().optional(),
    }),
});
