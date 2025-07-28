'use client';

import { useState } from 'react';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Edit3, Trash2, Plus, Minus, X } from 'lucide-react';
import Image from 'next/image';

interface OrderModificationProps {
  onClose: () => void;
}

export function OrderModification({ onClose }: OrderModificationProps) {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const [editingItem, setEditingItem] = useState<string | null>(null);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
    setEditingItem(null);
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-brown-200">
          <h2 className="text-lg sm:text-xl font-semibold text-brown-900">
            Modify Your Order
          </h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Items List */}
        <div className="overflow-y-auto max-h-[60vh] p-4 sm:p-6">
          <div className="space-y-4">
            {items.map((item) => (
              <Card
                key={item.id}
                className="p-4 border border-brown-200"
              >
                <div className="flex gap-3">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-brown-900 text-sm sm:text-base truncate">
                      {item.name}
                    </h3>
                    <div className="text-xs sm:text-sm text-brown-600 mt-1">
                      <p>Size: {item.customizations.size}</p>
                      <p>Spice: {item.customizations.spiceLevel}</p>
                      {item.customizations.addOns.length > 0 && (
                        <p>Add-ons: {item.customizations.addOns.join(', ')}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-8 h-8 p-0 touch-manipulation"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-medium text-sm">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-8 h-8 p-0 touch-manipulation"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      {/* Price and Remove */}
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-brown-900 text-sm">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-600 hover:text-red-700 w-8 h-8 p-0 touch-manipulation"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-brown-200 p-4 sm:p-6 bg-cream-50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-brown-900">
              Total: ${getTotal().toFixed(2)}
            </span>
            <span className="text-sm text-brown-600">
              {items.length} item{items.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 touch-manipulation"
            >
              Continue Shopping
            </Button>
            <Button
              onClick={onClose}
              className="flex-1 bg-gold-500 hover:bg-gold-600 text-brown-900 touch-manipulation"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}