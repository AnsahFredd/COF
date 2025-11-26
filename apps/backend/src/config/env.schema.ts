import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  NODE_ENV: z.enum(['development', 'production', 'staging']).default('development'),
  API_VERSION: z.string().default('v1'),

  DATABASE_URL: z.string().url(),

  ARCJET_KEY: z.string().refine((val) => val.startsWith('aj_') || val.startsWith('ajkey_'), {
    message: 'Must start with "aj_" or "ajkey_"',
  }),

  JWT_SECRET: z.string().min(4),
  JWT_EXPIRES_IN: z.string().default('7d'),
  JWT_REFRESH_SECRET: z.string().min(4),
  JWT_REFRESH_EXPIRES_IN: z.string().default('30d'),

  EMAIL_HOST: z.string().optional(),
  EMAIL_PORT: z.coerce.number().optional(),
  EMAIL_USER: z.string().optional(),
  EMAIL_PASSWORD: z.string().optional(),
  EMAIL_FROM: z.string().email().optional(),

  FRONTEND_URL: z.string().url().default('http://localhost:5173'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
});
