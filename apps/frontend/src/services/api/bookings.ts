/**
 * @file bookings.ts
 * @description Booking management API endpoints
 */

import { api } from './api';

// Match backend Prisma schema
export interface Booking {
  id: string;
  userId: string;
  eventType: 'WEDDING' | 'CORPORATE' | 'BIRTHDAY' | 'ANNIVERSARY' | 'PARTY' | 'OTHER';
  eventDate: string;
  eventLocation: string;
  budget?: string;
  message?: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  customerEventId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingData {
  eventType: 'WEDDING' | 'CORPORATE' | 'BIRTHDAY' | 'ANNIVERSARY' | 'PARTY' | 'OTHER';
  eventDate: string;
  eventLocation: string;
  budget?: string;
  message?: string;
}

export interface UpdateBookingData {
  eventType?: 'WEDDING' | 'CORPORATE' | 'BIRTHDAY' | 'ANNIVERSARY' | 'PARTY' | 'OTHER';
  eventDate?: string;
  eventLocation?: string;
  budget?: string;
  message?: string;
  status?: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
}

export const bookingsService = {
  /**
   * Get paginated bookings list with optional status filter
   */
  getBookings: async (
    cursor?: string,
    limit = 10,
    status = ''
  ): Promise<{ data: Booking[]; meta: { nextCursor: string | null; hasMore: boolean } }> => {
    const params = new URLSearchParams({
      limit: limit.toString(),
      ...(cursor && { cursor }),
      ...(status && { status }),
    });
    const response = await api.get<{
      success: boolean;
      data: Booking[];
      meta: { nextCursor: string | null; hasMore: boolean };
    }>(`/bookings?${params}`);
    return {
      data: response.data,
      meta: response.meta,
    };
  },

  /**
   * Get booking by ID
   */
  getBookingById: async (id: string): Promise<Booking> => {
    const response = await api.get<{ success: boolean; data: Booking }>(`/bookings/${id}`);
    return response.data;
  },

  /**
   * Update booking status
   */
  updateBookingStatus: async (
    id: string,
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
  ): Promise<Booking> => {
    const response = await api.patch<{ success: boolean; data: Booking }>(`/bookings/${id}`, {
      status,
    });
    return response.data;
  },

  /**
   * Delete booking
   */
  deleteBooking: async (id: string): Promise<{ success: boolean }> => {
    return api.delete<{ success: boolean }>(`/bookings/${id}`);
  },
};

export default bookingsService;
