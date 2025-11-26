/**
 * @description
 * The backbone of API communication system
 * Manages the authentication automatically by:
 * - Attaching the Bearer token to each request
 * - Handling 401 errors by refreshing tokens
 * - Retry failed requests after refresh
 * - Redirecting to the login route if refresh fails
 */

import axios, { type AxiosInstance, type InternalAxiosRequestConfig, AxiosError } from 'axios';
import { env } from 'src/config/env';
import { ROUTES } from 'src/constants/routes';
import { tokenManager } from 'src/helpers/tokenManager';

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => (error ? prom.reject(error) : prom.resolve(token)));
  failedQueue = [];
};

// Axios Instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: env.API_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  withCredentials: true,
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenManager.getToken();
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    if (env.IS_DEVELOPMENT) {
      console.warn('API Request', config.method, config.url, config.data);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
  (res) => {
    if (env.IS_DEVELOPMENT) {
      console.warn('API Response', res.status, res.config.url, res.data);
    }
    return res;
  },
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // 401: Token refresh logic
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      if (originalRequest.url?.includes('/auth/refresh')) {
        tokenManager.clearTokens();
        window.location.href = ROUTES.LOGIN;
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => failedQueue.push({ resolve, reject }))
          .then(() => apiClient(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;
      const refreshToken = tokenManager.getRefreshToken();

      if (!refreshToken) {
        tokenManager.clearTokens();
        window.location.href = ROUTES.LOGIN;
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(`${env.API_URL}/auth/refresh`, {
          refreshToken,
        });
        const { token, refreshToken: newRefreshToken } = res.data;
        tokenManager.setToken(token);
        if (newRefreshToken) tokenManager.setRefreshToken(newRefreshToken);
        if (originalRequest.headers) originalRequest.headers.Authorization = `Bearer ${token}`;
        processQueue(null, token);
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        tokenManager.clearTokens();
        window.location.href = ROUTES.LOGIN;
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Auth header utilities
export const setAuthHeader = (token: string) => {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
export const removeAuthHeader = () => {
  delete apiClient.defaults.headers.common['Authorization'];
};
export const isAuthenticated = () => tokenManager.hasToken();
