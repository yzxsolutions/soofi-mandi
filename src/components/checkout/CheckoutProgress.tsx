'use client';

import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface CheckoutProgressProps {
  steps: Step[];
  currentStep: number;
}

export function CheckoutProgress({ steps, currentStep }: CheckoutProgressProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex items-center">
              <div
                className={`
                  w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-colors touch-friendly
                  ${
                    step.id < currentStep
                      ? 'bg-green-500 border-green-500 text-white'
                      : step.id === currentStep
                      ? 'bg-primary border-primary text-white'
                      : 'bg-gray-800/30 border-gray-600 text-gray-400'
                  }
                `}
              >
                {step.id < currentStep ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <span className="text-xs sm:text-sm font-semibold">{step.id}</span>
                )}
              </div>
              
              {/* Step Info - Hidden on mobile */}
              <div className="ml-2 sm:ml-3 hidden md:block">
                <div
                  className={`
                    text-sm font-medium
                    ${
                      step.id <= currentStep
                        ? 'text-foreground'
                        : 'text-foreground/50'
                    }
                  `}
                >
                  {step.title}
                </div>
                <div
                  className={`
                    text-xs
                    ${
                      step.id <= currentStep
                        ? 'text-foreground/70'
                        : 'text-foreground/40'
                    }
                  `}
                >
                  {step.description}
                </div>
              </div>
            </div>
            
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-2 sm:mx-4">
                <div
                  className={`
                    h-0.5 transition-colors
                    ${
                      step.id < currentStep
                        ? 'bg-green-500'
                        : 'bg-gray-600'
                    }
                  `}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Mobile Step Info */}
      <div className="md:hidden mt-4 mobile-text-center mobile-card">
        <div className="text-sm font-medium text-foreground">
          {steps.find(step => step.id === currentStep)?.title}
        </div>
        <div className="text-xs text-foreground/60 mt-1">
          Step {currentStep} of {steps.length}
        </div>
        <div className="text-xs text-foreground/50 mt-2">
          {steps.find(step => step.id === currentStep)?.description}
        </div>
      </div>
    </div>
  );
}

// Add default export for lazy loading
export default CheckoutProgress;