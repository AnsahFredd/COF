/**
 * @file users.ts
 * @description User management API endpoints
 */

import { api } from './api';

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  marketing: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'USER' | 'ADMIN';
  isEmailVerified: boolean;
  notificationPreferences?: NotificationPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  data: User[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'organizer';
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: 'user' | 'organizer' | 'admin';
  status?: 'active' | 'inactive';
}

export const usersService = {
  /**
   * Get paginated users list with optional search
   */
  getUsers: async (
    cursor?: string,
    limit = 10,
    search = ''
  ): Promise<{ data: User[]; meta: { nextCursor: string | null; hasMore: boolean } }> => {
    const params = new URLSearchParams({
      limit: limit.toString(),
      ...(cursor && { cursor }),
      ...(search && { search }),
    });
    const response = await api.get<{
      success: boolean;
      data: User[];
      meta: { nextCursor: string | null; hasMore: boolean };
    }>(`/users?${params}`);
    return {
      data: response.data,
      meta: response.meta,
    };
  },

  /**
   * Get user by ID
   */
  getUserById: async (id: string): Promise<User> => {
    const response = await api.get<{ success: boolean; data: User }>(`/users/${id}`);
    return response.data;
  },

  /**
   * Create new user
   */
  createUser: async (userData: CreateUserData): Promise<User> => {
    return api.post<User>('/users', userData);
  },

  /**
   * Update user
   */
  updateUser: async (id: number, userData: UpdateUserData): Promise<User> => {
    return api.put<User>(`/users/${id}`, userData);
  },

  /**
   * Delete user
   */
  deleteUser: async (id: string): Promise<{ success: boolean }> => {
    return api.delete<{ success: boolean }>(`/users/${id}`);
  },
};

export default usersService;
