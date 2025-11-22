import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';
import { uploadFile } from '../../../libs/storage';
import { toPublicUser, toPublicUsers } from '../mappers/user.mapper';

export const userController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userService.createUser(req.body);
      return res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: toPublicUser(result),
      });
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cursor = typeof req.query.cursor === 'string' ? req.query.cursor : undefined;
      const limit = typeof req.query.limit === 'string' ? parseInt(req.query.limit, 10) : 10;

      const result = await userService.getAllUsers({ cursor, limit });

      return res.status(200).json({
        success: true,
        data: toPublicUsers(result.data),
        meta: result.meta,
      });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await userService.getUserById(id);
      return res.status(200).json({
        success: true,
        data: toPublicUser(result),
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await userService.updateUser(id, req.body);
      return res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: toPublicUser(result),
      });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await userService.deleteUser(id);
      return res.status(200).json({
        success: true,
        message: 'User deleted successfully',
        data: toPublicUser(result),
      });
    } catch (error) {
      next(error);
    }
  },

  getCurrentUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not authenticated',
        });
      }

      const result = await userService.getUserById(req.user.id);
      return res.status(200).json({
        success: true,
        data: toPublicUser(result),
      });
    } catch (error) {
      next(error);
    }
  },

  changePassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      await userService.changePassword(userId, currentPassword, newPassword);

      return res.status(200).json({
        success: true,
        message: 'Password updated successfully',
      });
    } catch (error) {
      next(error);
    }
  },

  uploadAvatar: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
      }

      // Import dynamically to avoid circular dependency issues if any, though standard import is fine usually.
      // Using standard import at top is better, but for this specific insertion:
      const avatarUrl = await uploadFile(file, 'avatars');

      // Update user with new avatar URL
      // Assuming updateUser handles partial updates and there is an avatar field.
      // If not, we might need to add it to the schema, but for now we assume it exists or we just return the URL.
      // Let's try to update.
      await userService.updateUser(userId, { avatar: avatarUrl });

      return res.status(200).json({
        success: true,
        message: 'Avatar uploaded successfully',
        data: { avatarUrl },
      });
    } catch (error) {
      next(error);
    }
  },
};
