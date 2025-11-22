import { useMemo, useState } from 'react';
import type { User } from 'src/services/api/users';

export interface UserFilters {
  search: string;
  role: string | null;
  emailVerified: boolean | null;
}

export const useUserFilters = (users: User[] | undefined) => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [emailVerifiedFilter, setEmailVerifiedFilter] = useState<boolean | null>(null);

  // Extract unique roles from backend data
  const uniqueRoles = useMemo(() => {
    if (!users) return [];
    const roles = new Set(users.map((user) => user.role));
    return Array.from(roles).sort();
  }, [users]);

  const filteredUsers = useMemo(() => {
    if (!users) return [];

    return users.filter((user) => {
      // Search filter - check first name, last name, and email
      const searchLower = search.toLowerCase();
      const matchesSearch =
        !search ||
        user.firstName.toLowerCase().includes(searchLower) ||
        user.lastName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower);

      // Role filter
      const matchesRole = !roleFilter || user.role === roleFilter;

      // Email verified filter
      const matchesEmailVerified =
        emailVerifiedFilter === null || user.isEmailVerified === emailVerifiedFilter;

      return matchesSearch && matchesRole && matchesEmailVerified;
    });
  }, [users, search, roleFilter, emailVerifiedFilter]);

  const resetFilters = () => {
    setSearch('');
    setRoleFilter(null);
    setEmailVerifiedFilter(null);
  };

  return {
    // Filter state
    search,
    roleFilter,
    emailVerifiedFilter,
    uniqueRoles,
    // Filter setters
    setSearch,
    setRoleFilter,
    setEmailVerifiedFilter,
    // Filtered data
    filteredUsers,
    // Utility
    resetFilters,
    hasActiveFilters: search !== '' || roleFilter !== null || emailVerifiedFilter !== null,
  };
};
