/**
 * @file route.config.ts
 * @summary Centralized definition of all application routes
 */

import { ROUTES } from 'src/constants/routes';
import { lazy, type JSX } from 'react';

// Public Pages
const NotFoundPage = lazy(() => import('src/pages/Error/NotFoundPage'));
const HomePage = lazy(() => import('src/pages/Home/HomePage'));
const ServicePage = lazy(() => import('src/pages/Services/ServicePage'));
const ServiceDetail = lazy(() => import('src/pages/Services/ServiceDetail'));
const ContactPage = lazy(() => import('src/pages/contact/ContactPage'));
const PortfolioPage = lazy(() => import('src/pages/portfolio/PortfolioPage'));
const AboutPage = lazy(() => import('src/pages/about/AboutPage'));
const PrivacyPolicyPage = lazy(() => import('src/pages/legal/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('src/pages/legal/TermsPage'));

// Auth Pages
const LoginPage = lazy(() => import('src/pages/auth/LoginPage'));
const SignupPage = lazy(() => import('src/pages/auth/SignupPage'));
const ForgotPasswordPage = lazy(() => import('src/pages/auth/ForgotPassswordPage'));
const ResetPasswordPage = lazy(() => import('src/pages/auth/ResetPasswordPage'));
const VerifyEmailPage = lazy(() => import('src/pages/auth/VerifyEmail'));

// Admin Layout & Pages
const AdminLayout = lazy(() => import('src/pages/admin/AdminPage'));
const DashboardPage = lazy(() => import('src/pages/admin/DashboardPage'));
const UsersPage = lazy(() => import('src/pages/admin/UsersPage'));
const EventsPage = lazy(() => import('src/pages/admin/EventPage'));
const BookingsPage = lazy(() => import('src/pages/admin/BookingPage'));
const NotificationsPage = lazy(() => import('src/pages/admin/NotificationPage'));
const SettingsPage = lazy(() => import('src/pages/settings/SettingsPage'));
const PortfolioManagementPage = lazy(() => import('src/pages/admin/PortfolioManagementPage'));

export interface AppRoute {
  path: string;
  element: JSX.Element;
  isPrivate?: boolean;
  requireAdmin?: boolean;
  children?: AppRoute[];
}

export const appRoutes: AppRoute[] = [
  // Public Routes
  { path: ROUTES.HOME, element: <HomePage /> },
  { path: ROUTES.SERVICES, element: <ServicePage /> },
  { path: ROUTES.SERVICE_DETAILS, element: <ServiceDetail /> },
  { path: ROUTES.CONTACT, element: <ContactPage /> },
  { path: ROUTES.PORTFOLIO, element: <PortfolioPage /> },
  { path: ROUTES.ABOUT, element: <AboutPage /> },
  { path: ROUTES.PRIVACY, element: <PrivacyPolicyPage /> },
  { path: ROUTES.TERMS, element: <TermsPage /> },

  // Auth Routes
  { path: ROUTES.LOGIN, element: <LoginPage /> },
  { path: ROUTES.SIGNUP, element: <SignupPage /> },
  { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
  { path: ROUTES.RESET_PASSWORD, element: <ResetPasswordPage /> },
  { path: ROUTES.VERIFY_EMAIL, element: <VerifyEmailPage /> },

  // Admin Routes (with nested children)
  {
    path: ROUTES.ADMIN.ROOT,
    element: <AdminLayout />,
    isPrivate: true,
    requireAdmin: true,
    children: [
      { path: 'dashboard', element: <DashboardPage />, isPrivate: true, requireAdmin: true },
      { path: 'users', element: <UsersPage />, isPrivate: true, requireAdmin: true },
      { path: 'events', element: <EventsPage />, isPrivate: true, requireAdmin: true },
      { path: 'bookings', element: <BookingsPage />, isPrivate: true, requireAdmin: true },
      {
        path: 'notifications',
        element: <NotificationsPage />,
        isPrivate: true,
        requireAdmin: true,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
        isPrivate: true,
        requireAdmin: true,
      },
      {
        path: 'portfolio',
        element: <PortfolioManagementPage />,
        isPrivate: true,
        requireAdmin: true,
      },
    ],
  },

  // Not found page
  { path: '*', element: <NotFoundPage /> },
];
