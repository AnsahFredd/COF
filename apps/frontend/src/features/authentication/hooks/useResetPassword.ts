import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { ROUTES } from 'src/constants/routes';
import type { ResetPasswordRequest } from '../interface';

/**
 * useResetPassword - completes password reset and redirects to login
 */

export const useResetPassword = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: ResetPasswordRequest) => authApi.resetPassword(data),
    onSuccess: () => {
      // redirect to login after successful reset
      navigate(ROUTES.LOGIN);
    },
  });

  return {
    resetPassword: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
