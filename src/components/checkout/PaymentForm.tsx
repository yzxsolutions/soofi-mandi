'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { MobileForm, MobileRadioGroup } from '@/components/ui/MobileForm';
import { useCartStore } from '@/stores/cart-store';
import { useCheckoutStore } from '@/stores/checkout-store';
import { saveOrderToStorage } from '@/lib/orderStorage';
import { Order, PaymentInfo } from '@/types';

type PaymentFormProps = {
  onBack: () => void;
};

export function PaymentForm({ onBack }: PaymentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { items, getTotal, getSubtotal, getTax, getDeliveryCharge, clearCart } = useCartStore();
  const { customerInfo, deliveryInfo, paymentInfo, setPaymentInfo, resetCheckout } = useCheckoutStore();
  const [paymentMethod, setPaymentMethod] = useState<PaymentInfo['method']>(paymentInfo.method);

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value as PaymentInfo['method']);
    setPaymentInfo({ method: value as PaymentInfo['method'] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Generate order ID
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      // Create order object with actual customer and delivery data
      const order: Order = {
        id: orderId,
        orderNumber: orderId.substring(0, 10),
        items: items,
        customer: {
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone
        },
        delivery: {
          address: deliveryInfo.address,
          instructions: deliveryInfo.instructions,
          scheduledTime: deliveryInfo.scheduledTime ? new Date(deliveryInfo.scheduledTime) : undefined,
          contactPerson: deliveryInfo.contactPerson
        },
        payment: {
          method: paymentMethod,
          status: 'completed',
          amount: getTotal()
        },
        status: 'confirmed',
        timestamps: {
          created: new Date(),
          confirmed: new Date()
        },
        subtotal: getSubtotal(),
        tax: getTax(),
        deliveryCharge: getDeliveryCharge(),
        discount: 0,
        total: getTotal()
      };

      // Save order to local storage
      saveOrderToStorage(order);

      // Clear cart and checkout data
      clearCart();
      resetCheckout();

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
        label="Payment Method"
        name="paymentMethod"
        value={paymentMethod}
        onChange={handlePaymentMethodChange}
        options={[
          { value: 'cash', label: 'Cash on Delivery' },
          { value: 'online', label: 'Online Payment (Pay Now)' }
        ]}
      />
      
      {paymentMethod === 'cash' && (
        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 mb-6">
          <h3 className="text-lg font-medium mb-2">Cash on Delivery</h3>
          <p className="text-foreground/70 text-sm">
            You&apos;ll pay when your order arrives. Please have the exact amount ready.
          </p>
        </div>
      )}
      
      {paymentMethod === 'online' && (
        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 mb-6">
          <h3 className="text-lg font-medium mb-2">Online Payment</h3>
          <p className="text-foreground/70 text-sm">
            This is a demo application. No actual payment will be processed.
          </p>
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
