import { useCurrentUser } from './useCurrentUser';

export const useAuth = () => {
  const { user, isLoading, isError } = useCurrentUser();

  return {
    user,
    isLoading,
    isError,
    isAuthenticated: !!user,
  };
};
