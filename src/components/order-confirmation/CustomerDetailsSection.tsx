'use client';

import { User, Phone, Mail } from 'lucide-react';
import { Order } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface CustomerDetailsSectionProps {
  order: Order;
}

export default function CustomerDetailsSection({ order }: CustomerDetailsSectionProps) {
  return (
    <Card variant="default">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Customer Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-foreground/60">Name</p>
              <p className="text-body font-medium text-foreground truncate">
                {order.customer.name}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-foreground/60">Phone</p>
              <p className="text-body font-medium text-foreground truncate">
                {order.customer.phone}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-foreground/60">Email</p>
              <p className="text-body font-medium text-foreground truncate">
                {order.customer.email}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}