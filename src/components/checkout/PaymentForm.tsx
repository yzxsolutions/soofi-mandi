'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { MobileForm, MobileRadioGroup, MobileInput } from '@/components/ui/MobileForm';
import { CreditCard, Landmark } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { saveOrderToStorage } from '@/lib/orderStorage';
import { Order } from '@/types';

type PaymentFormProps = {
  onBack: () => void;
};

export function PaymentForm({ onBack }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { items, getTotal, getSubtotal, getTax, getDeliveryCharge, clearCart } = useCartStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Generate order ID
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      // Create order object
      const order: Order = {
        id: orderId,
        orderNumber: `ORD-${orderId}`,
        items: items,
        customer: {
          name: 'Customer', // This would come from form data
          email: 'customer@example.com',
          phone: '+1234567890'
        },
        delivery: {
          address: 'Customer Address',
          contactPerson: 'Customer'
        },
        payment: {
          method: paymentMethod === 'cod' ? 'cash' : 'online',
          status: 'completed',
          amount: getTotal()
        },
        status: 'confirmed',
        timestamps: {
          created: new Date()
        },
        subtotal: getSubtotal(),
        tax: getTax(),
        deliveryCharge: getDeliveryCharge(),
        discount: 0,
        total: getTotal()
      };

      // Save order to local storage
      saveOrderToStorage(order);

      // Clear cart
      clearCart();

      // Redirect to confirmation page
      router.push(`/order-confirmation/${orderId}`);
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MobileForm onSubmit={handleSubmit}>
      <MobileRadioGroup
        name="paymentMethod"
        label="Payment Method"
        value={paymentMethod}
        onChange={setPaymentMethod}
        options={[
          { 
            value: 'cod', 
            label: 'Cash on Delivery', 
            description: 'Pay when your order arrives' 
          },
          { 
            value: 'online', 
            label: 'Pay Online', 
            description: 'Credit/Debit card or digital wallet' 
          },
        ]}
      />

      {paymentMethod === 'online' && (
        <div className="mobile-card mobile-space-y-4 animate-fade-in-up">
          <h4 className="mobile-subheading text-foreground">Enter Card Details</h4>
          
          <MobileInput
            label="Card Number"
            id="cardNumber"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            variant="cultural"
            required
            leftIcon={<CreditCard className="w-5 h-5" />}
          />
          
          <div className="grid grid-cols-2 mobile-gap-4">
            <MobileInput
              label="Expiry Date"
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/YY"
              variant="cultural"
              required
            />
            <MobileInput
              label="CVC"
              id="cvc"
              name="cvc"
              placeholder="123"
              variant="cultural"
              required
            />
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center mobile-gap-4 mt-8 pt-6 border-t border-primary/20">
        <Button variant="outline" onClick={onBack} type="button" className="mobile-full-width sm:w-auto">
          Back to Delivery
        </Button>
        <Button variant="primary" type="submit" size="lg" className="mobile-full-width sm:w-auto">
          Place Order
        </Button>
      </div>
    </MobileForm>
  );
}
