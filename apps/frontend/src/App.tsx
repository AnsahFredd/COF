import { RootLayout } from './components/layout/MainLayout/RootLayout';
import { ErrorBoundary } from './feedback/ErrorBoundary';
import { AppRouter } from './router/router';
import { useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <ErrorBoundary>
      {isAdminRoute ? (
        <AppRouter />
      ) : (
        <RootLayout>
          <AppRouter />
        </RootLayout>
      )}
    </ErrorBoundary>
  );
};

export default App;
