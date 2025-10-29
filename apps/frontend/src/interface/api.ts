import { type PaginationParams } from './common';

// API Response Structure
export interface ApiSuccessResponse<T = unknown> {
  success: true;
  message: string;
  data: T;
  meta?: PaginationParams;
  timestamp?: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: ValidationError[];
  error?: string;
  statusCode: number;
  timestamp?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

// HTTP Methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Request Config
export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  timeoute?: number;
}

// Query Params
export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  [key: string]: unknown;
}

// API Endpoints
export interface ApiEndpoints {
  auth: {
    login: string;
    logout: string;
    refresh: string;
    forgotPassword: string;
    resetPassword: string;
  };
  events: {
    list: string;
    detail: string;
    create: string;
    update: string;
    delete: string;
  };
  bookings: {
    list: string;
    detail: string;
    create: string;
    cancel: string;
  };
  users: {
    profile: string;
    updateProfile: string;
    changePassword: string;
  };
  media: {
    upload: string;
    delete: string;
  };
  notifications: {
    list: string;
    markAsRead: string;
  };
  settings: {
    get: string;
    update: string;
  };
}

// Response status
export type ResponseStatus = 'success' | 'laoding' | 'error' | 'idle';

// Axios Response Wrapper (for type safety)
export interface AxiosRequestState<T = unknown> {
  data: T | null;
  error: string | null;
  status: ResponseStatus;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}
