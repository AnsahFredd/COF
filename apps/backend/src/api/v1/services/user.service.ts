import { Prisma } from '@prisma/client';
import { userRepository } from '../repositories/user.repository';
import bcrypt from 'bcryptjs';
import { getClient, isConnected } from '../../../libs/cache/core';
import { AppError } from 'src/utils/AppError';

export const userService = {
  createUser: async (data: Prisma.UserCreateInput) => {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new AppError('User with this email already exists', 400);
    }

    // Hash password if provided (though usually handled in auth service, good to have here if creating user directly)
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    return await userRepository.create(data);
  },

  getAllUsers: async (options: { cursor?: string; limit?: number; filter?: any } = {}) => {
    return await userRepository.findAll(options);
  },

  getUserById: async (id: string) => {
    const cacheKey = `user:${id}`;
    if (isConnected()) {
      try {
        const cached = await getClient().get(cacheKey);
        if (cached) return JSON.parse(cached);
      } catch (err) {
        console.error('Cache get error', err);
      }
    }

    const user = await userRepository.findById(id);
    if (!user) throw new AppError('User not found', 404);

    if (isConnected()) {
      try {
        await getClient().set(cacheKey, JSON.stringify(user), 'EX', 3600);
      } catch (err) {
        console.error('Cache set error', err);
      }
    }
    return user;
  },

  updateUser: async (id: string, data: Prisma.UserUpdateInput) => {
    const user = await userRepository.findById(id);
    if (!user) throw new AppError('User not found', 404);

    if (data.password && typeof data.password === 'string') {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    const result = await userRepository.update(id, data);
    if (isConnected()) {
      getClient().del(`user:${id}`);
    }
    return result;
  },

  changePassword: async (id: string, oldPassword: string, newPassword: string) => {
    const user = await userRepository.findById(id);
    if (!user) throw new AppError('User not found', 404);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new AppError('Password do not match', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const result = await userRepository.update(id, { password: hashedPassword });
    if (isConnected()) {
      getClient().del(`user:${id}`);
    }
    return result;
  },

  deleteUser: async (id: string) => {
    const user = await userRepository.findById(id);
    if (!user) throw new AppError('User not found', 404);
    const result = await userRepository.delete(id);
    if (isConnected()) {
      getClient().del(`user:${id}`);
    }
    return result;
  },
};
