import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'cultural';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, variant = 'default', ...props }, ref) => {
    const baseStyles = 'flex w-full rounded-lg border px-3 py-3 sm:py-2 text-body placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 touch-manipulation min-h-[44px] sm:min-h-[40px]';
    
    const variants = {
      default: 'border-primary/30 bg-background focus:border-primary focus:ring-primary/20',
      cultural: 'cultural-border-subtle bg-background focus:border-primary focus:ring-primary/20 focus:shadow-warm-glow'
    };

    const errorStyles = error ? 'border-error focus:border-error focus:ring-error/20' : '';

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-small font-medium text-foreground">
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <input
          className={cn(
            baseStyles,
            variants[variant],
            errorStyles,
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-small text-error flex items-center gap-1">
            <span className="text-error">⚠</span>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-small text-foreground/60">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Textarea component
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'cultural';
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, variant = 'default', ...props }, ref) => {
    const baseStyles = 'flex w-full rounded-lg border px-3 py-3 sm:py-2 text-body placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-vertical min-h-[100px] sm:min-h-[80px] touch-manipulation';
    
    const variants = {
      default: 'border-primary/30 bg-background focus:border-primary focus:ring-primary/20',
      cultural: 'cultural-border-subtle bg-background focus:border-primary focus:ring-primary/20 focus:shadow-warm-glow'
    };

    const errorStyles = error ? 'border-error focus:border-error focus:ring-error/20' : '';

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-small font-medium text-foreground">
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <textarea
          className={cn(
            baseStyles,
            variants[variant],
            errorStyles,
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-small text-error flex items-center gap-1">
            <span className="text-error">⚠</span>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-small text-foreground/60">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Input, Textarea };