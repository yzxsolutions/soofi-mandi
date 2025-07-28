'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Clock, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Order } from '@/types';
import { getAllOrders } from '@/lib/orderStorage';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Get all orders from local storage
    const recentOrders = getAllOrders();
    setOrders(recentOrders);
  }, []);

  const formatOrderDate = (date: Date) => {
    return new Date(date).toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center pt-20">
        <div className="text-center p-8">
          <ShoppingBag className="w-16 h-16 mx-auto text-primary/50 mb-6" />
          <h1 className="text-h2 text-foreground mb-4">No Recent Orders</h1>
          <p className="text-body text-foreground/70 mb-8 max-w-md">
            You dont have any recent orders. Browse our menu to place an order.
          </p>
          <Link href="/menu">
            <Button variant="primary" size="lg">
              Browse Our Menu
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-28 sm:pt-32 pb-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/menu" className="hidden sm:block">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Menu
              </Button>
            </Link>
            <h1 className="text-h1 text-foreground">Recent Orders</h1>
          </div>
        </div>

        {/* Orders List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <Card key={order.id} className="bg-black/30 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">
                    Order #{order.orderNumber.slice(-8)}
                  </CardTitle>
                  <span className="text-xs text-foreground/60 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatOrderDate(order.timestamps.created)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Order Items Summary */}
                  <div className="space-y-2">
                    {order.items.slice(0, 2).map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-foreground/80">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="text-foreground font-medium">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <div className="text-xs text-foreground/60 italic">
                        +{order.items.length - 2} more items
                      </div>
                    )}
                  </div>

                  {/* Order Total */}
                  <div className="flex justify-between pt-2 border-t border-primary/10">
                    <span className="font-medium">Total</span>
                    <span className="font-bold text-primary">
                      {formatCurrency(order.total)}
                    </span>
                  </div>

                  {/* Status and View Button */}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-500 rounded-full">
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/order-confirmation/${order.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Back to Menu Button */}
        <div className="mt-12 text-center">
          <Link href="/menu">
            <Button variant="secondary" className="gap-2">
              <ShoppingCart className="w-4 h-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}