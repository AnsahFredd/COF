/**
 * @file index.tsx
 * @description Centralized router entry point. Handles public/private route rendering with Suspense fallback.
 */

import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { appRoutes } from './route.config';
import { PrivateRoute } from './PrivateRoute';
import LoadingScreen from 'src/feedback/LoadingScreen/LoadingScreen';

export const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {appRoutes.map(({ path, element, isPrivate }) => (
          <Route
            key={path}
            path={path}
            element={isPrivate ? <PrivateRoute>{element}</PrivateRoute> : element}
          />
        ))}
      </Routes>
    </Suspense>
  );
};
