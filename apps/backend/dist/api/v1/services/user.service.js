"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_repository_1 = require("../repositories/user.repository");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const core_1 = require("../../../libs/cache/core");
const AppError_1 = require("src/utils/AppError");
exports.userService = {
    createUser: async (data) => {
        const existingUser = await user_repository_1.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new AppError_1.AppError('User with this email already exists', 400);
        }
        // Hash password if provided (though usually handled in auth service, good to have here if creating user directly)
        if (data.password) {
            const salt = await bcryptjs_1.default.genSalt(10);
            data.password = await bcryptjs_1.default.hash(data.password, salt);
        }
        return await user_repository_1.userRepository.create(data);
    },
    getAllUsers: async (options = {}) => {
        return await user_repository_1.userRepository.findAll(options);
    },
    getUserById: async (id) => {
        const cacheKey = `user:${id}`;
        if ((0, core_1.isConnected)()) {
            try {
                const cached = await (0, core_1.getClient)().get(cacheKey);
                if (cached)
                    return JSON.parse(cached);
            }
            catch (err) {
                console.error('Cache get error', err);
            }
        }
        const user = await user_repository_1.userRepository.findById(id);
        if (!user)
            throw new AppError_1.AppError('User not found', 404);
        if ((0, core_1.isConnected)()) {
            try {
                await (0, core_1.getClient)().set(cacheKey, JSON.stringify(user), 'EX', 3600);
            }
            catch (err) {
                console.error('Cache set error', err);
            }
        }
        return user;
    },
    updateUser: async (id, data) => {
        const user = await user_repository_1.userRepository.findById(id);
        if (!user)
            throw new AppError_1.AppError('User not found', 404);
        if (data.password && typeof data.password === 'string') {
            const salt = await bcryptjs_1.default.genSalt(10);
            data.password = await bcryptjs_1.default.hash(data.password, salt);
        }
        const result = await user_repository_1.userRepository.update(id, data);
        if ((0, core_1.isConnected)()) {
            (0, core_1.getClient)().del(`user:${id}`);
        }
        return result;
    },
    changePassword: async (id, oldPassword, newPassword) => {
        const user = await user_repository_1.userRepository.findById(id);
        if (!user)
            throw new AppError_1.AppError('User not found', 404);
        const isMatch = await bcryptjs_1.default.compare(oldPassword, user.password);
        if (!isMatch) {
            throw new AppError_1.AppError('Password do not match', 400);
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, salt);
        const result = await user_repository_1.userRepository.update(id, { password: hashedPassword });
        if ((0, core_1.isConnected)()) {
            (0, core_1.getClient)().del(`user:${id}`);
        }
        return result;
    },
    deleteUser: async (id) => {
        const user = await user_repository_1.userRepository.findById(id);
        if (!user)
            throw new AppError_1.AppError('User not found', 404);
        const result = await user_repository_1.userRepository.delete(id);
        if ((0, core_1.isConnected)()) {
            (0, core_1.getClient)().del(`user:${id}`);
        }
        return result;
    },
};
