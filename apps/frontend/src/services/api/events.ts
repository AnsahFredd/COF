/**
 * @file events.ts
 * @description
 * Service for managing customer events (contact form submissions).
 * Provides CRUD operations for customer events.
 */

import { api } from './api';

export interface Event {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  message?: string;
  budget: string;
  guestCount?: number;
  preferredContactMethod: string;
  status: string;
  userId?: string;
  assignedTo?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventsResponse {
  data: Event[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateEventData {
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  message?: string;
  budget: string;
  guestCount: number;
  preferredContactMethod: string;
}

export interface UpdateEventData {
  fullName?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  eventDate?: string;
  eventLocation?: string;
  message?: string;
  budget?: string;
  guestCount?: number;
  preferredContactMethod?: string;
  status?: string;
  assignedTo?: string;
  notes?: string;
}

export const eventsService = {
  /**
   * Get paginated customer events list with optional search
   */
  async getEvents(page = 1, search = ''): Promise<EventsResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      ...(search && { search }),
    });
    return api.get<EventsResponse>(`/customer-events?${params}`);
  },

  /**
   * Get a single customer event by ID
   */
  async getEventById(id: string): Promise<Event> {
    return api.get<Event>(`/customer-events/${id}`);
  },

  /**
   * Create a new customer event
   */
  async createEvent(eventData: CreateEventData): Promise<Event> {
    return api.post<Event>('/customer-events', eventData);
  },

  /**
   * Update an existing customer event
   */
  async updateEvent(id: string, eventData: UpdateEventData): Promise<Event> {
    return api.put<Event>(`/customer-events/${id}`, eventData);
  },

  /**
   * Delete a customer event
   */
  async deleteEvent(id: string): Promise<{ success: boolean }> {
    return api.delete<{ success: boolean }>(`/customer-events/${id}`);
  },
};

export default eventsService;
