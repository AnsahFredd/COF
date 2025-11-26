import dotenv from 'dotenv';
import { envSchema } from './env.schema';

dotenv.config();

const envVars = envSchema.parse(process.env);

export const config = {
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
