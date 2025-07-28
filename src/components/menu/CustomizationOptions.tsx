'use client';

import { useState } from 'react';
import { Plus, Minus, ShoppingCart, Flame, Clock } from 'lucide-react';
import { MenuItem, CartItem } from '@/types';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/stores/cart-store';

interface CustomizationOptionsProps {
  item: MenuItem;
}

export default function CustomizationOptions({ item }: CustomizationOptionsProps) {
  const [selectedSize, setSelectedSize] = useState<'Quarter' | 'Half' | 'Full'>('Full');
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState<'mild' | 'medium' | 'hot'>(item.spiceLevel);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [addingToCart, setAddingToCart] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const handleAddOnToggle = (addOn: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOn) 
        ? prev.filter(a => a !== addOn)
        : [...prev, addOn]
    );
  };

  const calculatePrice = () => {
    let basePrice = item.price;
    
    // Apply size pricing
    const sizeOption = item.customizations.sizes.find(s => s.name === selectedSize);
    if (sizeOption) {
      basePrice += sizeOption.price;
    }

    // Apply add-ons pricing
    const addOnPrice = selectedAddOns.reduce((total, addOnName) => {
      const addOn = item.customizations.addOns.find(a => a.name === addOnName);
      return total + (addOn?.price || 0);
    }, 0);

    return (basePrice + addOnPrice) * quantity;
  };

  const handleAddToCart = async () => {
    setAddingToCart(true);
    
    const cartItem: CartItem = {
      id: item.id,
      name: item.name,
      price: calculatePrice() / quantity, // Price per item
      quantity,
      image: item.images[0] || '/images/placeholder-food.jpg',
      customizations: {
        size: selectedSize,
        spiceLevel: selectedSpiceLevel,
        addOns: selectedAddOns,
        specialInstructions: specialInstructions.trim() || undefined,
      },
    };

    addItem(cartItem);
    
    // Simulate loading state
    await new Promise(resolve => setTimeout(resolve, 800));
    setAddingToCart(false);
  };

  const getSpiceIcon = (level: string) => {
    switch (level) {
      case 'mild':
        return <Flame className="w-4 h-4 text-green-500" />;
      case 'medium':
        return <Flame className="w-4 h-4 text-yellow-500" />;
      case 'hot':
        return <Flame className="w-4 h-4 text-red-500" />;
      default:
        return <Flame className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-gray-700/50 space-y-10 shadow-2xl">
      {/* Enhanced Price Display */}
      <div className="text-center py-8 bg-gradient-to-br from-gray-800/40 to-gray-800/60 rounded-3xl border border-gray-700/40 shadow-lg">
        <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-shimmer-text mb-3">
          ₹{calculatePrice()}
        </div>
        <div className="text-base text-foreground/70 font-medium">
          Total for {quantity} item{quantity > 1 ? 's' : ''}
        </div>
        <div className="mt-3 w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto opacity-60"></div>
      </div>

      {/* Enhanced Size Selection */}
      {item.customizations.sizes.length > 1 && (
        <div>
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4a1 1 0 011-1h4m0 0V1m0 2h2m0 0V1m0 2h2m0 0V1m0 2h4a1 1 0 011 1v4m0 0h2m-2 0v2m2 0h2m-2 0v2m2 0v4a1 1 0 01-1 1h-4m0 0v2m0-2h-2m0 2v2m0-2h-2m0 2v2m0-2h-4a1 1 0 01-1-1v-4m0 0H1m2 0v-2m-2 0H1m2 0v-2m-2 0V8" />
            </svg>
            Choose Your Size
          </h3>
          <div className="space-y-4">
            {item.customizations.sizes.map((size) => (
              <button
                key={size.name}
                onClick={() => setSelectedSize(size.name as 'Quarter' | 'Half' | 'Full')}
                className={`w-full p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-[1.02] ${
                  selectedSize === size.name
                    ? 'border-primary bg-gradient-to-r from-primary/15 to-secondary/15 shadow-lg shadow-primary/25'
                    : 'border-gray-700/50 bg-gradient-to-br from-gray-800/40 to-gray-800/60 hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="font-bold text-foreground text-lg">{size.name}</div>
                    <div className="text-sm text-foreground/70 font-medium">{size.description}</div>
                  </div>
                  <div className="text-primary font-bold text-lg">
                    {size.price >= 0 ? '+' : ''}₹{size.price}
                  </div>
                </div>
                {selectedSize === size.name && (
                  <div className="mt-3 w-full h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Spice Level */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
          <Flame className="w-6 h-6 text-primary" />
          Spice Level
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {['mild', 'medium', 'hot'].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedSpiceLevel(level as 'mild' | 'medium' | 'hot')}
              className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                selectedSpiceLevel === level
                  ? 'border-primary bg-gradient-to-br from-primary/15 to-secondary/15 shadow-lg shadow-primary/25'
                  : 'border-gray-700/50 bg-gradient-to-br from-gray-800/40 to-gray-800/60 hover:border-primary/50 hover:bg-primary/5'
              }`}
            >
              <div className="transform transition-transform duration-300 hover:scale-110">
                {getSpiceIcon(level)}
              </div>
              <span className="capitalize font-bold text-foreground">{level}</span>
              {selectedSpiceLevel === level && (
                <div className="w-full h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Add-ons */}
      {item.customizations.addOns.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Plus className="w-6 h-6 text-primary" />
            Delicious Add-ons
          </h3>
          <div className="space-y-4">
            {item.customizations.addOns.map((addOn) => (
              <button
                key={addOn.name}
                onClick={() => handleAddOnToggle(addOn.name)}
                className={`w-full flex justify-between items-center p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                  selectedAddOns.includes(addOn.name)
                    ? 'border-primary bg-gradient-to-r from-primary/15 to-secondary/15 shadow-lg shadow-primary/25'
                    : 'border-gray-700/50 bg-gradient-to-br from-gray-800/40 to-gray-800/60 hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                    selectedAddOns.includes(addOn.name)
                      ? 'border-primary bg-primary'
                      : 'border-gray-500'
                  }`}>
                    {selectedAddOns.includes(addOn.name) && (
                      <svg className="w-3 h-3 text-white m-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="font-bold text-foreground text-lg">{addOn.name}</span>
                </div>
                <span className="font-bold text-primary text-lg">+QR {addOn.price.toFixed(2)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Special Instructions */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Special Instructions
        </h3>
        <div className="relative">
          <textarea
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder="Tell us about any special requests, dietary requirements, or preferences..."
            className="w-full p-6 bg-gradient-to-br from-gray-800/40 to-gray-800/60 border-2 border-gray-700/50 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-foreground placeholder-foreground/60 resize-none backdrop-blur-sm text-base leading-relaxed"
            rows={5}
            maxLength={200}
          />
          <div className="absolute bottom-3 right-3 text-xs text-foreground/50 font-medium bg-gray-900/50 px-2 py-1 rounded-lg">
            {specialInstructions.length}/200
          </div>
        </div>
      </div>

      {/* Enhanced Quantity Selector */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v2a1 1 0 01-1 1h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V8H3a1 1 0 01-1-1V5a1 1 0 011-1h4zM9 3v1h6V3H9zm0 5v10h6V8H9z" />
          </svg>
          Quantity
        </h3>
        <div className="flex items-center justify-center gap-8 bg-gradient-to-br from-gray-800/40 to-gray-800/60 rounded-2xl p-8 border border-gray-700/50">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 ${
              quantity <= 1 
                ? 'bg-gray-800/30 border-gray-700/30 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-br from-gray-700/60 to-gray-700/80 hover:bg-primary/20 border-gray-600/50 hover:border-primary/50 text-foreground hover:text-primary hover:scale-110 shadow-lg hover:shadow-xl'
            }`}
          >
            <Minus className="w-7 h-7" />
          </button>
          <div className="flex flex-col items-center min-w-[100px]">
            <span className="text-5xl font-bold text-foreground text-center transition-all duration-300 hover:text-primary">
              {quantity}
            </span>
            {quantity > 10 && (
              <span className="text-sm text-yellow-400 mt-2 font-medium">Large order!</span>
            )}
          </div>
          <button
            onClick={() => setQuantity(Math.min(50, quantity + 1))}
            disabled={quantity >= 50}
            className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 ${
              quantity >= 50 
                ? 'bg-gray-800/30 border-gray-700/30 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-br from-gray-700/60 to-gray-700/80 hover:bg-primary/20 border-gray-600/50 hover:border-primary/50 text-foreground hover:text-primary hover:scale-110 shadow-lg hover:shadow-xl'
            }`}
          >
            <Plus className="w-7 h-7" />
          </button>
        </div>
        {quantity >= 50 && (
          <p className="text-sm text-yellow-400 text-center mt-4 font-medium bg-yellow-400/10 p-3 rounded-xl border border-yellow-400/20">
            Maximum quantity reached. For larger orders, please contact us directly.
          </p>
        )}
      </div>

      {/* Enhanced Add to Cart Button */}
      <div className="relative">
        <Button
          onClick={handleAddToCart}
          disabled={!item.isAvailable || addingToCart}
          className={`w-full py-6 font-bold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg relative overflow-hidden ${
            item.isAvailable 
              ? 'bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]' 
              : 'bg-gray-700/50 text-gray-400 border border-gray-600/50'
          }`}
        >
          {/* Animated background for success state */}
          {addingToCart && (
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 animate-pulse" />
          )}
          
          <div className="relative z-10 flex items-center gap-3">
            {addingToCart ? (
              <>
                <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Adding to Cart...</span>
              </>
            ) : (
              <>
                <ShoppingCart className={`w-6 h-6 transition-transform duration-200 ${!item.isAvailable ? '' : 'group-hover:scale-110'}`} />
                <span>{item.isAvailable ? 'Add to Cart' : 'Currently Unavailable'}</span>
              </>
            )}
          </div>
          
          {/* Ripple effect */}
          {item.isAvailable && !addingToCart && (
            <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
        </Button>
        
        {/* Success animation overlay */}
        {addingToCart && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Additional Info */}
      <div className="bg-gradient-to-r from-gray-800/30 to-gray-800/40 rounded-2xl p-6 border border-gray-700/30">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <div className="flex items-center justify-center gap-3 text-foreground/80">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <div className="font-semibold">Free Delivery</div>
              <div className="text-sm text-foreground/60">On orders over QR 50</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 text-foreground/80">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-semibold">{item.preparationTime} Minutes</div>
              <div className="text-sm text-foreground/60">Preparation time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}