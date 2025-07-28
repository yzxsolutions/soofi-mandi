'use client';

import { useState } from 'react';
import { X, Star, Clock, Flame, Leaf, Plus, Minus, ShoppingCart } from 'lucide-react';
import { MenuItem, CartItem } from '@/types';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/stores/cart-store';
import Image from 'next/image';

interface QuickViewModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ item, isOpen, onClose }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState<'Quarter' | 'Half' | 'Full'>('Full');
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState<'mild' | 'medium' | 'hot'>('mild');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [addingToCart, setAddingToCart] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  if (!isOpen || !item) return null;

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
    
    onClose();
    
    // Reset form
    setSelectedSize('Full');
    setSelectedSpiceLevel('mild');
    setSelectedAddOns([]);
    setQuantity(1);
    setSpecialInstructions('');
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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-up">
      <div className="bg-black/80 backdrop-blur-xl rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700/50 shadow-2xl animate-nav-entrance">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-700/50 p-6 flex justify-between items-center rounded-t-3xl">
          <h2 className="text-2xl font-bold text-foreground">Quick View</h2>
          <button
            onClick={onClose}
            className="text-foreground/60 hover:text-foreground transition-colors p-2 hover:bg-gray-800/50 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          {/* Item Image and Basic Info */}
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            {/* Spinning Image */}
            <div className="relative w-full lg:w-80 h-80 rounded-3xl overflow-hidden">
              <div className="animate-spin-slow w-full h-full">
                <Image
                  src={
                    item.images && item.images.length > 0
                      ? item.images[0]
                      : "/images/mandi/mandi.png"
                  }
                  alt={item.name}
                  fill
                  className="object-cover rounded-3xl"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/mandi/mandi.png";
                  }}
                />
              </div>
              
              {/* Availability Badge */}
              {!item.isAvailable && (
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                    Unavailable
                  </span>
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="flex-1 space-y-6">
              <div>
                <h3 className="text-h2 text-foreground mb-3">{item.name}</h3>
                <p className="text-body text-foreground/70 leading-relaxed">{item.description}</p>
              </div>
              
              {/* Details Row */}
              <div className="flex items-center gap-6 text-sm text-foreground/60">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{item.averageRating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{item.preparationTime} min</span>
                </div>
                <div className="flex items-center gap-2">
                  {getSpiceIcon(item.spiceLevel)}
                  <span className="capitalize">{item.spiceLevel}</span>
                </div>
                {item.isVegetarian && (
                  <div className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-green-500" />
                    <span>Vegetarian</span>
                  </div>
                )}
              </div>

              {/* Ingredients */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50">
                <h4 className="font-semibold text-foreground mb-2">Ingredients</h4>
                <p className="text-sm text-foreground/70">{item.ingredients.join(', ')}</p>
              </div>

              {/* Price Display */}
              <div className="text-center py-4">
                <span className="text-4xl font-bold text-primary warm-gradient bg-clip-text text-transparent animate-shimmer-text">
                  ₹{calculatePrice()}
                </span>
                <div className="text-sm text-foreground/60 mt-1">
                  Total for {quantity} item{quantity > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </div>

          {/* Customization Options */}
          <div className="space-y-8">
            {/* Size Selection */}
            {item.customizations.sizes.length > 1 && (
              <div>
                <h4 className="font-semibold text-foreground mb-4">Choose Size</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {item.customizations.sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size.name as 'Quarter' | 'Half' | 'Full')}
                      className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 ${
                        selectedSize === size.name
                          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/25'
                          : 'border-gray-700/50 bg-gray-800/30 hover:border-primary/50 hover:bg-primary/5'
                      }`}
                    >
                      <div className="font-semibold text-foreground">{size.name}</div>
                      <div className="text-sm text-foreground/60 mt-1">{size.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Spice Level */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Spice Level</h4>
              <div className="flex gap-4">
                {['mild', 'medium', 'hot'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedSpiceLevel(level as 'mild' | 'medium' | 'hot')}
                    className={`flex items-center gap-3 px-6 py-3 rounded-2xl border-2 transition-all duration-300 ${
                      selectedSpiceLevel === level
                        ? 'border-primary bg-primary/10 shadow-lg shadow-primary/25'
                        : 'border-gray-700/50 bg-gray-800/30 hover:border-primary/50 hover:bg-primary/5'
                    }`}
                  >
                    {getSpiceIcon(level)}
                    <span className="capitalize font-medium text-foreground">{level}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            {item.customizations.addOns.length > 0 && (
              <div>
                <h4 className="font-semibold text-foreground mb-4">Add-ons</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {item.customizations.addOns.map((addOn) => (
                    <button
                      key={addOn.name}
                      onClick={() => handleAddOnToggle(addOn.name)}
                      className={`flex justify-between items-center p-4 rounded-2xl border-2 transition-all duration-300 ${
                        selectedAddOns.includes(addOn.name)
                          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/25'
                          : 'border-gray-700/50 bg-gray-800/30 hover:border-primary/50 hover:bg-primary/5'
                      }`}
                    >
                      <span className="font-medium text-foreground">{addOn.name}</span>
                      <span className="font-bold text-primary">+₹{addOn.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Special Instructions */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Special Instructions (Optional)</h4>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Any special requests or dietary requirements..."
                className="w-full p-4 bg-gray-800/30 border border-gray-700/50 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-foreground placeholder-foreground/50 resize-none backdrop-blur-sm"
                rows={3}
              />
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-700/50">
              <div className="flex items-center gap-6">
                <span className="font-semibold text-foreground">Quantity</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gray-700/50 flex items-center justify-center transition-colors border border-gray-700/50"
                  >
                    <Minus className="w-5 h-5 text-foreground" />
                  </button>
                  <span className="font-bold text-xl text-foreground w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gray-700/50 flex items-center justify-center transition-colors border border-gray-700/50"
                  >
                    <Plus className="w-5 h-5 text-foreground" />
                  </button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={!item.isAvailable || addingToCart}
                className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg hover:shadow-xl"
              >
                {addingToCart ? (
                  <div className='flex items-center gap-2'>
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Adding...</span>
                  </div>
                ) : (
                  <div className='flex items-center gap-2'>
                    <ShoppingCart className="w-5 h-5" />
                    <span>{item.isAvailable ? 'Add to Cart' : 'Unavailable'}</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}