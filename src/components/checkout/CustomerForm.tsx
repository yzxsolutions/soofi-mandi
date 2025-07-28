'use client';

import { Button } from '@/components/ui/Button';
import { MobileForm, MobileInput } from '@/components/ui/MobileForm';

type CustomerFormProps = {
  onNext: () => void;
  onBack: () => void;
};

export function CustomerForm({ onNext, onBack }: CustomerFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form validation here before proceeding
    onNext();
  };

  return (
    <MobileForm onSubmit={handleSubmit}>
      <MobileInput
        label="Full Name"
        id="name"
        name="name"
        placeholder="Enter your full name"
        variant="cultural"
        required
        autoComplete="name"
      />
      <MobileInput
        label="Email Address"
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        variant="cultural"
        required
        autoComplete="email"
      />
      <MobileInput
        label="Phone Number"
        id="phone"
        name="phone"
        type="tel"
        placeholder="Enter your phone number"
        variant="cultural"
        required
        autoComplete="tel"
      />
      
      <div className="flex flex-col sm:flex-row justify-between items-center mobile-gap-4 mt-8 pt-6 border-t border-primary/20">
        <Button variant="outline" onClick={onBack} type="button" className="mobile-full-width sm:w-auto">
          Back to Review
        </Button>
        <Button variant="primary" type="submit" className="mobile-full-width sm:w-auto">
          Next: Delivery Details
        </Button>
      </div>
    </MobileForm>
  );
}
