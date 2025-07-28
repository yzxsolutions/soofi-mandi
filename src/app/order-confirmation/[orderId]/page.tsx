// This is a server component
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import OrderWrapper from './OrderWrapper.tsx';

// We no longer need generateStaticParams since we removed 'output: export' from next.config.js

interface OrderConfirmationPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export default async function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const { orderId } = await params;

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" />
        </div>
      }>
        <OrderWrapper orderId={orderId} />
      </Suspense>
    </div>
  );
}