import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import type { ForgotPasswordRequest } from '../interface';

/**
 * useForgotPassword - sends reset email; no redirect (UI should notify)
 */

export const useForgotPassword = () => {
  const mutation = useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authApi.forgotPassword(data),
  });

  return {
    sendResetEmail: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
  };
};
