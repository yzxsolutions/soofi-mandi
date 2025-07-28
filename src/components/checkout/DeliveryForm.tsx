'use client';

import { Button } from '@/components/ui/Button';
import { MobileForm, MobileTextarea, MobileRadioGroup } from '@/components/ui/MobileForm';

type DeliveryFormProps = {
  onNext: () => void;
  onBack: () => void;
};

export function DeliveryForm({ onNext, onBack }: DeliveryFormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext();
    };

  return (
    <MobileForm onSubmit={handleSubmit}>
      <MobileRadioGroup
        name="deliveryTime"
        label="Delivery Time"
        options={[
          { value: 'asap', label: 'ASAP', description: 'Deliver as soon as possible' },
          { value: 'schedule', label: 'Schedule', description: 'Choose a specific time' },
        ]}
      />

      <MobileTextarea
        label="Delivery Address"
        id="address"
        name="address"
        placeholder="Enter your full delivery address"
        variant="cultural"
        required
        rows={3}
        maxLength={200}
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
