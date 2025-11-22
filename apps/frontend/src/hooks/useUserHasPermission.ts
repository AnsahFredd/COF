import { useMemo } from 'react';
import { ROLE_PERMISSIONS } from '../constants/permissions';

// Mock user hook - replace with actual auth hook when available
const useUser = () => {
  // TODO: Replace with actual user data from context/store
  return {
    user: {
      role: 'admin', // Default to admin for now
    },
  };
};

export const useUserHasPermission = (permission: string): boolean => {
  const { user } = useUser();

  return useMemo(() => {
    if (!user || !user.role) return false;

    const userPermissions = ROLE_PERMISSIONS[user.role as keyof typeof ROLE_PERMISSIONS] || [];
    return userPermissions.includes(permission);
  }, [user, permission]);
};
