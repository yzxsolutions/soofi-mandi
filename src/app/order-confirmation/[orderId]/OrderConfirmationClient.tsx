'use client';

import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { useRouter } from 'next/navigation';
import OrderConfirmationContent from '@/components/order-confirmation/OrderConfirmationContent';
import { getOrder } from '@/lib/orderStorage';

// This script will run on the client side to hydrate the order confirmation page
export default function OrderConfirmationClientScript() {
  const router = useRouter();

  useEffect(() => {
    // Find the container element
    const container = document.getElementById('order-confirmation-container');
    if (!container) return;

    // Get the order ID from the data attribute
    const orderId = container.getAttribute('data-order-id');
    if (!orderId) {
      router.push('/menu');
      return;
    }

    // Get order from local storage
    const order = getOrder(orderId);

    // Create a root for rendering
    const root = createRoot(container);

    if (!order) {
      // Render the "Order Not Found" UI
      root.render(
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
    } else {
      // Render the order confirmation content
      root.render(<OrderConfirmationContent order={order} />);
    }
  }, [router]);

  // This component doesn't render anything itself
  return null;
}