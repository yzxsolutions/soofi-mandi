'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, Check, X, AlertCircle } from 'lucide-react';

interface MobileFormProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
}

export function MobileForm({ children, onSubmit, className }: MobileFormProps) {
  return (
    <form 
      onSubmit={onSubmit}
      className={cn('mobile-form mobile-space-y-6', className)}
    >
      {children}
    </form>
  );
}

interface MobileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'cultural' | 'minimal';
}

export function MobileInput({
  label,
  error,
  success,
  helperText,
  leftIcon,
  rightIcon,
  variant = 'default',
  className,
  type = 'text',
  ...props
}: MobileInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const variants = {
    default: 'mobile-form-input',
    cultural: 'mobile-form-input border-primary/30 focus:border-primary',
    minimal: 'mobile-form-input border-transparent bg-transparent border-b-2 border-b-foreground/20 focus:border-b-primary rounded-none',
  };

  return (
    <div className="mobile-form-group">
      <label 
        htmlFor={props.id}
        className={cn(
          'mobile-form-label',
          error && 'text-error',
          success && 'text-success'
        )}
      >
        {label}
        {props.required && <span className="text-error ml-1">*</span>}
      </label>
      
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/60">
            {leftIcon}
          </div>
        )}
        
        {/* Input */}
        <input
          ref={inputRef}
          type={inputType}
          className={cn(
            variants[variant],
            leftIcon && 'pl-10',
            (rightIcon || isPassword) && 'pr-10',
            error && 'border-error focus:border-error',
            success && 'border-success focus:border-success',
            isFocused && 'ring-2 ring-primary/20',
            className
          )}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        
        {/* Right Icon or Password Toggle */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {success && (
            <Check className="w-5 h-5 text-success" />
          )}
          {error && (
            <AlertCircle className="w-5 h-5 text-error" />
          )}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="touch-target-small text-foreground/60 hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}
          {rightIcon && !isPassword && !error && !success && rightIcon}
        </div>
      </div>
      
      {/* Helper Text or Error */}
      {(error || helperText) && (
        <div className={cn(
          'text-sm mt-1',
          error ? 'text-error' : 'text-foreground/60'
        )}>
          {error || helperText}
        </div>
      )}
    </div>
  );
}

interface MobileTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  maxLength?: number;
  variant?: 'default' | 'cultural' | 'minimal';
}

export function MobileTextarea({
  label,
  error,
  success,
  helperText,
  maxLength,
  variant = 'default',
  className,
  ...props
}: MobileTextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const variants = {
    default: 'mobile-form-input min-h-[120px] resize-y',
    cultural: 'mobile-form-input min-h-[120px] resize-y border-primary/30 focus:border-primary',
    minimal: 'mobile-form-input min-h-[120px] resize-y border-transparent bg-transparent border-b-2 border-b-foreground/20 focus:border-b-primary rounded-none',
  };

  return (
    <div className="mobile-form-group">
      <div className="flex justify-between items-center mb-2">
        <label 
          htmlFor={props.id}
          className={cn(
            'mobile-form-label mb-0',
            error && 'text-error',
            success && 'text-success'
          )}
        >
          {label}
          {props.required && <span className="text-error ml-1">*</span>}
        </label>
        
        {maxLength && (
          <span className={cn(
            'text-xs',
            charCount > maxLength * 0.9 ? 'text-error' : 'text-foreground/60'
          )}>
            {charCount}/{maxLength}
          </span>
        )}
      </div>
      
      <div className="relative">
        <textarea
          className={cn(
            variants[variant],
            error && 'border-error focus:border-error',
            success && 'border-success focus:border-success',
            isFocused && 'ring-2 ring-primary/20',
            className
          )}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          onChange={(e) => {
            setCharCount(e.target.value.length);
            props.onChange?.(e);
          }}
          maxLength={maxLength}
          {...props}
        />
        
        {/* Status Icons */}
        {(success || error) && (
          <div className="absolute top-3 right-3">
            {success && <Check className="w-5 h-5 text-success" />}
            {error && <AlertCircle className="w-5 h-5 text-error" />}
          </div>
        )}
      </div>
      
      {/* Helper Text or Error */}
      {(error || helperText) && (
        <div className={cn(
          'text-sm mt-1',
          error ? 'text-error' : 'text-foreground/60'
        )}>
          {error || helperText}
        </div>
      )}
    </div>
  );
}

interface MobileSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  placeholder?: string;
  variant?: 'default' | 'cultural' | 'minimal';
}

export function MobileSelect({
  label,
  error,
  success,
  helperText,
  options,
  placeholder,
  variant = 'default',
  className,
  ...props
}: MobileSelectProps) {
  const [isFocused, setIsFocused] = useState(false);

  const variants = {
    default: 'mobile-form-input appearance-none cursor-pointer',
    cultural: 'mobile-form-input appearance-none cursor-pointer border-primary/30 focus:border-primary',
    minimal: 'mobile-form-input appearance-none cursor-pointer border-transparent bg-transparent border-b-2 border-b-foreground/20 focus:border-b-primary rounded-none',
  };

  return (
    <div className="mobile-form-group">
      <label 
        htmlFor={props.id}
        className={cn(
          'mobile-form-label',
          error && 'text-error',
          success && 'text-success'
        )}
      >
        {label}
        {props.required && <span className="text-error ml-1">*</span>}
      </label>
      
      <div className="relative">
        <select
          className={cn(
            variants[variant],
            error && 'border-error focus:border-error',
            success && 'border-success focus:border-success',
            isFocused && 'ring-2 ring-primary/20',
            className
          )}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Dropdown Arrow */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {/* Status Icons */}
        {(success || error) && (
          <div className="absolute right-10 top-1/2 -translate-y-1/2">
            {success && <Check className="w-5 h-5 text-success" />}
            {error && <AlertCircle className="w-5 h-5 text-error" />}
          </div>
        )}
      </div>
      
      {/* Helper Text or Error */}
      {(error || helperText) && (
        <div className={cn(
          'text-sm mt-1',
          error ? 'text-error' : 'text-foreground/60'
        )}>
          {error || helperText}
        </div>
      )}
    </div>
  );
}

// Mobile-optimized checkbox component
interface MobileCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
  error?: string;
}

export function MobileCheckbox({ label, description, error, className, ...props }: MobileCheckboxProps) {
  return (
    <div className="mobile-form-group">
      <label className="flex items-start gap-3 cursor-pointer touch-target">
        <input
          type="checkbox"
          className={cn(
            'w-5 h-5 mt-0.5 rounded border-2 border-foreground/30 text-primary focus:ring-primary focus:ring-2 focus:ring-offset-0 bg-transparent',
            error && 'border-error',
            className
          )}
          {...props}
        />
        <div className="flex-1">
          <div className={cn(
            'font-medium text-foreground',
            error && 'text-error'
          )}>
            {label}
          </div>
          {description && (
            <div className="text-sm text-foreground/60 mt-1">
              {description}
            </div>
          )}
        </div>
      </label>
      
      {error && (
        <div className="text-sm text-error mt-1 ml-8">
          {error}
        </div>
      )}
    </div>
  );
}

// Mobile-optimized radio group component
interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface MobileRadioGroupProps {
  name: string;
  label: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  helperText?: string;
  className?: string;
}

export function MobileRadioGroup({
  name,
  label,
  options,
  value,
  onChange,
  error,
  helperText,
  className
}: MobileRadioGroupProps) {
  return (
    <div className={cn('mobile-form-group', className)}>
      <div className={cn(
        'mobile-form-label',
        error && 'text-error'
      )}>
        {label}
      </div>
      
      <div className="mobile-space-y-3 mt-3">
        {options.map((option) => (
          <label 
            key={option.value}
            className={cn(
              'flex items-start gap-3 cursor-pointer touch-target',
              option.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              disabled={option.disabled}
              className={cn(
                'w-5 h-5 mt-0.5 border-2 border-foreground/30 text-primary focus:ring-primary focus:ring-2 focus:ring-offset-0 bg-transparent',
                error && 'border-error'
              )}
            />
            <div className="flex-1">
              <div className="font-medium text-foreground">
                {option.label}
              </div>
              {option.description && (
                <div className="text-sm text-foreground/60 mt-1">
                  {option.description}
                </div>
              )}
            </div>
          </label>
        ))}
      </div>
      
      {(error || helperText) && (
        <div className={cn(
          'text-sm mt-2',
          error ? 'text-error' : 'text-foreground/60'
        )}>
          {error || helperText}
        </div>
      )}
    </div>
  );
}