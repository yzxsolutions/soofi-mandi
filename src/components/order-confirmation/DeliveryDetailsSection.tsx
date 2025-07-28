'use client';

import { MapPin, Clock, MessageSquare, User } from 'lucide-react';
import { Order } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface DeliveryDetailsSectionProps {
  order: Order;
}

export default function DeliveryDetailsSection({ order }: DeliveryDetailsSectionProps) {
  const formatScheduledTime = (scheduledTime?: Date | string) => {
    if (!scheduledTime) return 'ASAP';
    
    const date = typeof scheduledTime === 'string' ? new Date(scheduledTime) : scheduledTime;
    
    return date.toLocaleString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card variant="default">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Delivery Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Delivery Address */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-foreground/60 mb-1">Delivery Address</p>
              <p className="text-body text-foreground leading-relaxed">
                {order.delivery.address}
              </p>
            </div>
          </div>

          {/* Contact Person */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-foreground/60">Contact Person</p>
              <p className="text-body font-medium text-foreground">
                {order.delivery.contactPerson}
              </p>
            </div>
          </div>

          {/* Scheduled Time */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-foreground/60">Delivery Time</p>
              <p className="text-body font-medium text-foreground">
                {formatScheduledTime(order.delivery.scheduledTime)}
              </p>
            </div>
          </div>

          {/* Special Instructions */}
          {order.delivery.instructions && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-foreground/60 mb-1">Special Instructions</p>
                <p className="text-body text-foreground leading-relaxed">
                  {order.delivery.instructions}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}