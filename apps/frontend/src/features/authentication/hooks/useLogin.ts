import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { tokenManager } from 'src/helpers/tokenManager';
import { queryKeys } from 'src/lib/reactQuery';
import { ROUTES } from 'src/constants/routes';
import type { LoginCredentials } from '../interface/';

/**
 * useLogin - logs user in, saves tokens, updates cache and redirects to dashboard
 */

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (res) => {
      if (res?.token && res?.refreshToken) {
        tokenManager.saveTokens(res.token, res.refreshToken);
      }

      if (res?.user) {
        queryClient.setQueryData(queryKeys.auth.me, res.user);
      } else {
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      }

      // Auto redirect to dashboard
      navigate(ROUTES.DASHBOARD);
    },
  });

  return {
    login: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSucess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
  };
};
