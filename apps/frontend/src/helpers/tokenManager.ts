// src/utils/storage/tokenManager.ts

import { env } from 'src/config/env';

// Storage keys from environment
const TOKEN_KEY = env.TOKEN_KEY;
const REFRESH_TOKEN_KEY = env.REFRESH_TOKEN_KEY;
const USER_KEY = 'user_data';

/**
 * Token Manager Utility
 * Handles all token and user data storage operations
 */
export const tokenManager = {
  /**
   * Get access token from localStorage
   */
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Set access token in localStorage
   */
  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  /**
   * Get refresh token from localStorage
   */
  getRefreshToken: (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  /**
   * Set refresh token in localStorage
   */
  setRefreshToken: (token: string): void => {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  /**
   * Clear both access and refresh tokens
   */
  clearTokens: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  /**
   * Check if user has a valid token
   */
  hasToken: (): boolean => {
    return !!tokenManager.getToken();
  },

  /**
   * Save both tokens at once
   */
  saveTokens: (accessToken: string, refreshToken: string): void => {
    tokenManager.setToken(accessToken);
    tokenManager.setRefreshToken(refreshToken);
  },

  /**
   * Get user data from localStorage
   */
  getUser: <T = unknown>(): T | null => {
    const userData = localStorage.getItem(USER_KEY);
    if (!userData) return null;

    try {
      return JSON.parse(userData) as T;
    } catch (error) {
      console.error('Failed to parse user data:', error);
      return null;
    }
  },

  /**
   * Set user data in localStorage
   */
  setUser: <T = unknown>(user: T): void => {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  },

  /**
   * Save complete auth data (tokens + user)
   */
  saveAuthData: <T = unknown>(accessToken: string, refreshToken: string, user: T): void => {
    tokenManager.saveTokens(accessToken, refreshToken);
    tokenManager.setUser(user);
  },

  /**
   * Check if user data exists
   */
  hasUserData: (): boolean => {
    return !!localStorage.getItem(USER_KEY);
  },
};
