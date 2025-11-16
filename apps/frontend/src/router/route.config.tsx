/**
 * @file route.config.ts
 * @summary
 * Centralized definition of all application routes.
 *
 * @description
 * Maps each route path from `ROUTES` to its respective React component.
 * Public routes are open to all users, while private routes are wrapped
 * in <PrivateRoute> for authentication enforcement.
 *
 * This structure allows consistent route management and easy scaling.
 */

import { ROUTES } from 'src/constants/routes';
import { lazy, type JSX } from 'react';

const NotFoundPage = lazy(() => import('src/pages/Error/NotFoundPage'));

const HomePage = lazy(() => import('src/pages/Home/HomePage'));
const ServicePage = lazy(() => import('src/pages/Services/ServicePage'));
const ServiceDetail = lazy(() => import('src/pages/Services/ServiceDetail'));
const ContactPage = lazy(() => import('src/pages/contact/ContactPage'));
const PortfolioPage = lazy(() => import('src/pages/portfolio/PortfolioPage'));

const LoginPage = lazy(() => import('src/pages/auth/LoginPage'));
const SignupPage = lazy(() => import('src/pages/auth/SignupPage'));
const ForgotPasswordPage = lazy(() => import('src/pages/auth/ForgotPassswordPage'));
const ResetPasswordPage = lazy(() => import('src/pages/auth/ResetPasswordPage'));
const VerifyEmailPage = lazy(() => import('src/pages/auth/VerifyEmail'));

export interface AppRoute {
  /** Route path, from ROUTES */
  path: string;
  /** React element to render */
  element: JSX.Element;
  /** Whether route requires authentication */
  isPrivate?: boolean;
}

export const appRoutes: AppRoute[] = [
  // Public Routes
  { path: ROUTES.HOME, element: <HomePage /> },
  { path: ROUTES.SERVICES, element: <ServicePage /> },
  { path: ROUTES.SERVICE_DETAILS, element: <ServiceDetail /> },
  { path: ROUTES.CONTACT, element: <ContactPage /> },
  { path: ROUTES.PORTFOLIO, element: <PortfolioPage /> },

  // Auth Routes
  { path: ROUTES.LOGIN, element: <LoginPage /> },
  { path: ROUTES.SIGNUP, element: <SignupPage /> },
  { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
  { path: ROUTES.RESET_PASSWORD, element: <ResetPasswordPage /> },
  { path: ROUTES.VERIFY_EMAIL, element: <VerifyEmailPage /> },

  // Not found page
  { path: '*', element: <NotFoundPage /> },
];
