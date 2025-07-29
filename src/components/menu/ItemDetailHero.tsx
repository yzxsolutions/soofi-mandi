'use client';

import { useState, useEffect } from 'react';
import { ZoomIn, Share2, Heart, Clock, Star, Plus, Minus, ShoppingCart, Flame, ChevronLeft, ChevronRight } from 'lucide-react';
import { MenuItem, CartItem } from '@/types';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { MobileImageGallery } from '@/components/ui/MobileImageGallery';
import { useCartStore } from '@/stores/cart-store';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';

interface ItemDetailHeroProps {
  item: MenuItem;
}

export default function ItemDetailHero({ item }: ItemDetailHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const images = item.images.length > 0 ? item.images : ['/images/mandi/mandi.png'];

  // Swipe gesture handlers for image gallery
  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const swipeRef = useSwipeGesture<HTMLDivElement>({
    onSwipeLeft: goToNextImage,
    onSwipeRight: goToPreviousImage,
    threshold: 50,
  });

  const [showShareMenu, setShowShareMenu] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  
  // Cart functionality state
  const [selectedSize, setSelectedSize] = useState<'Quarter' | 'Half' | 'Full'>('Full');
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState<'mild' | 'medium' | 'hot'>(item.spiceLevel);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [addingToCart, setAddingToCart] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${item.name} - Soofi Mandi`,
          text: `Check out this delicious ${item.name} from Soofi Mandi! ${item.description}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        setShowShareMenu(true);
      }
    } else {
      setShowShareMenu(true);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => {
        setShareSuccess(false);
        setShowShareMenu(false);
      }, 2000);
    } catch (error) {
      console.log('Error copying to clipboard:', error);
    }
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(`Check out this delicious ${item.name} from Soofi Mandi! ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(`Check out this delicious ${item.name} from Soofi Mandi!`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  // Keyboard navigation for image zoom
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isImageZoomed) return;

      switch (event.key) {
        case 'Escape':
          setIsImageZoomed(false);
          break;
        case 'ArrowLeft':
          if (images.length > 1) {
            setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
          }
          break;
        case 'ArrowRight':
          if (images.length > 1) {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
          }
          break;
      }
    };

    if (isImageZoomed) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isImageZoomed, images.length]);

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showShareMenu && !(event.target as Element).closest('.share-menu-container')) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showShareMenu]);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'mandi':
        return 'Mandi Varieties';
      case 'rice':
        return 'Rice Dishes';
      case 'appetizers':
        return 'Appetizers';
      case 'beverages':
        return 'Beverages';
      case 'desserts':
        return 'Desserts';
      default:
        return category;
    }
  };

  // Cart functionality helper functions
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
    <div className="relative">
      {/* Enhanced Hero Section */}
      <div className="bg-gradient-to-b from-gray-900 via-gray-900/95 to-black mobile-section-spacing">
        <div className="mobile-container">
          <div className="mobile-grid lg:grid-cols-2 items-center">
            {/* Optimized Image Section */}
            <div className="relative order-2 lg:order-1">
              {/* Mobile-First Image Gallery */}
              <MobileImageGallery
                images={images}
                alt={item.name}
                initialIndex={currentImageIndex}
                showThumbnails={true}
                className="max-w-[600px] mx-auto"
              />
            </div>

            {/* Enhanced Content Section */}
            <div className="mobile-space-y-8 order-1 lg:order-2">
              {/* Enhanced Category Badge */}
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary rounded-2xl text-base font-semibold border border-primary/40 shadow-lg backdrop-blur-sm">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {getCategoryLabel(item.category)}
              </div>

              {/* Enhanced Title and Price */}
              <div className="mobile-space-y-6">
                <h1 className="mobile-heading lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight tracking-tight">
                  {item.name}
                </h1>
                <div className="mobile-flex-col sm:flex-row sm:items-baseline mobile-gap-4">
                  <div className="relative">
                    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-shimmer-text">
                      ₹ {item.price.toFixed(2)}
                    </span>
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary rounded-full opacity-30"></div>
                  </div>
                  {item.customizations.sizes.length > 1 && (
                    <span className="text-lg text-foreground/70 font-medium">Starting from</span>
                  )}
                </div>
              </div>

              {/* Enhanced Quick Description */}
              <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30">
                <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>

              {/* Enhanced Key Features */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-gray-800/40 to-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/40 hover:border-primary/30 transition-all duration-300 hover:scale-105 group">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-3xl font-bold text-primary">{item.preparationTime}</div>
                  </div>
                  <div className="text-sm font-medium text-foreground/70 uppercase tracking-wide">Prep Time (Minutes)</div>
                </div>
                <div className="bg-gradient-to-br from-gray-800/40 to-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/40 hover:border-primary/30 transition-all duration-300 hover:scale-105 group">
                  <div className="flex items-center gap-3 mb-2">
                    <Star className="w-6 h-6 text-yellow-400 fill-current group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-3xl font-bold text-primary">{item.averageRating.toFixed(1)}</div>
                  </div>
                  <div className="text-sm font-medium text-foreground/70 uppercase tracking-wide">Customer Rating</div>
                </div>
              </div>

              {/* Cart Functionality Section */}
              <div className="space-y-6 mt-8">
                {/* Price Display */}
                <div className="text-center py-6 bg-gradient-to-br from-gray-800/40 to-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/40">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-shimmer-text mb-2">
                    ₹ {calculatePrice().toFixed(2)}
                  </div>
                  <div className="text-sm text-foreground/60">
                    Total for {quantity} item{quantity > 1 ? 's' : ''}
                  </div>
                </div>

                {/* Size Selection */}
                {item.customizations.sizes.length > 1 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Choose Size</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-semibold text-foreground">{size.name}</div>
                              <div className="text-sm text-foreground/60">{size.description}</div>
                            </div>
                            <div className="text-primary font-bold">
                              {size.price >= 0 ? '+' : ''}₹ {size.price.toFixed(2)}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Spice Level */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Spice Level</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {['mild', 'medium', 'hot'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedSpiceLevel(level as 'mild' | 'medium' | 'hot')}
                        className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300 ${
                          selectedSpiceLevel === level
                            ? 'border-primary bg-primary/10 shadow-lg shadow-primary/25'
                            : 'border-gray-700/50 bg-gray-800/30 hover:border-primary/50 hover:bg-primary/5'
                        }`}
                      >
                        {getSpiceIcon(level)}
                        <span className="capitalize font-medium text-foreground text-sm">{level}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add-ons */}
                {item.customizations.addOns.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Add-ons</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                          <span className="font-bold text-primary">+₹ {addOn.price.toFixed(2)}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Quantity</h3>
                  <div className="flex items-center justify-center gap-6 bg-gradient-to-br from-gray-800/40 to-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/40">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 border ${
                        quantity <= 1 
                          ? 'bg-gray-800/30 border-gray-700/30 text-gray-500 cursor-not-allowed' 
                          : 'bg-gray-700/50 hover:bg-primary/20 border-gray-600/50 hover:border-primary/50 text-foreground hover:text-primary hover:scale-110'
                      }`}
                    >
                      <Minus className="w-6 h-6" />
                    </button>
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-bold text-foreground w-16 text-center transition-all duration-200 hover:text-primary">
                        {quantity}
                      </span>
                      {quantity > 10 && (
                        <span className="text-xs text-yellow-400 mt-1">Large order!</span>
                      )}
                    </div>
                    <button
                      onClick={() => setQuantity(Math.min(50, quantity + 1))}
                      disabled={quantity >= 50}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 border ${
                        quantity >= 50 
                          ? 'bg-gray-800/30 border-gray-700/30 text-gray-500 cursor-not-allowed' 
                          : 'bg-gray-700/50 hover:bg-primary/20 border-gray-600/50 hover:border-primary/50 text-foreground hover:text-primary hover:scale-110'
                      }`}
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  </div>
                  {quantity >= 50 && (
                    <p className="text-xs text-yellow-400 text-center mt-2">
                      Maximum quantity reached. For larger orders, please contact us directly.
                    </p>
                  )}
                </div>

                {/* Special Instructions */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Special Instructions</h3>
                  <textarea
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Any special requests or dietary requirements..."
                    className="w-full p-4 bg-gray-800/30 border border-gray-700/50 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-foreground placeholder-foreground/50 resize-none backdrop-blur-sm"
                    rows={3}
                    maxLength={200}
                  />
                  <div className="text-xs text-foreground/50 mt-2">
                    {specialInstructions.length}/200 characters
                  </div>
                </div>

                {/* Add to Cart Button */}
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

                {/* Additional Info */}
                <div className="text-center text-sm text-foreground/60 space-y-2">
                  <p>🚚 Free delivery on orders over ₹ 250</p>
                  <p>⏱️ Estimated preparation: {item.preparationTime} minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Image Zoom Modal */}
      {isImageZoomed && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setIsImageZoomed(false)}
        >
          <div 
            className="relative max-w-6xl max-h-[95vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src={images[currentImageIndex]}
                alt={item.name}
                fill
                className="object-contain transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 1200px"
                priority
              />
            </div>
            
            {/* Close Button */}
            <Button
              onClick={() => setIsImageZoomed(false)}
              className="absolute top-4 right-4 p-3 bg-gray-900/90 backdrop-blur-sm hover:bg-gray-800/90 text-white rounded-full border border-gray-700/50 transition-all duration-200 hover:scale-110"
            >
              <ZoomIn className="w-6 h-6 rotate-180" />
            </Button>

            {/* Image Navigation */}
            {images.length > 1 && (
              <>
                <Button
                  onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-gray-900/90 backdrop-blur-sm hover:bg-gray-800/90 text-white rounded-full border border-gray-700/50 transition-all duration-200 hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Button>
                <Button
                  onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-gray-900/90 backdrop-blur-sm hover:bg-gray-800/90 text-white rounded-full border border-gray-700/50 transition-all duration-200 hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </>
            )}

            {/* Image Counter and Keyboard Shortcuts */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
              {images.length > 1 && (
                <div className="bg-gray-900/90 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-gray-700/50">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}
              <div className="bg-gray-900/90 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-gray-700/50 text-xs">
                <span className="hidden sm:inline">Press </span>
                <kbd className="bg-gray-700/50 px-1 rounded text-xs">ESC</kbd>
                <span className="hidden sm:inline"> to close</span>
                {images.length > 1 && (
                  <>
                    <span className="mx-2">•</span>
                    <kbd className="bg-gray-700/50 px-1 rounded text-xs">←</kbd>
                    <kbd className="bg-gray-700/50 px-1 rounded text-xs ml-1">→</kbd>
                    <span className="hidden sm:inline"> to navigate</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}