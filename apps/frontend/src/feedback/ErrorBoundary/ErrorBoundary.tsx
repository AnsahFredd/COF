import React, { Component, type ReactNode } from 'react';
import { GlobaErrorPage } from './ErrorFallbacks/GlobalErrorPage';
import { BookingErrorPage } from './ErrorFallbacks/BookingErrorPage';
import { PaymentErrorPage } from './ErrorFallbacks/PaymentErrorPage';
import { logErrorToService } from './helpers/logError';
import { ERROR_CONFIG } from './config';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
  customMessage?: string;
  showDetails?: boolean;
  errorType?: 'general' | 'booking' | 'payment';
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

/**
 * ErrorBoundary - Catches React errors and displays appropriate fallback UI
 * Usage:
 * <ErrorBoundary><App /></ErrorBoundary>
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    const context = {
      errorType: this.props.errorType || 'general',
      customMessage: this.props.customMessage,
    };

    // Log to external service
    logErrorToService(error, errorInfo, context);

    this.setState({ error, errorInfo });
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });

    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  handleGoHome = (): void => {
    window.location.href = ERROR_CONFIG.homeUrl;
  };

  handleRefresh = (): void => {
    window.location.reload();
  };

  handleContactSupport = (): void => {
    window.location.href = ERROR_CONFIG.contactUrl;
  };

  handleGoToBookings = (): void => {
    window.location.href = ERROR_CONFIG.bookingUrl;
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const errorType = this.props.errorType || 'general';

      switch (errorType) {
        case 'booking':
          return (
            <BookingErrorPage
              onRefresh={this.handleRefresh}
              onContactSupport={this.handleContactSupport}
            />
          );

        case 'payment':
          return <PaymentErrorPage onGoToBookings={this.handleGoToBookings} />;

        case 'general':
        default:
          return (
            <GlobaErrorPage
              error={this.state.error}
              onReset={this.handleReset}
              onGoHome={this.handleGoHome}
              customMessage={this.props.customMessage}
            />
          );
      }
    }

    return this.props.children;
  }
}

/**
 * BookingErrorBoundary - Pre-configured for booking flows
 */
export const BookingErrorBoundary = ({
  children,
  customMessage,
}: {
  children: ReactNode;
  customMessage?: string;
}) => (
  <ErrorBoundary errorType="booking" customMessage={customMessage}>
    {children}
  </ErrorBoundary>
);

/**
 * PaymentErrorBoundary - Pre-configured for payment flows
 */
export const PaymentErrorBoundary = ({ children }: { children: ReactNode }) => (
  <ErrorBoundary errorType="payment">{children}</ErrorBoundary>
);
