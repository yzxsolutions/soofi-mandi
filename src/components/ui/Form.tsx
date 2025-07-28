import React from 'react';
import { cn } from '@/lib/utils';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <form
        className={cn('space-y-6', className)}
        ref={ref}
        {...props}
      >
        {children}
      </form>
    );
  }
);

Form.displayName = 'Form';

interface FormFieldProps {
  children: React.ReactNode;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({ children, className }) => {
  return (
    <div className={cn('space-y-2', className)}>
      {children}
    </div>
  );
};

interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

const FormGroup: React.FC<FormGroupProps> = ({ 
  children, 
  className, 
  title, 
  description 
}) => {
  return (
    <div className={cn('space-y-4', className)}>
      {title && (
        <div className="space-y-1">
          <h3 className="text-h3 text-foreground">{title}</h3>
          {description && (
            <p className="text-body text-foreground/70">{description}</p>
          )}
        </div>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

interface FormActionsProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

const FormActions: React.FC<FormActionsProps> = ({ 
  children, 
  className, 
  align = 'right' 
}) => {
  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  };

  return (
    <div className={cn(
      'flex gap-3 pt-4 border-t border-primary/20',
      alignmentClasses[align],
      className
    )}>
      {children}
    </div>
  );
};

interface FormErrorProps {
  message: string;
  className?: string;
}

const FormError: React.FC<FormErrorProps> = ({ message, className }) => {
  return (
    <div className={cn(
      'rounded-lg border border-error/20 bg-error/5 p-4',
      className
    )}>
      <div className="flex items-center gap-2">
        <span className="text-error text-lg">⚠</span>
        <p className="text-body text-error font-medium">
          {message}
        </p>
      </div>
    </div>
  );
};

interface FormSuccessProps {
  message: string;
  className?: string;
}

const FormSuccess: React.FC<FormSuccessProps> = ({ message, className }) => {
  return (
    <div className={cn(
      'rounded-lg border border-success/20 bg-success/5 p-4',
      className
    )}>
      <div className="flex items-center gap-2">
        <span className="text-success text-lg">✓</span>
        <p className="text-body text-success font-medium">
          {message}
        </p>
      </div>
    </div>
  );
};

export { 
  Form, 
  FormField, 
  FormGroup, 
  FormActions, 
  FormError, 
  FormSuccess 
};