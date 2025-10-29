import { useQuery } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { tokenManager } from 'src/helpers/storage/tokenManager';
import { queryKeys } from 'src/lib/reactQuery';

/**
 * useCurrentUser - fetch current user if token exists
 */

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: authApi.getCurrentUser,
    enabled: tokenManager.hasToken(),
    retry: false,
    staleTime: Infinity,
  });

  return {
    user: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
};
