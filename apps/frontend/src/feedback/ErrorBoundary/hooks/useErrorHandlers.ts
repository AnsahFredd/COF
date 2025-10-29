import { useCallback } from 'react';
import { logErrorToService } from '../helpers/logError';

/**
 * useErrorHandler - Manually trigger error boundary for async errors
 *
 * Example:
 * const handleError = useErrorHandler();
 *
 * try {
 *   await apiCall();
 * } catch (err) {
 *   handleError(err as Error, { some: "context" });
 * }
 */

export const useErrorHandler = () => {
  const handleError = useCallback((error: Error, context?: Record<string, unknown>) => {
    // Log error to external service
    logErrorToService(error, { componentStack: '' }, context);

    // Throw in next tick to allow an ErrorBoundary to catch it
    // (useful when dealing with async errors inside event handlers)
    setTimeout(() => {
      throw error;
    }, 0);
  }, []);

  return handleError;
};
