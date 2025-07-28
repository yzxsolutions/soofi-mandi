'use client';

import { cn } from '@/lib/utils';

interface MobileLoadingProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export function MobileLoading({ 
  variant = 'spinner', 
  size = 'md', 
  text, 
  className 
}: MobileLoadingProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const renderSpinner = () => (
    <div className={cn(
      'animate-spin rounded-full border-2 border-primary/20 border-t-primary',
      sizes[size]
    )} />
  );

  const renderDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'bg-primary rounded-full animate-pulse',
            size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'
          )}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s',
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div className={cn(
      'bg-primary rounded-full animate-pulse',
      sizes[size]
    )} />
  );

  const renderSkeleton = () => (
    <div className="mobile-space-y-3 w-full max-w-sm">
      <div className="mobile-skeleton mobile-skeleton-title w-3/4" />
      <div className="mobile-skeleton mobile-skeleton-text w-full" />
      <div className="mobile-skeleton mobile-skeleton-text w-2/3" />
    </div>
  );

  const renderVariant = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'skeleton':
        return renderSkeleton();
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={cn(
      'flex flex-col items-center justify-center gap-3',
      className
    )}>
      {renderVariant()}
      {text && (
        <p className="text-sm text-foreground/60 text-center font-medium">
          {text}
        </p>
      )}
    </div>
  );
}

// Full screen mobile loading overlay
interface MobileLoadingOverlayProps {
  isVisible: boolean;
  text?: string;
  variant?: 'spinner' | 'dots' | 'pulse';
}

export function MobileLoadingOverlay({ 
  isVisible, 
  text = 'Loading...', 
  variant = 'spinner' 
}: MobileLoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="mobile-card text-center">
        <MobileLoading variant={variant} size="lg" text={text} />
      </div>
    </div>
  );
}

// Button loading state
interface MobileButtonLoadingProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText?: string;
  className?: string;
}

export function MobileButtonLoading({ 
  isLoading, 
  children, 
  loadingText = 'Loading...', 
  className 
}: MobileButtonLoadingProps) {
  return (
    <div className={cn('relative', className)}>
      <div className={cn(
        'transition-opacity duration-200',
        isLoading ? 'opacity-0' : 'opacity-100'
      )}>
        {children}
      </div>
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <MobileLoading variant="spinner" size="sm" />
            <span className="text-sm font-medium">{loadingText}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Page loading skeleton for mobile
export function MobilePageSkeleton() {
  return (
    <div className="mobile-container mobile-section-spacing">
      <div className="mobile-space-y-8">
        {/* Header skeleton */}
        <div className="mobile-space-y-4">
          <div className="mobile-skeleton mobile-skeleton-title w-3/4" />
          <div className="mobile-skeleton mobile-skeleton-text w-1/2" />
        </div>
        
        {/* Content skeleton */}
        <div className="mobile-grid mobile-gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="mobile-card mobile-space-y-4">
              <div className="mobile-skeleton mobile-skeleton-image" />
              <div className="mobile-skeleton mobile-skeleton-title w-3/4" />
              <div className="mobile-skeleton mobile-skeleton-text w-full" />
              <div className="mobile-skeleton mobile-skeleton-text w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Card loading skeleton
export function MobileCardSkeleton() {
  return (
    <div className="mobile-card mobile-space-y-4">
      <div className="mobile-skeleton mobile-skeleton-image" />
      <div className="mobile-skeleton mobile-skeleton-title w-3/4" />
      <div className="mobile-skeleton mobile-skeleton-text w-full" />
      <div className="mobile-skeleton mobile-skeleton-text w-2/3" />
      <div className="mobile-skeleton h-10 w-full" />
    </div>
  );
}

// List item loading skeleton
export function MobileListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="mobile-space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 mobile-card">
          <div className="mobile-skeleton w-12 h-12 rounded-full flex-shrink-0" />
          <div className="flex-1 mobile-space-y-2">
            <div className="mobile-skeleton mobile-skeleton-text w-3/4" />
            <div className="mobile-skeleton mobile-skeleton-text w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}