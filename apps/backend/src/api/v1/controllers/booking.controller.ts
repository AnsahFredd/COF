import { Request, Response, NextFunction } from 'express';
import { bookingService } from '../services/booking.service';

export const bookingController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await bookingService.createBooking(req.body);
      return res.status(201).json({
        success: true,
        message: 'Booking created successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = typeof req.query.userId === 'string' ? req.query.userId : undefined;
      const cursor = typeof req.query.cursor === 'string' ? req.query.cursor : undefined;
      const limit = typeof req.query.limit === 'string' ? parseInt(req.query.limit, 10) : 10;

      const result = await bookingService.getAllBookings({ userId, cursor, limit });

      return res.status(200).json({
        success: true,
        data: result.data,
        meta: result.meta,
      });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await bookingService.getBookingById(id);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await bookingService.updateBooking(id, req.body);
      return res.status(200).json({
        success: true,
        message: 'Booking updated successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await bookingService.deleteBooking(id);
      return res.status(200).json({
        success: true,
        message: 'Booking deleted successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};
