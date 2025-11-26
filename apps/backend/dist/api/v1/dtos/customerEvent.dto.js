"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomerEventSchema = exports.createCustomerEventSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
// Schema for creating a customer event
exports.createCustomerEventSchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string().min(3, 'Full name must be at least 3 characters'),
        email: zod_1.z.string().email('Invalid email address'),
        phone: zod_1.z.string().min(10, 'Phone number must be at least 10 characters'),
        eventType: zod_1.z.nativeEnum(client_1.EventType, {
            errorMap: () => ({ message: 'Invalid event type' }),
        }),
        eventDate: zod_1.z.string().datetime('Invalid date format'),
        eventLocation: zod_1.z.string().min(3, 'Event location must be at least 3 characters'),
        message: zod_1.z.string().optional(),
        budget: zod_1.z.string().min(1, 'Budget is required'),
        guestCount: zod_1.z.number().int().positive('Guest count must be a positive number').optional(),
        preferredContactMethod: zod_1.z.nativeEnum(client_1.ContactMethod, {
            errorMap: () => ({ message: 'Invalid contact method' }),
        }),
        userId: zod_1.z.string().optional(),
    }),
});
// Schema for updating a customer event
exports.updateCustomerEventSchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string().min(3).optional(),
        email: zod_1.z.string().email().optional(),
        phone: zod_1.z.string().min(10).optional(),
        eventType: zod_1.z.nativeEnum(client_1.EventType).optional(),
        eventDate: zod_1.z.string().datetime().optional(),
        eventLocation: zod_1.z.string().min(3).optional(),
        message: zod_1.z.string().optional(),
        budget: zod_1.z.string().optional(),
        guestCount: zod_1.z.number().int().positive().optional(),
        preferredContactMethod: zod_1.z.nativeEnum(client_1.ContactMethod).optional(),
        status: zod_1.z.nativeEnum(client_1.CustomerEventStatus).optional(),
        assignedTo: zod_1.z.string().optional(),
        notes: zod_1.z.string().optional(),
    }),
});
