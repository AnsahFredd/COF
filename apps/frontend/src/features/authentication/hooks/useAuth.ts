import { useCurrentUser } from './useCurrentUser';
import { useLogout } from './useLogout';

export const useAuth = () => {
  const { user, isLoading, isError, refetch } = useCurrentUser();
  const { logout } = useLogout();
  return {
    user,
    logout,
    isLoading,
    isError,
    isAuthenticated: !!user,
    refreshUser: refetch,
  };
};
