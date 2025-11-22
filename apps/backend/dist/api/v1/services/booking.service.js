"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const booking_repository_1 = require("../repositories/booking.repository");
exports.bookingService = {
    createBooking: async (data) => {
        const result = await booking_repository_1.bookingRepository.create(data);
        return result;
    },
    getAllBookings: async (userId) => {
        const result = await booking_repository_1.bookingRepository.findAll(userId);
        return result;
    },
    getBookingById: async (id) => {
        const result = await booking_repository_1.bookingRepository.findById(id);
        if (!result)
            throw new Error('Booking Not Found!');
        return result;
    },
    updateBooking: async (id, data) => {
        const booking = await booking_repository_1.bookingRepository.findById(id);
        if (!booking)
            throw new Error('Booking Not Found!');
        const result = await booking_repository_1.bookingRepository.update(id, data);
        return result;
    },
    deleteBooking: async (id) => {
        const booking = await booking_repository_1.bookingRepository.findById(id);
        if (!booking)
            throw new Error('Booking Not Found!');
        const result = await booking_repository_1.bookingRepository.delete(id);
        return result;
    },
};
