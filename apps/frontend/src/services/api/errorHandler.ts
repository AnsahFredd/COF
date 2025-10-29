/**
 * @description
 * Provide centralized utility function to normalize
 * and simplify error handling for Axios requests
 *
 * Convert raw Axios or JavaScript errors into a consistent `ApiError` shape
 * that can be safely used throughout the web app for user authentication or logging.
 */

import axios, { type AxiosError } from 'axios';
import type { ApiError } from 'src/interface';

export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{
      message?: string;
      error?: string;
      errors?: Record<string, string[]>;
    }>;
    return {
      message:
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        axiosError.message ||
        'An error occurred',
      statusCode: axiosError.response?.status || 500,
      errors: axiosError.response?.data?.errors,
      success: false,
    };
  }
  if (error instanceof Error) return { message: error.message, statusCode: 500, success: false };
  return {
    message: 'An unexpected error occurred',
    statusCode: 500,
    success: false,
  };
};
