'use client';

import { Suspense, lazy, ComponentType, useState, useEffect, useRef } from 'react';
import { Skeleton } from './SkeletonLoader';

interface LazyComponentProps {
  fallback?: React.ReactNode;
  className?: string;
}

// Higher-order component for lazy loading
export function withLazyLoading<T extends object>(
  importFunc: () => Promise<{ default: ComponentType<T> }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(importFunc);

  return function LazyWrapper(props: T & LazyComponentProps) {
    const { fallback: customFallback, className, ...componentProps } = props;
    
    const defaultFallback = (
      <div className={className}>
        <Skeleton variant="card" className="w-full h-64" />
      </div>
    );

    return (
      <Suspense fallback={customFallback || fallback || defaultFallback}>
        <LazyComponent {...(componentProps as T)} />
      </Suspense>
    );
  };
}

// Lazy loading wrapper for components
export function LazyLoad({ 
  children, 
  fallback, 
  className 
}: { 
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}) {
  const defaultFallback = (
    <div className={className}>
      <Skeleton variant="card" className="w-full h-64" />
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
}

// Intersection Observer based lazy loading
export function LazyOnView({ 
  children, 
  fallback,
  className,
  threshold = 0.1,
  rootMargin = '50px'
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFallback = (
    <div className={className}>
      <Skeleton variant="card" className="w-full h-64" />
    </div>
  );

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : (fallback || defaultFallback)}
    </div>
  );
}

// Pre-built lazy components
export const LazyQuickViewModal = withLazyLoading(
  () => import('@/components/menu/QuickViewModal'),
  <Skeleton variant="card" className="w-full h-96" />
);

export const LazyCheckoutForm = withLazyLoading(
  () => import('@/components/checkout/CheckoutProgress'),
  <Skeleton variant="card" className="w-full h-64" />
);

export const LazyOrderConfirmation = withLazyLoading(
  () => import('@/components/order-confirmation/OrderConfirmationContent'),
  <Skeleton variant="card" className="w-full h-96" />
);