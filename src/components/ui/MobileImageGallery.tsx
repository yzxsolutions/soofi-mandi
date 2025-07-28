'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';
import { Button } from './Button';

interface MobileImageGalleryProps {
  images: string[];
  alt: string;
  initialIndex?: number;
  onClose?: () => void;
  showThumbnails?: boolean;
  className?: string;
}

export function MobileImageGallery({
  images,
  alt,
  initialIndex = 0,
  onClose,
  showThumbnails = true,
  className = '',
}: MobileImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
    setIsZoomed(false);
  };

  // Swipe gesture support
  const swipeRef = useSwipeGesture<HTMLDivElement>({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrevious,
    threshold: 50,
  });

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'Escape':
          onClose?.();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Handle touch zoom
  const handleImageTouch = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setTouchStart({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleImageTouchEnd = (e: React.TouchEvent) => {
    if (touchStart && e.changedTouches.length === 1) {
      const touch = e.changedTouches[0];
      const deltaX = Math.abs(touch.clientX - touchStart.x);
      const deltaY = Math.abs(touch.clientY - touchStart.y);
      
      // If it's a tap (minimal movement), toggle zoom
      if (deltaX < 10 && deltaY < 10) {
        setIsZoomed(!isZoomed);
      }
    }
    setTouchStart(null);
  };

  if (images.length === 0) return null;

  return (
    <div className={`mobile-image-gallery ${className}`}>
      {/* Main Image Container */}
      <div
        ref={swipeRef}
        className="relative mobile-image-container bg-black/20 backdrop-blur-sm"
      >
        {/* Close Button (if provided) */}
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-2 right-2 z-20 bg-black/50 text-white hover:bg-black/70 touch-target"
          >
            <X className="w-4 h-4" />
          </Button>
        )}

        {/* Navigation Arrows (Desktop) */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white hover:bg-black/70 touch-target hidden sm:flex"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white hover:bg-black/70 touch-target hidden sm:flex"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}

        {/* Main Image */}
        <div
          className={`relative w-full h-full overflow-hidden transition-transform duration-300 ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onTouchStart={handleImageTouch}
          onTouchEnd={handleImageTouchEnd}
        >
          <Image
            src={images[currentIndex]}
            alt={`${alt} - Image ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority={currentIndex === 0}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
          />
        </div>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded-full text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Mobile Swipe Indicators */}
        {images.length > 1 && (
          <div className="swipe-indicators absolute bottom-4 left-1/2 -translate-x-1/2 sm:hidden">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`swipe-dot ${index === currentIndex ? 'active' : ''}`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation (Desktop) */}
      {showThumbnails && images.length > 1 && (
        <div className="hidden sm:flex gap-2 mt-4 overflow-x-auto scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all touch-target ${
                index === currentIndex
                  ? 'border-primary shadow-warm-glow'
                  : 'border-transparent hover:border-primary/50'
              }`}
            >
              <Image
                src={image}
                alt={`${alt} thumbnail ${index + 1}`}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Mobile Thumbnail Strip */}
      {showThumbnails && images.length > 1 && (
        <div className="sm:hidden mt-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 -mx-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all touch-target ${
                  index === currentIndex
                    ? 'border-primary'
                    : 'border-transparent'
                }`}
              >
                <Image
                  src={image}
                  alt={`${alt} thumbnail ${index + 1}`}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Zoom Hint (Mobile) */}
      <div className="sm:hidden text-center mt-2 text-sm text-foreground/60">
        Tap image to zoom • Swipe to navigate
      </div>
    </div>
  );
}