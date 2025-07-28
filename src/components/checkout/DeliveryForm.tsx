'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { MobileForm, MobileTextarea, MobileInput } from '@/components/ui/MobileForm';
import { useCheckoutStore } from '@/stores/checkout-store';
import { DeliveryInfo } from '@/types';

type DeliveryFormProps = {
  onNext: () => void;
  onBack: () => void;
};

export function DeliveryForm({ onNext, onBack }: DeliveryFormProps) {
    const { deliveryInfo, setDeliveryInfo, customerInfo } = useCheckoutStore();
    const [formData, setFormData] = useState<DeliveryInfo>({
        ...deliveryInfo,
        contactPerson: deliveryInfo.contactPerson || customerInfo.name
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Save delivery info to store
        setDeliveryInfo(formData);
        onNext();
    };

  return (
    <MobileForm onSubmit={handleSubmit}>
      <MobileTextarea
        label="Delivery Address"
        id="address"
        name="address"
        placeholder="Enter your full delivery address"
        variant="cultural"
        required
        rows={3}
        maxLength={200}
        value={formData.address}
        onChange={handleChange}
      />
      
      <MobileInput
        label="Contact Person"
        id="contactPerson"
        name="contactPerson"
        placeholder="Name of person to contact for delivery"
        variant="cultural"
        required
        value={formData.contactPerson}
        onChange={handleChange}
      />
      
      <MobileTextarea
        label="Special Instructions (Optional)"
        id="instructions"
        name="instructions"
        placeholder="e.g., ring the bell twice, leave at the door"
        variant="cultural"
        rows={2}
        maxLength={100}
        helperText="Any special delivery instructions"
        value={formData.instructions}
        onChange={handleChange}
      />
      
      <div className="flex flex-col sm:flex-row justify-between items-center mobile-gap-4 mt-8 pt-6 border-t border-primary/20">
        <Button variant="outline" onClick={onBack} type="button" className="mobile-full-width sm:w-auto">
          Back to Details
        </Button>
        <Button variant="primary" type="submit" className="mobile-full-width sm:w-auto">
          Next: Payment
        </Button>
      </div>
    </MobileForm>
  );
}
