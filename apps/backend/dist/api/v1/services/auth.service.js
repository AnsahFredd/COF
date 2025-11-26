"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("src/config/database");
const config_1 = require("src/config");
const AppError_1 = require("src/utils/AppError");
exports.authService = {
    register: async (data) => {
        const { firstName, lastName, email, password } = data;
        // 1. Check if user exists
        const existingUser = await database_1.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new AppError_1.AppError('Email already in use', 400);
        }
        // 2. Hash password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // 3. Create user
        const user = await database_1.prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
            },
        });
        return user;
    },
    login: async (data) => {
        const { email, password } = data;
        // 1. Find user
        const user = await database_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new AppError_1.AppError('Invalid email or password', 401);
        }
        // 2. Validate password
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new AppError_1.AppError('Invalid email or password', 401);
        }
        // 3. Generate access token (1 day)
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            role: user.role,
        }, config_1.config.jwtSecret, { expiresIn: config_1.config.jwtExpiresIn || '1d' });
        // 4. Generate refresh token (7 days)
        const refreshToken = jsonwebtoken_1.default.sign({
            id: user.id,
            type: 'refresh',
        }, config_1.config.jwtSecret, { expiresIn: '7d' });
        // 5. Store refresh token in database
        await database_1.prisma.user.update({
            where: { id: user.id },
            data: { refreshToken },
        });
        // 6. Return safe user object + tokens
        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },
            token,
            refreshToken,
        };
    },
};
