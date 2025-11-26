import { api } from './api';
import type { User } from './users';

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  marketing: boolean;
}

export const settingsService = {
  updateProfile: async (userId: string, data: UpdateProfileData) => {
    const response = await api.patch<{ success: boolean; data: User }>(`/users/${userId}`, data);
    return response.data;
  },

  changePassword: async (data: ChangePasswordData) => {
    const response = await api.post<{ success: boolean; message: string }>(
      '/users/change-password',
      data
    );
    return response;
  },

  updatePreferences: async (userId: string, preferences: NotificationPreferences) => {
    const response = await api.patch<{ success: boolean; data: User }>(`/users/${userId}`, {
      notificationPreferences: preferences,
    });
    return response.data;
  },
};
