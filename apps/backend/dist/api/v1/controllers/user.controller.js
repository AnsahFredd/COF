"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
exports.userController = {
    create: async (req, res, next) => {
        try {
            const result = await user_service_1.userService.createUser(req.body);
            // Remove password from response
            const { password: _password, ...userWithoutPassword } = result;
            return res.status(201).json({
                success: true,
                message: 'User created successfully',
                data: userWithoutPassword,
            });
        }
        catch (error) {
            next(error);
        }
    },
    getAll: async (req, res, next) => {
        try {
            const result = await user_service_1.userService.getAllUsers();
            // Remove passwords from response
            const usersWithoutPasswords = result.map((user) => {
                const { password: _password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            });
            return res.status(200).json({
                success: true,
                data: usersWithoutPasswords,
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
            // Remove password from response
            const { password: _password, ...userWithoutPassword } = result;
            return res.status(200).json({
                success: true,
                data: userWithoutPassword,
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
            // Remove password from response
            const { password: _password, ...userWithoutPassword } = result;
            return res.status(200).json({
                success: true,
                message: 'User updated successfully',
                data: userWithoutPassword,
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
            // Remove password from response
            const { password: _password, ...userWithoutPassword } = result;
            return res.status(200).json({
                success: true,
                message: 'User deleted successfully',
                data: userWithoutPassword,
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
            // Remove password from response
            const { password: _password, ...userWithoutPassword } = result;
            return res.status(200).json({
                success: true,
                data: userWithoutPassword,
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
};
