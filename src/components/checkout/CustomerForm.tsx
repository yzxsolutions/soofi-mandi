'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { MobileForm, MobileInput } from '@/components/ui/MobileForm';
import { useCheckoutStore } from '@/stores/checkout-store';
import { SavedAddressSelector } from './SavedAddressSelector';
import { CustomerInfo, DeliveryInfo } from '@/types';

type CustomerFormProps = {
  onNext: () => void;
  onBack: () => void;
};

export function CustomerForm({ onNext, onBack }: CustomerFormProps) {
  const { customerInfo, deliveryInfo, setCustomerInfo, setDeliveryInfo } = useCheckoutStore();
  const [formData, setFormData] = useState<CustomerInfo>(customerInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectSavedAddress = (savedCustomerInfo: CustomerInfo, savedDeliveryInfo: DeliveryInfo) => {
    setFormData(savedCustomerInfo);
    setCustomerInfo(savedCustomerInfo);
    setDeliveryInfo(savedDeliveryInfo);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save customer info to store
    setCustomerInfo(formData);
    onNext();
  };

  return (
    <MobileForm onSubmit={handleSubmit}>
      <SavedAddressSelector 
        onSelectAddress={handleSelectSavedAddress}
        className="mb-6"
      />
      
      <MobileInput
        label="Full Name"
        id="name"
        name="name"
        placeholder="Enter your full name"
        variant="cultural"
        required
        autoComplete="name"
        value={formData.name}
        onChange={handleChange}
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
        value={formData.email}
        onChange={handleChange}
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
        value={formData.phone}
        onChange={handleChange}
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
