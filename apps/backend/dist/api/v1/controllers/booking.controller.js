"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const booking_service_1 = require("../services/booking.service");
exports.bookingController = {
    create: async (req, res, next) => {
        try {
            const result = await booking_service_1.bookingService.createBooking(req.body);
            return res.status(201).json({
                success: true,
                message: 'Booking created successfully',
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    },
    getAll: async (req, res, next) => {
        try {
            const userId = typeof req.query.userId === 'string' ? req.query.userId : undefined;
            const result = await booking_service_1.bookingService.getAllBookings(userId);
            return res.status(200).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    },
    getById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await booking_service_1.bookingService.getBookingById(id);
            return res.status(200).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await booking_service_1.bookingService.updateBooking(id, req.body);
            return res.status(200).json({
                success: true,
                message: 'Booking updated successfully',
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await booking_service_1.bookingService.deleteBooking(id);
            return res.status(200).json({
                success: true,
                message: 'Booking deleted successfully',
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    },
};
