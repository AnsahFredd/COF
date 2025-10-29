/**
 * @summary
 * A route guard component that restricts access to authenticated users only
 *
 * @description
 * Wrap any protected route with<ProtectRoute> to ensure only logged-in users
 * can access it
 */

import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from 'src/constants/routes';
import { useAuth } from 'src/features/authentication';
import LoadingScreen from 'src/feedback/LoadingScreen/LoadingScreen';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
