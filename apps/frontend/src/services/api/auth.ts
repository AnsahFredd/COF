/**
 * @file auth.ts
 * @description Authentication API endpoints
 */

import { api } from './api';
import { tokenManager } from 'src/helpers/tokenManager';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
}

export interface CurrentUser {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  joinDate: string;
}

export const authService = {
  /**
   * Login user
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);

    // Store tokens
    if (response.token) {
      tokenManager.setToken(response.token);
    }
    if (response.refreshToken) {
      tokenManager.setRefreshToken(response.refreshToken);
    }

    return response;
  },

  /**
   * Register new user
   */
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', userData);

    // Store tokens
    if (response.token) {
      tokenManager.setToken(response.token);
    }
    if (response.refreshToken) {
      tokenManager.setRefreshToken(response.refreshToken);
    }

    return response;
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } finally {
      // Clear tokens regardless of API response
      tokenManager.clearTokens();
    }
  },

  /**
   * Get current authenticated user
   */
  getCurrentUser: async (): Promise<CurrentUser> => {
    return api.get<CurrentUser>('/auth/me');
  },

  /**
   * Refresh access token
   */
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/refresh', { refreshToken });

    // Update tokens
    if (response.token) {
      tokenManager.setToken(response.token);
    }
    if (response.refreshToken) {
      tokenManager.setRefreshToken(response.refreshToken);
    }

    return response;
  },

  /**
   * Request password reset
   */
  forgotPassword: async (email: string): Promise<{ success: boolean; message: string }> => {
    return api.post<{ success: boolean; message: string }>('/auth/forgot-password', { email });
  },

  /**
   * Reset password with token
   */
  resetPassword: async (
    token: string,
    password: string,
    confirmPassword: string
  ): Promise<{ success: boolean; message: string }> => {
    return api.post<{ success: boolean; message: string }>('/auth/reset-password', {
      token,
      password,
      confirmPassword,
    });
  },

  /**
   * Change password (authenticated user)
   */
  changePassword: async (
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; message: string }> => {
    return api.post<{ success: boolean; message: string }>('/auth/change-password', {
      currentPassword,
      newPassword,
    });
  },

  /**
   * Verify email
   */
  verifyEmail: async (token: string): Promise<{ success: boolean; message: string }> => {
    return api.post<{ success: boolean; message: string }>('/auth/verify-email', { token });
  },
};

export default authService;
