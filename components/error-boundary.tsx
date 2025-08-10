'use client';

import { Component, ErrorInfo, ReactNode, useState, useCallback } from 'react';
import { logger } from '../lib/services/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundaryClass extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('Error boundary caught error', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });
    this.props.onError?.(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
}

const ErrorFallback = ({ error, resetError }: ErrorFallbackProps) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center bg-muted/50 p-4">
      <div className="max-w-md w-full p-6 bg-card rounded-lg shadow-lg border border-border">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Something went wrong
        </h2>
        <p className="text-muted-foreground mb-4">
          We apologize for the inconvenience. Please try refreshing the page or contact support if the problem persists.
        </p>
        {resetError && (
          <button
            onClick={resetError}
            className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
          >
            Try again
          </button>
        )}
        {process.env.NODE_ENV === 'development' && error && (
          <pre className="mt-4 p-4 bg-muted rounded text-sm overflow-auto text-foreground">
            {error.message}
          </pre>
        )}
      </div>
    </div>
  );
};

interface ErrorBoundaryProps extends Props {
  resetKey?: number;
}

export const ErrorBoundary = ({ 
  children, 
  fallback,
  onError,
  resetKey 
}: ErrorBoundaryProps) => {
  return (
    <ErrorBoundaryClass 
      key={resetKey}
      fallback={fallback}
      onError={onError}
    >
      {children}
    </ErrorBoundaryClass>
  );
};

export const useErrorBoundary = () => {
  const [key, setKey] = useState<number>(0);
  
  const resetError = useCallback(() => {
    setKey(prev => prev + 1);
  }, []);

  return {
    resetKey: key,
    resetError
  };
}; 