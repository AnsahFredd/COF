/**
 * @summary Route guard for authenticated and admin users
 */

import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from 'src/constants/routes';
import { useAuth } from 'src/features/authentication';
import LoadingScreen from 'src/feedback/LoadingScreen/LoadingScreen';

interface PrivateRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const PrivateRoute = ({ children, requireAdmin = false }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // While checking auth (e.g. refreshing tokens)
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Require user to be authenticated
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // Check admin role if required
  if (requireAdmin && user?.role !== 'ADMIN') {
    return <Navigate to={ROUTES.HOME} state={{ error: 'Admin access required' }} replace />;
  }

  // Allow everything else
  return <>{children}</>;
};
