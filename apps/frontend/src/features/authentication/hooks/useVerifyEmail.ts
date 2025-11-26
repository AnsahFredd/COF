import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { ROUTES } from 'src/constants/routes';
import type { VerifyEmailRequest } from '../interface';

/**
 * useVerifyEmail - verifies email and redirects to dashboard on success
 */

export const useVerifyEmail = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: VerifyEmailRequest) => authApi.verifyEmail(data),
    onSuccess: () => {
      setTimeout(() => {
        // Redirect to home (no user dashboard yet)
        navigate(ROUTES.HOME);
      }, 1500);
    },
  });

  return {
    verifyEmail: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
  };
};
