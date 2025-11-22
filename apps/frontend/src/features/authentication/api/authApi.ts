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
    // Backend returns {status: 'sucess', data: {user, token, refreshToken}}
    const response = await api.post<{ status: string; data: LoginResponse }>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    const loginData = response.data;

    if (loginData.token && loginData.refreshToken) {
      tokenManager.saveTokens(loginData.token, loginData.refreshToken);
    }

    return loginData;
  },

  // Signup
  async signup(credentials: SignupCredentials): Promise<SignupResponse> {
    // Backend returns {status: 'success', data: {user, token}}
    const response = await api.post<{ status: string; data: SignupResponse }>(
      API_ENDPOINTS.AUTH.REGISTER,
      credentials
    );
    const signupData = response.data;

    if (signupData.token && signupData.refreshToken) {
      tokenManager.saveTokens(signupData.token, signupData.refreshToken);
    }

    return signupData;
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
    // Backend returns {success: true, data: user}
    const response = await api.get<{ success: boolean; data: User }>(API_ENDPOINTS.AUTH.ME);
    return response.data;
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
