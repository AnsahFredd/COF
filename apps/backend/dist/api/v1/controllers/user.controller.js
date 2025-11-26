"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
const storage_1 = require("../../../libs/storage");
const user_mapper_1 = require("../mappers/user.mapper");
exports.userController = {
    create: async (req, res, next) => {
        try {
            const result = await user_service_1.userService.createUser(req.body);
            return res.status(201).json({
                success: true,
                message: 'User created successfully',
                data: (0, user_mapper_1.toPublicUser)(result),
            });
        }
        catch (error) {
            next(error);
        }
    },
    getAll: async (req, res, next) => {
        try {
            const cursor = typeof req.query.cursor === 'string' ? req.query.cursor : undefined;
            const limit = typeof req.query.limit === 'string' ? parseInt(req.query.limit, 10) : 10;
            const result = await user_service_1.userService.getAllUsers({ cursor, limit });
            return res.status(200).json({
                success: true,
                data: (0, user_mapper_1.toPublicUsers)(result.data),
                meta: result.meta,
            });
        }
        catch (error) {
            next(error);
        }
    },
    getById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await user_service_1.userService.getUserById(id);
            return res.status(200).json({
                success: true,
                data: (0, user_mapper_1.toPublicUser)(result),
            });
        }
        catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await user_service_1.userService.updateUser(id, req.body);
            return res.status(200).json({
                success: true,
                message: 'User updated successfully',
                data: (0, user_mapper_1.toPublicUser)(result),
            });
        }
        catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await user_service_1.userService.deleteUser(id);
            return res.status(200).json({
                success: true,
                message: 'User deleted successfully',
                data: (0, user_mapper_1.toPublicUser)(result),
            });
        }
        catch (error) {
            next(error);
        }
    },
    getCurrentUser: async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not authenticated',
                });
            }
            const result = await user_service_1.userService.getUserById(req.user.id);
            return res.status(200).json({
                success: true,
                data: (0, user_mapper_1.toPublicUser)(result),
            });
        }
        catch (error) {
            next(error);
        }
    },
    changePassword: async (req, res, next) => {
        try {
            const { currentPassword, newPassword } = req.body;
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            await user_service_1.userService.changePassword(userId, currentPassword, newPassword);
            return res.status(200).json({
                success: true,
                message: 'Password updated successfully',
            });
        }
        catch (error) {
            next(error);
        }
    },
    uploadAvatar: async (req, res, next) => {
        try {
            const userId = req.params.id;
            const file = req.file;
            if (!file) {
                return res.status(400).json({ success: false, message: 'No file uploaded' });
            }
            // Import dynamically to avoid circular dependency issues if any, though standard import is fine usually.
            // Using standard import at top is better, but for this specific insertion:
            const avatarUrl = await (0, storage_1.uploadFile)(file, 'avatars');
            // Update user with new avatar URL
            // Assuming updateUser handles partial updates and there is an avatar field.
            // If not, we might need to add it to the schema, but for now we assume it exists or we just return the URL.
            // Let's try to update.
            await user_service_1.userService.updateUser(userId, { avatar: avatarUrl });
            return res.status(200).json({
                success: true,
                message: 'Avatar uploaded successfully',
                data: { avatarUrl },
            });
        }
        catch (error) {
            next(error);
        }
    },
};
