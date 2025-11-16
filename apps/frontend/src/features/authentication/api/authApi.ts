// src/features/authentication/authApi.ts
import { api } from 'src/services/api/api';
import { API_ENDPOINTS } from 'src/services/api/endpoints';
import { tokenManager } from 'src/helpers/tokenManager';
import { ROUTES } from 'src/constants/routes';
import type {
  LoginCredentials,
  LoginResponse,
  SignupCredentials,
  SignupResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  User,
  RefreshTokenResponse,
} from '../interface';

export const authApi = {
  // Login
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);

    if (response.token && response.refreshToken) {
      tokenManager.saveTokens(response.token, response.refreshToken);
    }

    return response;
  },

  // Signup
  async signup(credentials: SignupCredentials): Promise<SignupResponse> {
    const response = await api.post<SignupResponse>(API_ENDPOINTS.AUTH.REGISTER, credentials);

    if (response.token && response.refreshToken) {
      tokenManager.saveTokens(response.token, response.refreshToken);
    }

    return response;
  },

  // Logout
  async logout(): Promise<void> {
    try {
      await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    } finally {
      tokenManager.clearTokens();
      window.location.href = ROUTES.LOGIN;
    }
  },

  // Get current user
  async getCurrentUser(): Promise<User> {
    return api.get<User>(API_ENDPOINTS.AUTH.ME);
  },

  // Forgot password
  async forgotPassword(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    return api.post<ForgotPasswordResponse>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
  },

  // Reset password
  async resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    return api.post<ResetPasswordResponse>(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
  },

  // Verify email
  async verifyEmail(data: VerifyEmailRequest): Promise<VerifyEmailResponse> {
    return api.post<VerifyEmailResponse>(API_ENDPOINTS.AUTH.VERIFY_EMAIL, data);
  },

  // Refresh token
  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    return api.post<RefreshTokenResponse>(API_ENDPOINTS.AUTH.REFRESH, {
      refreshToken,
    });
  },
};
