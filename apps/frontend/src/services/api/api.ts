/**
 * @file api.ts
 * @description
 * This module provides a centralized wrapper around Axios for making HTTP requests.
 * It uses a preconfigured Axios instance ('apiClient') and exposes convenietn async
 * method (GET, POST, PUT, PATCH, DELETE, UPLOAD) that authomatically return only the
 * response data.
 */

import { apiClient } from './client';
import type { AxiosRequestConfig } from 'axios';

export const api = {
  async get<T = any>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  },

  async post<T = any>(url: string, data?: unknown, config: AxiosRequestConfig = {}): Promise<T> {
    const response = await apiClient.post<T>(url, data, config);
    return response.data;
  },

  async put<T = any>(url: string, data?: unknown, config: AxiosRequestConfig = {}): Promise<T> {
    const response = await apiClient.put<T>(url, data, config);
    return response.data;
  },

  async patch<T = any>(url: string, data?: unknown, config: AxiosRequestConfig = {}): Promise<T> {
    const response = await apiClient.patch<T>(url, data, config);
    return response.data;
  },

  async delete<T = any>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    const response = await apiClient.delete<T>(url, config);
    return response.data;
  },

  async upload<T = any>(
    url: string,
    formData: FormData,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    const response = await apiClient.post<T>(url, formData, {
      ...config,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};

export default api;
