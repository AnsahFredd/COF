"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_repository_1 = require("../repositories/user.repository");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.userService = {
    createUser: async (data) => {
        const existingUser = await user_repository_1.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        // Hash password if provided (though usually handled in auth service, good to have here if creating user directly)
        if (data.password) {
            const salt = await bcryptjs_1.default.genSalt(10);
            data.password = await bcryptjs_1.default.hash(data.password, salt);
        }
        return await user_repository_1.userRepository.create(data);
    },
    getAllUsers: async () => {
        return await user_repository_1.userRepository.findAll();
    },
    getUserById: async (id) => {
        const user = await user_repository_1.userRepository.findById(id);
        if (!user)
            throw new Error('User not found');
        return user;
    },
    updateUser: async (id, data) => {
        const user = await user_repository_1.userRepository.findById(id);
        if (!user)
            throw new Error('User not found');
        if (data.password && typeof data.password === 'string') {
            const salt = await bcryptjs_1.default.genSalt(10);
            data.password = await bcryptjs_1.default.hash(data.password, salt);
        }
        return await user_repository_1.userRepository.update(id, data);
    },
    changePassword: async (id, oldPassword, newPassword) => {
        const user = await user_repository_1.userRepository.findById(id);
        if (!user)
            throw new Error('User not found');
        const isMatch = await bcryptjs_1.default.compare(oldPassword, user.password);
        if (!isMatch) {
            throw new Error('Password do not match');
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, salt);
        return await user_repository_1.userRepository.update(id, { password: hashedPassword });
    },
    deleteUser: async (id) => {
        const user = await user_repository_1.userRepository.findById(id);
        if (!user)
            throw new Error('User not found');
        return await user_repository_1.userRepository.delete(id);
    },
};
