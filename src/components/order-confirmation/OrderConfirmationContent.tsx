'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, Clock, MapPin, Phone, Mail, CreditCard, Printer, Share2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Order } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import OrderSummarySection from './OrderSummarySection';
import CustomerDetailsSection from './CustomerDetailsSection';
import DeliveryDetailsSection from './DeliveryDetailsSection';
import PaymentDetailsSection from './PaymentDetailsSection';
import OrderActionsSection from './OrderActionsSection';
import NewsletterSignup from './NewsletterSignup';

interface OrderConfirmationContentProps {
  order: Order;
}

export default function OrderConfirmationContent({ order }: OrderConfirmationContentProps) {
  const router = useRouter();

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleShareOrder = async () => {
    const shareData = {
      title: `Soofi Mandi Order ${order?.orderNumber}`,
      text: `My order from Soofi Mandi has been confirmed! Order #${order?.orderNumber}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Order link copied to clipboard!');
    }
  };

  const handleReturnToMenu = () => {
    router.push('/menu');
  };

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card variant="elevated" className="max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <div className="text-red-500 mb-4">
              <CheckCircle className="w-16 h-16 mx-auto" />
            </div>
            <h1 className="text-h2 text-foreground mb-4">Order Not Found</h1>
            <p className="text-body text-foreground/70 mb-6">
              {'The order you are looking for could not be found.'}
            </p>
            <Button onClick={handleReturnToMenu} variant="primary">
              Return to Menu
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate estimated delivery time (45 minutes from order time)
  const createdTime = new Date(order.timestamps.created);
  const estimatedDeliveryTime = new Date(createdTime.getTime() + 45 * 60 * 1000);

  return (
    <div className="container mx-auto px-4 py-8 print:p-0 pt-40">
      {/* Success Header */}
      <div className="text-center mb-8 print:mb-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 print:w-16 print:h-16">
          <CheckCircle className="w-12 h-12 text-green-600 print:w-10 print:h-10" />
        </div>
        <h1 className="text-display text-foreground mb-2 print:text-h1">
          Order Confirmed!
        </h1>
        <p className="text-body-lg text-foreground/70 mb-4">
          Thank you for choosing Soofi Mandi. Your order has been received and is being prepared.
        </p>
        
        {/* Order Number and Delivery Time */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-6">
          <div className="text-center">
            <p className="text-sm text-foreground/60 uppercase tracking-wide">Order Number</p>
            <p className="text-h3 text-primary font-bold">{order.orderNumber}</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-border"></div>
          <div className="text-center">
            <p className="text-sm text-foreground/60 uppercase tracking-wide flex items-center justify-center gap-1">
              <Clock className="w-4 h-4" />
              Estimated Delivery
            </p>
            <p className="text-h3 text-foreground">
              {estimatedDeliveryTime.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print:gap-4">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6 print:space-y-4">
          {/* Order Summary */}
          <OrderSummarySection order={order} />
          
          {/* Customer Details */}
          <CustomerDetailsSection order={order} />
          
          {/* Delivery Details */}
          <DeliveryDetailsSection order={order} />
          
          {/* Payment Details */}
          <PaymentDetailsSection order={order} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6 print:hidden">
          {/* Order Actions */}
          <OrderActionsSection 
            onPrint={handlePrintReceipt}
            onShare={handleShareOrder}
            onReturnToMenu={handleReturnToMenu}
          />
          
          {/* Newsletter Signup */}
          <NewsletterSignup />
          
          {/* Restaurant Contact */}
          <Card variant="cultural">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-sm text-foreground/60">Call us</p>
                    <p className="text-body font-medium">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-sm text-foreground/60">Email us</p>
                    <p className="text-body font-medium">orders@soofimandi.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-sm text-foreground/60">Visit us</p>
                    <p className="text-body font-medium">123 Arabian Street, Food District</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Policies */}
          <Card variant="default">
            <CardHeader>
              <CardTitle>Order Policies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-foreground/70">
                <div>
                  <h4 className="font-medium text-foreground mb-1">Modifications</h4>
                  <p>Order modifications are accepted up to 10 minutes after confirmation. Please call us immediately if you need to make changes.</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Cancellation</h4>
                  <p>Orders can be cancelled within 15 minutes of confirmation for a full refund. After preparation begins, cancellation may incur charges.</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Delivery</h4>
                  <p>We deliver within a 5-mile radius. Delivery times may vary based on weather and traffic conditions.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}