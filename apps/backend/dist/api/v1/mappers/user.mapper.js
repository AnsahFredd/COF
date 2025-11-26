"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPublicUsers = exports.toAuthUser = exports.toPublicUser = void 0;
/**
 * Maps a User entity to a public-safe response object
 * Removes sensitive fields like password, tokens, etc.
 */
const toPublicUser = (user) => ({
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
exports.toPublicUser = toPublicUser;
/**
 * Maps a User entity to an authentication response
 * Includes only essential fields needed after login
 */
const toAuthUser = (user) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    isEmailVerified: user.isEmailVerified,
});
exports.toAuthUser = toAuthUser;
/**
 * Maps multiple users to public-safe response objects
 */
const toPublicUsers = (users) => users.map(exports.toPublicUser);
exports.toPublicUsers = toPublicUsers;
