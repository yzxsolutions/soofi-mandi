import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'cultural' | 'minimal';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  variant = 'default',
  className 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  if (variant === 'cultural') {
    return (
      <div className={cn('relative', sizes[size], className)}>
        {/* Outer ring with geometric pattern */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/20">
          <div className="absolute inset-0 rounded-full geometric-pattern-dense opacity-30" />
        </div>
        
        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-secondary animate-spin" />
        
        {/* Inner decorative elements */}
        <div className="absolute inset-2 rounded-full border border-primary/30 animate-pulse" />
        <div className="absolute inset-3 rounded-full bg-primary/10 animate-pulse" 
             style={{ animationDelay: '0.5s' }} />
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={cn('relative', sizes[size], className)}>
        <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn('relative', sizes[size], className)}>
      {/* Outer spinning ring */}
      <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-secondary animate-spin" />
      
      {/* Inner pulsing dot */}
      <div className="absolute inset-3 rounded-full bg-primary animate-pulse" />
    </div>
  );
};

// Geometric pattern spinner for splash screens
const GeometricSpinner: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('relative w-16 h-16', className)}>
      {/* Outer octagon */}
      <div className="absolute inset-0 border-2 border-primary/30 transform rotate-45 animate-spin"
           style={{ 
             clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
             animationDuration: '3s'
           }} />
      
      {/* Middle square */}
      <div className="absolute inset-2 border-2 border-secondary/50 animate-spin"
           style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
      
      {/* Inner diamond */}
      <div className="absolute inset-4 bg-primary/20 transform rotate-45 animate-pulse" />
      
      {/* Center dot */}
      <div className="absolute inset-6 bg-primary rounded-full animate-pulse"
           style={{ animationDelay: '0.5s' }} />
    </div>
  );
};

export { LoadingSpinner, GeometricSpinner };