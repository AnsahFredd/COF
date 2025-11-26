"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const env_schema_1 = require("./env.schema");
dotenv_1.default.config();
const envVars = env_schema_1.envSchema.parse(process.env);
exports.config = {
    port: envVars.PORT,
    nodeEnv: envVars.NODE_ENV,
    apiVersion: envVars.API_VERSION,
    // Database
    databaseUrl: envVars.DATABASE_URL,
    // Arcjet
    arcjetKey: envVars.ARCJET_KEY,
    // JWT
    jwtSecret: envVars.JWT_SECRET,
    jwtExpiresIn: envVars.JWT_EXPIRES_IN,
    jwtRefreshSecret: envVars.JWT_REFRESH_SECRET,
    jwtRefreshExpiresIn: envVars.JWT_REFRESH_EXPIRES_IN,
    // Email
    emailHost: envVars.EMAIL_HOST || '',
    emailPort: envVars.EMAIL_PORT || 587,
    emailUser: envVars.EMAIL_USER || '',
    emailPassword: envVars.EMAIL_PASSWORD || '',
    emailFrom: envVars.EMAIL_FROM || 'noreply@cofuel.com',
    // Frontend
    frontendUrl: envVars.FRONTEND_URL,
    // CORS
    corsOrigin: envVars.CORS_ORIGIN,
};
