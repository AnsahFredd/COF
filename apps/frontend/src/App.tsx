import { ErrorBoundary } from './feedback/ErrorBoundary';
import { AppRouter } from './router/router';
const App = () => {
  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  );
};

export default App;
