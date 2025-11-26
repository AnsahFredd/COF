"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("src/config");
const AppError_1 = require("src/utils/AppError");
/**
 * Middleware to authenticate requests using JWT
 * Extracts token from Authorization header and verifies it
 */
const authenticate = async (req, res, next) => {
    try {
        // 1. Extract token from header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError_1.AppError('No token provided', 401);
        }
        const token = authHeader.split(' ')[1];
        // 2. Verify token
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret);
        // 3. Attach user to request
        req.user = {
            id: decoded.id,
            role: decoded.role,
        };
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return next(new AppError_1.AppError('Invalid token', 401));
        }
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return next(new AppError_1.AppError('Token expired', 401));
        }
        next(error);
    }
};
exports.authenticate = authenticate;
/**
 * Middleware factory to require specific roles
 * Must be used after authenticate middleware
 */
const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new AppError_1.AppError('Authentication required', 401));
        }
        if (!allowedRoles.includes(req.user.role)) {
            return next(new AppError_1.AppError('Insufficient permissions', 403));
        }
        next();
    };
};
exports.requireRole = requireRole;
