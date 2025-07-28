'use client';

import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import OrderConfirmationContent from '@/components/order-confirmation/OrderConfirmationContent';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface OrderConfirmationPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export default function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" />
        </div>
      }>
        <OrderConfirmationWrapper params={params} />
      </Suspense>
    </div>
  );
}

async function OrderConfirmationWrapper({ params }: OrderConfirmationPageProps) {
  const { orderId } = await params;

  if (!orderId) {
    notFound();
  }

  // For now, create a mock order since we don't have a real order system
  const mockOrder = {
    id: orderId,
    orderNumber: `ORD-${orderId}`,
    items: [],
    customer: { name: '', phone: '', email: '' },
    delivery: { address: '', contactPerson: '' },
    payment: { method: 'cash' as const, status: 'completed' as const, amount: 0 },
    status: 'confirmed' as const,
    timestamps: { created: new Date() },
    subtotal: 0,
    tax: 0,
    deliveryCharge: 0,
    discount: 0,
    total: 0
  };

  return <OrderConfirmationContent order={mockOrder} />;
}