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

        /* eslint-disable no-console */
        console.log('User role:', res.user.role);
        console.log(
          'Redirecting to:',
          res.user.role === 'ADMIN' ? ROUTES.ADMIN.DASHBOARD : ROUTES.HOME
        );

        // Role-based redirect
        if (res.user.role === 'ADMIN') {
          navigate(ROUTES.ADMIN.DASHBOARD);
        } else {
          // Regular users go to home for now (no user dashboard yet)
          navigate(ROUTES.HOME);
        }
      } else {
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
        navigate(ROUTES.HOME);
      }
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
