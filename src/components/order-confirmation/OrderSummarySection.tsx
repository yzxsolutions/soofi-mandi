'use client';

import { Order } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';

interface OrderSummarySectionProps {
  order: Order;
}

export default function OrderSummarySection({ order }: OrderSummarySectionProps) {
  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Order Items */}
          {order.items.map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex gap-4 pb-4 border-b border-border last:border-b-0 last:pb-0">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder-food.svg';
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-body font-medium text-foreground truncate pr-2">
                    {item.name}
                  </h4>
                  <span className="text-body font-semibold text-foreground whitespace-nowrap">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-foreground/70">
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.customizations.size}</p>
                  <p>Spice Level: {item.customizations.spiceLevel}</p>
                  {item.customizations.addOns.length > 0 && (
                    <p>Add-ons: {item.customizations.addOns.join(', ')}</p>
                  )}
                  {item.customizations.specialInstructions && (
                    <p>Special Instructions: {item.customizations.specialInstructions}</p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Order Totals */}
          <div className="pt-4 border-t border-border space-y-2">
            <div className="flex justify-between text-body">
              <span className="text-foreground/70">Subtotal</span>
              <span className="text-foreground">{formatCurrency(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-body">
                <span className="text-foreground/70">Discount</span>
                <span className="text-green-600">-{formatCurrency(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-body">
              <span className="text-foreground/70">Tax</span>
              <span className="text-foreground">{formatCurrency(order.tax)}</span>
            </div>
            <div className="flex justify-between text-body">
              <span className="text-foreground/70">Delivery Charge</span>
              <span className="text-foreground">{formatCurrency(order.deliveryCharge)}</span>
            </div>
            <div className="flex justify-between text-h3 font-bold pt-2 border-t border-border">
              <span className="text-foreground">Total</span>
              <span className="text-primary">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}