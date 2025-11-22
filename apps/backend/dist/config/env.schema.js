"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envSchema = void 0;
const zod_1 = require("zod");
exports.envSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number().default(5000),
    NODE_ENV: zod_1.z.enum(['development', 'production', 'staging']).default('development'),
    API_VERSION: zod_1.z.string().default('v1'),
    DATABASE_URL: zod_1.z.string().url(),
    ARCJET_KEY: zod_1.z.string().refine((val) => val.startsWith('aj_') || val.startsWith('ajkey_'), {
        message: 'Must start with "aj_" or "ajkey_"',
    }),
    JWT_SECRET: zod_1.z.string().min(4),
    JWT_EXPIRES_IN: zod_1.z.string().default('7d'),
    JWT_REFRESH_SECRET: zod_1.z.string().min(4),
    JWT_REFRESH_EXPIRES_IN: zod_1.z.string().default('30d'),
    EMAIL_HOST: zod_1.z.string().optional(),
    EMAIL_PORT: zod_1.z.coerce.number().optional(),
    EMAIL_USER: zod_1.z.string().optional(),
    EMAIL_PASSWORD: zod_1.z.string().optional(),
    EMAIL_FROM: zod_1.z.string().email().optional(),
    FRONTEND_URL: zod_1.z.string().url().default('http://localhost:5173'),
    CORS_ORIGIN: zod_1.z.string().default('http://localhost:5173'),
});
