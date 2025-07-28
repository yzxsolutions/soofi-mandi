'use client';

import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

type OrderSummaryProps = {
  onNext?: () => void;
  isCompact?: boolean;
};

export function OrderSummary({ onNext, isCompact = false }: OrderSummaryProps) {
  const { items, getTotal, getSubtotal, removeItem, updateQuantity } = useCartStore();
  const tax = getTotal() - (getSubtotal ? getSubtotal() : getTotal());

  return (
    <div className="flex flex-col h-full">
      {/* The compact version (sidebar/mobile drawer) gets its own header and padding */}
      {isCompact && (
        <div className="p-6 border-b border-primary/20">
          <h3 className="text-h3 text-foreground">Order Summary</h3>
        </div>
      )}

      {/* Main content area with scrolling for long lists */}
      <div className={`flex-1 space-y-6 ${isCompact ? 'p-6' : ''} overflow-y-auto`}>
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 items-start">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground truncate">{item.name}</h4>
              <p className="text-sm text-foreground/70">{formatCurrency(item.price)}</p>
              {!isCompact && (
                 <div className="flex items-center gap-2 mt-2">
                    <Button variant="outline" size="sm" className="w-7 h-7" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button variant="outline" size="sm" className="w-7 h-7" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                 </div>
              )}
            </div>
            <div className="text-right">
                <p className="font-semibold text-foreground">
                    {formatCurrency(item.price * item.quantity)}
                </p>
                {!isCompact && (
                    <Button variant="ghost" size="sm" className="text-foreground/50 hover:text-error mt-1" onClick={() => removeItem(item.id)}>
                        <Trash2 className="w-4 h-4" />
                    </Button>
                )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer section for totals and buttons */}
      <div className={`mt-auto ${isCompact ? 'p-6 border-t border-primary/20' : 'pt-6'}`}>
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-body text-foreground/80">
            <span>Subtotal</span>
            <span>{formatCurrency(getSubtotal ? getSubtotal() : getTotal())}</span>
          </div>
          <div className="flex justify-between text-body text-foreground/80">
            <span>Tax & Fees</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className="flex justify-between text-h3 font-bold text-foreground pt-2 mt-2 border-t border-primary/20">
            <span>Total</span>
            <span className="text-primary">{formatCurrency(getTotal())}</span>
          </div>
        </div>

        {!isCompact && onNext && (
          <Button onClick={onNext} variant="primary" size="lg" className="w-full">
            Proceed to Details
          </Button>
        )}
      </div>
    </div>
  );
}
