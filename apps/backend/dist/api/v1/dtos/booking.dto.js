"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookingSchema = exports.createBookingSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
// Schema for creating a booking
exports.createBookingSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().min(1, 'User ID is required'),
        eventType: zod_1.z.nativeEnum(client_1.EventType, {
            errorMap: () => ({ message: 'Invalid event type' }),
        }),
        eventDate: zod_1.z.string().datetime('Invalid date format'),
        eventLocation: zod_1.z.string().min(3, 'Event location must be at least 3 characters'),
        budget: zod_1.z.string().optional(),
        message: zod_1.z.string().optional(),
        customerEventId: zod_1.z.string().optional(),
    }),
});
// Schema for updating a booking
exports.updateBookingSchema = zod_1.z.object({
    body: zod_1.z.object({
        eventType: zod_1.z.nativeEnum(client_1.EventType).optional(),
        eventDate: zod_1.z.string().datetime().optional(),
        eventLocation: zod_1.z.string().min(3).optional(),
        budget: zod_1.z.string().optional(),
        message: zod_1.z.string().optional(),
        status: zod_1.z.nativeEnum(client_1.BookingStatus).optional(),
        customerEventId: zod_1.z.string().optional(),
    }),
});
