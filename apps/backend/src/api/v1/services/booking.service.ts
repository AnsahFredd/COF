import { bookingRepository } from '../repositories/booking.repository';
import { Prisma } from '@prisma/client';
import { getClient, isConnected } from '../../../libs/cache/core';
import { AppError } from 'src/utils/AppError';

export const bookingService = {
  createBooking: async (data: Prisma.BookingCreateInput) => {
    const result = await bookingRepository.create(data);
    return result;
  },
  getAllBookings: async (
    options: { cursor?: string; limit?: number; userId?: string; filter?: any } = {}
  ) => {
    const result = await bookingRepository.findAll(options);
    return result;
  },
  getBookingById: async (id: string) => {
    const cacheKey = `booking:${id}`;
    if (isConnected()) {
      try {
        const cached = await getClient().get(cacheKey);
        if (cached) return JSON.parse(cached);
      } catch (err) {
        console.error('Cache get error', err);
      }
    }

    const result = await bookingRepository.findById(id);
    if (!result) throw new AppError('Booking Not Found!', 404);

    if (isConnected()) {
      try {
        await getClient().set(cacheKey, JSON.stringify(result), 'EX', 3600);
      } catch (err) {
        console.error('Cache set error', err);
      }
    }
    return result;
  },
  updateBooking: async (id: string, data: Prisma.BookingUpdateInput) => {
    const booking = await bookingRepository.findById(id);
    if (!booking) throw new AppError('Booking Not Found!', 404);
    const result = await bookingRepository.update(id, data);
    if (isConnected()) {
      getClient().del(`booking:${id}`);
    }
    return result;
  },
  deleteBooking: async (id: string) => {
    const booking = await bookingRepository.findById(id);
    if (!booking) throw new AppError('Booking Not Found!', 404);
    const result = await bookingRepository.delete(id);
    if (isConnected()) {
      getClient().del(`booking:${id}`);
    }
    return result;
  },
};
