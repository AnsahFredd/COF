/**
 * @file index.tsx
 * @description Centralized router entry point. Handles public/private route rendering with Suspense fallback.
 */

import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { appRoutes, type AppRoute } from './route.config';
import { PrivateRoute } from './PrivateRoute';
import LoadingScreen from 'src/feedback/LoadingScreen/LoadingScreen';

/**
 * Recursively renders routes including nested children
 */
const renderRoute = (route: AppRoute) => {
  const { path, element, isPrivate, requireAdmin, children } = route;

  // Wrap element in PrivateRoute if needed
  const wrappedElement = isPrivate ? (
    <PrivateRoute requireAdmin={requireAdmin}>{element}</PrivateRoute>
  ) : (
    element
  );

  // If route has children, render nested routes
  if (children && children.length > 0) {
    return (
      <Route key={path} path={path} element={wrappedElement}>
        {children.map((child) => (
          <Route
            key={child.path}
            path={child.path}
            element={
              child.isPrivate ? (
                <PrivateRoute requireAdmin={child.requireAdmin}>{child.element}</PrivateRoute>
              ) : (
                child.element
              )
            }
          />
        ))}
      </Route>
    );
  }

  // Regular route without children
  return <Route key={path} path={path} element={wrappedElement} />;
};

export const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>{appRoutes.map((route) => renderRoute(route))}</Routes>
    </Suspense>
  );
};
