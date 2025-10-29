import type React from 'react';
import { env } from 'src/config/env';
/**
 * Log error to external service (Sentry, LogRocket, etc.)
 * Replace this with your real error reporting integration.
 */

export const logErrorToService = (
  error: Error,
  errorInfo: React.ErrorInfo,
  context?: Record<string, unknown>
): void => {
  if (env.NODE_ENV === 'production') {
    // TODO: Integrate with Sentry, LogRocket, etc.
    // Example for Sentry:
    // Sentry.captureException(error, {
    //   contexts: { react: errorInfo, custom: context },
    // });

    // Minimal production fallback logging:
    console.error('Production error logged:', {
      message: error.message,
      stack: error.stack,
      errorInfo,
      context,
    });
  } else {
    console.error('Development error:', error, errorInfo, context);
  }
};
