import { RootLayout } from './components/layout/MainLayout/RootLayout';
import { ErrorBoundary } from './feedback/ErrorBoundary';
import { AppRouter } from './router/router';
const App = () => {
  return (
    <ErrorBoundary>
      <RootLayout>
        <AppRouter />
      </RootLayout>
    </ErrorBoundary>
  );
};

export default App;
