import type { EnvConfig } from './interface';

type EnvKey =
  | 'VITE_API_URL'
  | 'VITE_APP_NAME'
  | 'VITE_STRIPE_API_KEY'
  | 'VITE_PAYSTACK_PUBLIC_KEY'
  | 'VITE_GOOGLE_MAPS_API_KEY'
  | 'VITE_BACKEND_URL'
  | 'VITE_TOKEN_KEY'
  | 'VITE_REFRESH_TOKEN_KEY'
  | 'VITE_CLOUDINARY_CLOUD_NAME'
  | 'VITE_CLOUDINARY_UPLOAD_PRESET';

// helper to get env  variables
const getEnvConfig = (key: EnvKey, defaultValue?: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    if (defaultValue !== undefined) return defaultValue;
    throw new Error(`Environment variable ${key} is required but not set.`);
  }
  return value;
};

// Type configuration
export const env: EnvConfig & {
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_UPLOAD_PRESET: string;
} = {
  API_URL: getEnvConfig('VITE_API_URL', 'http://localhost:5000/api/v1'),
  APP_NAME: getEnvConfig('VITE_APP_NAME', 'CofuelHomeOfEvent'),
  NODE_ENV: import.meta.env.MODE || 'development',
  IS_DEVELOPMENT: import.meta.env.MODE === 'development',
  IS_PRODUCTION: import.meta.env.MODE === 'production',
  STRIPE_API_KEY: getEnvConfig('VITE_STRIPE_API_KEY', ''),
  PAYSTACK_PUBLIC_KEY: getEnvConfig('VITE_PAYSTACK_PUBLIC_KEY', ''),
  GOOGLE_MAPS_API_KEY: getEnvConfig('VITE_GOOGLE_MAPS_API_KEY', ''),
  BACKEND_URL: getEnvConfig('VITE_BACKEND_URL', 'http://localhost:5500'),
  TOKEN_KEY: getEnvConfig('VITE_TOKEN_KEY', 'auth_token'),
  REFRESH_TOKEN_KEY: getEnvConfig('VITE_REFRESH_TOKEN_KEY', 'refresh_token'),
  CLOUDINARY_CLOUD_NAME: getEnvConfig('VITE_CLOUDINARY_CLOUD_NAME', 'demo'),
  CLOUDINARY_UPLOAD_PRESET: getEnvConfig('VITE_CLOUDINARY_UPLOAD_PRESET', 'default_preset'),
};
