'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import OrderConfirmationContent from '@/components/order-confirmation/OrderConfirmationContent';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { getOrder } from '@/lib/orderStorage';
import { Order } from '@/types';

interface OrderWrapperProps {
  orderId: string;
}

export default function OrderWrapper({ orderId }: OrderWrapperProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadOrder() {
      try {
        if (!orderId) {
          router.push('/menu');
          return;
        }

        // Get order from local storage
        const orderData = getOrder(orderId);

        if (orderData) {
          setOrder(orderData);
        }
      } catch (error) {
        console.error('Error loading order:', error);
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [orderId, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8 pt-40">
        <div className="max-w-md mx-auto text-center bg-black/30 backdrop-blur-sm border border-primary/20 rounded-xl p-8">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">Order Not Found</h1>
          <p className="text-foreground/70 mb-6">
            The order you are looking for could not be found. It may have expired or been removed.
          </p>
          <button
            onClick={() => router.push('/menu')}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Return to Menu
          </button>
        </div>
      </div>
    );
  }

  return <OrderConfirmationContent order={order} />;
}