"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCustomerEventSummary = exports.toPublicCustomerEvents = exports.toPublicCustomerEvent = void 0;
const user_mapper_1 = require("./user.mapper");
/**
 * Maps a CustomerEvent entity to a public response object
 */
const toPublicCustomerEvent = (event) => ({
    id: event.id,
    fullName: event.fullName,
    email: event.email,
    phone: event.phone,
    eventType: event.eventType,
    eventDate: event.eventDate,
    eventLocation: event.eventLocation,
    message: event.message,
    budget: event.budget,
    preferredContactMethod: event.preferredContactMethod,
    status: event.status,
    userId: event.userId,
    assignedTo: event.assignedTo,
    notes: event.notes,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
    // Include user data if it was loaded in the query
    ...(event.user && { user: (0, user_mapper_1.toPublicUser)(event.user) }),
    // Include bookings count if loaded
    ...(event.bookings && { bookingsCount: event.bookings.length }),
});
exports.toPublicCustomerEvent = toPublicCustomerEvent;
/**
 * Maps multiple customer events to public response objects
 */
const toPublicCustomerEvents = (events) => events.map(exports.toPublicCustomerEvent);
exports.toPublicCustomerEvents = toPublicCustomerEvents;
/**
 * Maps a customer event to a minimal summary (for admin lists)
 */
const toCustomerEventSummary = (event) => ({
    id: event.id,
    fullName: event.fullName,
    email: event.email,
    phone: event.phone,
    eventType: event.eventType,
    eventDate: event.eventDate,
    status: event.status,
    createdAt: event.createdAt,
});
exports.toCustomerEventSummary = toCustomerEventSummary;
