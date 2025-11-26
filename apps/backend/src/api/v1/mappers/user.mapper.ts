import { User } from '@prisma/client';

/**
 * Maps a User entity to a public-safe response object
 * Removes sensitive fields like password, tokens, etc.
 */
export const toPublicUser = (user: User) => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  phone: user.phone,
  avatar: user.avatar,
  role: user.role,
  isEmailVerified: user.isEmailVerified,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

/**
 * Maps a User entity to an authentication response
 * Includes only essential fields needed after login
 */
export const toAuthUser = (user: User) => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  role: user.role,
  avatar: user.avatar,
  isEmailVerified: user.isEmailVerified,
});

/**
 * Maps multiple users to public-safe response objects
 */
export const toPublicUsers = (users: User[]) => users.map(toPublicUser);

/**
 * Type definitions for mapped responses
 */
export type PublicUser = ReturnType<typeof toPublicUser>;
export type AuthUser = ReturnType<typeof toAuthUser>;
