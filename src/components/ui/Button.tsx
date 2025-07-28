import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'cta' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  loading?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus-enhanced disabled:opacity-50 disabled:cursor-not-allowed touch-friendly -webkit-tap-highlight-color-transparent';
    
    const variants = {
      primary: 'bg-primary text-text-dark hover:bg-primary-dark focus:ring-primary shadow-warm-sm hover:shadow-warm-md',
      secondary: 'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-text-dark focus:ring-primary',
      cta: 'warm-gradient text-white font-bold hover-glow shadow-warm-md hover:shadow-warm-lg geometric-pattern-dense relative overflow-hidden',
      outline: 'border border-brown-300 text-brown-700 bg-transparent hover:bg-brown-50 focus:ring-brown-500',
      ghost: 'text-brown-700 bg-transparent hover:bg-brown-100 focus:ring-brown-500'
    };
    
    const sizes = {
      sm: 'px-3 py-2 text-sm min-h-[44px] min-w-[44px] sm:min-h-[40px] sm:px-4 touch-target',
      md: 'px-4 py-3 text-body min-h-[48px] min-w-[48px] sm:min-h-[44px] sm:px-6 touch-target-large',
      lg: 'px-6 py-4 text-body-lg min-h-[56px] min-w-[56px] sm:px-8 touch-target-xl'
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {variant === 'cta' && (
          <div className="absolute inset-0 shimmer opacity-30" />
        )}
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };