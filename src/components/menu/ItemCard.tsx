'use client';

import { useState } from 'react';
import { MenuItem } from '@/types';
import { Button } from '@/components/ui/Button';
import { ShoppingCart, Eye } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '@/stores/cart-store';
import SizeSelectionModal from './SizeSelectionModal';

interface ItemCardProps {
  item: MenuItem;
  onQuickView?: (item: MenuItem) => void;
  showQuickView?: boolean;
}

export default function ItemCard({ item, onQuickView, showQuickView = true }: ItemCardProps) {
  const [showSizeModal, setShowSizeModal] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // If item has multiple sizes, show size selection modal
    if (item.customizations.sizes.length > 1) {
      setShowSizeModal(true);
    } else {
      // Add directly with default size if only one size available
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.images[0] || '/images/mandi/mandi.png',
        customizations: {
          size: 'Full',
          spiceLevel: item.spiceLevel,
          addOns: [],
          specialInstructions: '',
        },
      });
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(item);
  };

  return (
    <article className="group animate-fade-in-up bg-transparent card-accessible" role="article" aria-labelledby={`item-${item.id}-name`}>
      {/* Item Image with Spinning Animation */}
      <div className="mobile-image-container mb-4 overflow-hidden" role="img" aria-label={`${item.name} dish image`}>
        <div className="animate-spin-slow w-full h-full">
          <Image
            src={
              item.images && item.images.length > 0
                ? item.images[0]
                : "/images/mandi/mandi.png"
            }
            alt={`${item.name} - ${item.description}`}
            fill
            className="object-cover"
            placeholder="blur"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/images/mandi/mandi.png";
            }}
          />
        </div>

        {/* Hover Eye Icon - Top Right */}
        {showQuickView && onQuickView && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 cursor-pointer">
            <button
              onClick={handleQuickView}
              className="touch-target bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 focus-enhanced"
              aria-label={`Quick view ${item.name} details`}
              title={`Quick view ${item.name}`}
            >
              <Eye size={18} aria-hidden="true" />
              <span className="sr-only">Quick view</span>
            </button>
          </div>
        )}

        {/* Availability Badge */}
        {!item.isAvailable && (
          <div className="absolute top-3 left-3">
            <span 
              className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full"
              role="status"
              aria-label={`${item.name} is currently unavailable`}
            >
              Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Item Details */}
      <div className="mobile-text-center mobile-space-y-4">
        {/* Item Name */}
        <h3 
          id={`item-${item.id}-name`}
          className="responsive-text-h3 text-foreground group-hover:text-primary transition-colors"
        >
          {item.name}
        </h3>

        {/* Item Description */}
        <p className="text-sm sm:text-base text-foreground/70 line-clamp-2 max-w-xs mx-auto">
          {item.description}
        </p>

        {/* Highlighted Price */}
        <div className="py-2">
          <span 
            className="text-3xl font-bold text-primary warm-gradient bg-clip-text text-transparent animate-shimmer-text"
            aria-label={`Price: ${item.price} rupees`}
          >
            ₹{item.price}
          </span>
          {item.customizations.sizes.length > 1 && (
            <div className="text-small text-foreground/60 mt-1" aria-label="Full portion size">
              Full portion
            </div>
          )}
          
          {/* Portion Size Details - Quarter and Half Only */}
          {item.customizations.sizes.length > 1 && (
            <div className="mt-3 bg-gray-800/30 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center justify-center space-x-4">
                {/* Quarter Portion */}
                {item.customizations.sizes.find(size => size.name === 'Quarter') && (
                  <div className="text-center">
                    <div className="text-xs text-foreground/50 mb-1">Quarter</div>
                    <div className="text-sm text-primary font-bold">
                      ₹{item.price + item.customizations.sizes.find(size => size.name === 'Quarter')!.price}
                    </div>
                  </div>
                )}
                
                {/* Divider */}
                {item.customizations.sizes.find(size => size.name === 'Quarter') && 
                 item.customizations.sizes.find(size => size.name === 'Half') && (
                  <div className="flex items-center">
                    <div className="w-px h-8 bg-gradient-to-b from-transparent via-primary/40 to-transparent"></div>
                  </div>
                )}
                
                {/* Half Portion */}
                {item.customizations.sizes.find(size => size.name === 'Half') && (
                  <div className="text-center">
                    <div className="text-xs text-foreground/50 mb-1">Half</div>
                    <div className="text-sm text-primary font-bold">
                      ₹{item.price + item.customizations.sizes.find(size => size.name === 'Half')!.price}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col mobile-gap-4 max-w-xs mx-auto">
          <Button
            variant="secondary"
            size="md"
            onClick={handleAddToCart}
            disabled={!item.isAvailable}
            className="mobile-full-width flex items-center justify-center gap-2 border-2 border-secondary/40 text-secondary hover:bg-secondary cursor-pointer hover:text-white transition-all duration-300 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={item.isAvailable ? `Add ${item.name} to cart` : `${item.name} is unavailable`}
            aria-describedby={`item-${item.id}-name`}
          >
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              <span className="text-sm sm:text-base">{item.isAvailable ? 'Add to Cart' : 'Unavailable'}</span>
            </div>
          </Button>
        </div>
      </div>

      {/* Size Selection Modal */}
      <SizeSelectionModal
        item={item}
        isOpen={showSizeModal}
        onClose={() => setShowSizeModal(false)}
      />
    </article>
  );
}