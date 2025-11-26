"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const booking_repository_1 = require("../repositories/booking.repository");
const core_1 = require("../../../libs/cache/core");
const AppError_1 = require("src/utils/AppError");
exports.bookingService = {
    createBooking: async (data) => {
        const result = await booking_repository_1.bookingRepository.create(data);
        return result;
    },
    getAllBookings: async (options = {}) => {
        const result = await booking_repository_1.bookingRepository.findAll(options);
        return result;
    },
    getBookingById: async (id) => {
        const cacheKey = `booking:${id}`;
        if ((0, core_1.isConnected)()) {
            try {
                const cached = await (0, core_1.getClient)().get(cacheKey);
                if (cached)
                    return JSON.parse(cached);
            }
            catch (err) {
                console.error('Cache get error', err);
            }
        }
        const result = await booking_repository_1.bookingRepository.findById(id);
        if (!result)
            throw new AppError_1.AppError('Booking Not Found!', 404);
        if ((0, core_1.isConnected)()) {
            try {
                await (0, core_1.getClient)().set(cacheKey, JSON.stringify(result), 'EX', 3600);
            }
            catch (err) {
                console.error('Cache set error', err);
            }
        }
        return result;
    },
    updateBooking: async (id, data) => {
        const booking = await booking_repository_1.bookingRepository.findById(id);
        if (!booking)
            throw new AppError_1.AppError('Booking Not Found!', 404);
        const result = await booking_repository_1.bookingRepository.update(id, data);
        if ((0, core_1.isConnected)()) {
            (0, core_1.getClient)().del(`booking:${id}`);
        }
        return result;
    },
    deleteBooking: async (id) => {
        const booking = await booking_repository_1.bookingRepository.findById(id);
        if (!booking)
            throw new AppError_1.AppError('Booking Not Found!', 404);
        const result = await booking_repository_1.bookingRepository.delete(id);
        if ((0, core_1.isConnected)()) {
            (0, core_1.getClient)().del(`booking:${id}`);
        }
        return result;
    },
};
