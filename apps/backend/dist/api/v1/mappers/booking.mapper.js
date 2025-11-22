"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBookingSummary = exports.toPublicBookings = exports.toPublicBooking = void 0;
const user_mapper_1 = require("./user.mapper");
/**
 * Maps a Booking entity to a public response object
 */
const toPublicBooking = (booking) => ({
    id: booking.id,
    userId: booking.userId,
    eventType: booking.eventType,
    eventDate: booking.eventDate,
    eventLocation: booking.eventLocation,
    budget: booking.budget,
    message: booking.message,
    status: booking.status,
    customerEventId: booking.customerEventId,
    createdAt: booking.createdAt,
    updatedAt: booking.updatedAt,
    // Include user data if it was loaded in the query
    ...(booking.user && { user: (0, user_mapper_1.toPublicUser)(booking.user) }),
});
exports.toPublicBooking = toPublicBooking;
/**
 * Maps multiple bookings to public response objects
 */
const toPublicBookings = (bookings) => bookings.map(exports.toPublicBooking);
exports.toPublicBookings = toPublicBookings;
/**
 * Maps a booking to a minimal summary (for lists)
 */
const toBookingSummary = (booking) => ({
    id: booking.id,
    eventType: booking.eventType,
    eventDate: booking.eventDate,
    eventLocation: booking.eventLocation,
    status: booking.status,
    createdAt: booking.createdAt,
});
exports.toBookingSummary = toBookingSummary;
