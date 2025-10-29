import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { tokenManager } from 'src/helpers/storage/tokenManager';
import { ROUTES } from 'src/constants/routes';

/**
 * useLogout - calls backend logout (best-effort), clears tokens & cache, redirects home
 */

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        await authApi.logout();
      } catch {
        // ignore network errors; still clear local session
      }
    },
    onSuccess: () => {
      tokenManager.clearTokens();
      queryClient.clear();
      navigate(ROUTES.LOGIN);
    },
    onError: () => {
      tokenManager.clearTokens();
      queryClient.clear();
      navigate(ROUTES.LOGIN);
    },
  });

  return {
    logout: mutation.mutateAsync,
    isLoading: mutation.isPaused,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
