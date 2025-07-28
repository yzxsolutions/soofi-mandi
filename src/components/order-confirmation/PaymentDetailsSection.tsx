'use client';

import { CreditCard, DollarSign, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Order } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';

interface PaymentDetailsSectionProps {
  order: Order;
}

export default function PaymentDetailsSection({ order }: PaymentDetailsSectionProps) {
  const getPaymentMethodDisplay = (method: string) => {
    switch (method) {
      case 'cod':
        return 'Cash on Delivery';
      case 'online':
        return 'Online Payment';
      default:
        return method;
    }
  };

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Payment Completed';
      case 'pending':
        return 'Payment Pending';
      case 'failed':
        return 'Payment Failed';
      default:
        return 'Unknown Status';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <Card variant="default">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Payment Method */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-foreground/60">Payment Method</p>
              <p className="text-body font-medium text-foreground">
                {getPaymentMethodDisplay(order.payment.method)}
              </p>
            </div>
          </div>

          {/* Payment Amount */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-foreground/60">Amount</p>
              <p className="text-body font-medium text-foreground">
                {formatCurrency(order.payment.amount)}
              </p>
            </div>
          </div>

          {/* Payment Status */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              {getPaymentStatusIcon(order.payment.status)}
            </div>
            <div className="min-w-0">
              <p className="text-sm text-foreground/60">Status</p>
              <p className={`text-body font-medium ${getPaymentStatusColor(order.payment.status)}`}>
                {getPaymentStatusText(order.payment.status)}
              </p>
            </div>
          </div>

          {/* Payment Instructions for Cash on Delivery */}
          {order.payment.method === 'cash' && order.payment.status === 'pending' && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800 mb-1">
                    Cash on Delivery Instructions
                  </h4>
                  <p className="text-sm text-yellow-700">
                    Please have the exact amount ready ({formatCurrency(order.payment.amount)}) 
                    when our delivery person arrives. We appreciate your business!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Payment Success Message for Online Payment */}
          {order.payment.method === 'online' && order.payment.status === 'completed' && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-green-800 mb-1">
                    Payment Successful
                  </h4>
                  <p className="text-sm text-green-700">
                    Your payment has been processed successfully. You will receive a receipt via email shortly.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}