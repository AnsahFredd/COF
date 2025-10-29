// src/lib/reactQuery.ts
import { QueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { AxiosError } from 'axios';
import { handleApiError } from '../services/api/errorHandler';

// Retry Logic
const shouldRetry = (failureCount: number, error: unknown): boolean => {
  if (failureCount >= 3) return false;

  const axiosError = error as AxiosError;
  const status = axiosError?.response?.status;

  // Do not retry for client-side or validation errors
  if (status && [400, 401, 403, 404, 422].includes(status)) {
    return false;
  }

  // Retry for 5xx server errors with exponential backoff
  return true;
};

// Query Client Config
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min
      gcTime: 1000 * 60 * 30, // 30 min
      retry: shouldRetry,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: false,
    },
    mutations: {
      onError: (error: unknown) => {
        handleApiError(error);

        notifications.show({
          title: 'Error',
          message: 'Something went wrong. Please try again.',
          color: 'red',
        });

        if (import.meta.env.DEV) {
          console.error('Mutation Error:', error);
        }
      },
    },
  },
});

// Query Keys Factory
export const queryKeys = {
  auth: {
    me: ['auth', 'me'] as const,
  },
  users: {
    list: ['users', 'list'] as const,
    detail: (id: string | number) => ['users', 'detail', id] as const,
  },
  events: {
    list: ['events', 'list'] as const,
    detail: (id: string | number) => ['events', 'detail', id] as const,
  },
  bookings: {
    list: ['bookings', 'list'] as const,
    detail: (id: string | number) => ['bookings', 'detail', id] as const,
  },
  payments: {
    list: ['payments', 'list'] as const,
  },
  notifications: {
    list: ['notifications', 'list'] as const,
  },
  settings: {
    app: ['settings', 'app'] as const,
  },
};

// Cache Utilities
export const cacheUtils = {
  invalidate: (key: unknown[]) => queryClient.invalidateQueries({ queryKey: key }),
  remove: (key: unknown[]) => queryClient.removeQueries({ queryKey: key }),
  set: (key: unknown[], data: unknown) => queryClient.setQueryData(key, data),
  get: <T>(key: unknown[]) => queryClient.getQueryData<T>(key),
  update: <T>(key: unknown[], updater: (oldData: T | undefined) => T) =>
    queryClient.setQueryData(key, updater),
  prefetch: (key: unknown[], fetcher: () => Promise<unknown>) =>
    queryClient.prefetchQuery({ queryKey: key, queryFn: fetcher }),
  clear: () => queryClient.clear(),
};

// Mutation Utilities
export const mutationUtils = {
  optimisticUpdate: async <T>(
    key: unknown[],
    updater: (oldData: T | undefined) => T,
    mutationFn: () => Promise<unknown>
  ) => {
    const previousData = queryClient.getQueryData<T>(key);
    queryClient.setQueryData<T>(key, updater(previousData));

    try {
      await mutationFn();
    } catch (error) {
      queryClient.setQueryData<T>(key, previousData);
      throw error;
    }
  },
};

// React Query DevTools
export const devToolsConfig = import.meta.env.DEV && {
  initialIsOpen: false,
  position: 'bottom-right' as const,
};
