'use client';

import { Suspense, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { ErrorBoundary } from '../error-boundary';

interface LoadingProps {
  size?: number;
  className?: string;
  text?: string;
}

export const Loading = ({ size = 24, className = '', text }: LoadingProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-4 ${className}`}
      role="status"
      aria-label="Loading"
    >
      <Loader2 className="animate-spin" size={size} />
      {text && (
        <p className="mt-2 text-sm text-gray-500">{text}</p>
      )}
    </div>
  );
};

interface LoadingScreenProps extends LoadingProps {
  fullScreen?: boolean;
}

export const LoadingScreen = ({ fullScreen = true, ...props }: LoadingScreenProps) => {
  return (
    <div
      className={`flex items-center justify-center bg-white/80 ${
        fullScreen ? 'fixed inset-0 z-50' : 'w-full h-full min-h-[200px]'
      }`}
    >
      <Loading {...props} />
    </div>
  );
};

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
}

export const LoadingSkeleton = ({ className = '', count = 1 }: LoadingSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`animate-pulse bg-gray-200 rounded ${className}`}
          role="presentation"
          aria-hidden="true"
        />
      ))}
    </>
  );
};

interface AsyncBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorComponent?: ReactNode;
}

export const AsyncBoundary = ({
  children,
  fallback = <LoadingScreen />,
  errorComponent
}: AsyncBoundaryProps) => {
  return (
    <ErrorBoundary fallback={errorComponent}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}; 