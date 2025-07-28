"use client";

import { useState, useEffect } from "react";
import { MenuItem } from "@/types";
import { Button } from "@/components/ui/Button";
import { X, ShoppingCart, Check } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { useUIStore } from "@/stores/ui-store";

interface SizeSelectionModalProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeSelectionModal({
  item,
  isOpen,
  onClose,
}: SizeSelectionModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>("Full");
  const [addingToCart, setAddingToCart] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const setModalOpen = useUIStore((state) => state.setModalOpen);
  const [isMounted, setIsMounted] = useState(isOpen);

  useEffect(() => {
    setModalOpen(isOpen);

    // Handle mounting/unmounting for animations
    let timeoutId: NodeJS.Timeout;
    if (isOpen) {
      setIsMounted(true);
    } else {
      // Wait for exit animation to finish before unmounting
      timeoutId = setTimeout(() => setIsMounted(false), 300);
    }
    return () => clearTimeout(timeoutId);
  }, [isOpen, setModalOpen]);

  if (!isMounted) return null;

  const handleAddToCart = async () => {
    setAddingToCart(true);

    const selectedSizeOption = item.customizations.sizes.find(
      (size) => size.name === selectedSize
    );
    const finalPrice = item.price + (selectedSizeOption?.price || 0);

    // Add item with selected size
    addItem({
      id: `${item.id}-${selectedSize}`,
      name: `${item.name} (${selectedSize})`,
      price: finalPrice,
      quantity: 1,
      image: item.images[0] || "/images/mandi/mandi.png",
      customizations: {
        size: selectedSize as "Quarter" | "Half" | "Full",
        spiceLevel: item.spiceLevel,
        addOns: [],
        specialInstructions: "",
      },
    });

    // Simulate loading state
    await new Promise((resolve) => setTimeout(resolve, 800));
    setAddingToCart(false);
    onClose();
  };

  const getSizePrice = (sizeName: string) => {
    const sizeOption = item.customizations.sizes.find(
      (size) => size.name === sizeName
    );
    return item.price + (sizeOption?.price || 0);
  };

  return (
    // Backdrop container
    <div
      className={cn(
        "fixed inset-0 z-50 transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0"
      )}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop with blur, matching the checkout summary modal */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal/Sheet Panel: stopPropagation prevents backdrop click from firing when clicking the panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "absolute bottom-0 left-0 right-0 flex w-full max-h-[85vh] flex-col rounded-t-2xl border-t-2 border-primary/30 bg-black/95 shadow-warm-xl transition-transform duration-300 ease-out",
          // On desktop, constrain width and center it horizontally at the bottom.
          "md:left-1/2 md:max-w-xl md:-translate-x-1/2",
          // Animation state (always slide from bottom)
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        {/* Grabber handle for mobile */}
        <div className="absolute top-3 left-1/2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-gray-600 md:hidden" />

        {/* Header */}
        <div className="relative flex flex-col items-center p-6 text-center md:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-600/40 bg-gray-800/60 transition-all duration-300 hover:scale-110 hover:border-primary/50 hover:bg-gray-700/60"
          >
            <X className="h-5 w-5 text-foreground/90" />
          </button>
          <div className="relative mb-4 h-20 w-20 rounded-2xl border-3 border-primary/40 shadow-warm-lg md:h-24 md:w-24">
            <Image
              src={item.images[0] || "/images/mandi/mandi.png"}
              alt={item.name}
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 768px) 80px, 96px"
            />
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              {item.name}
            </h3>
            <p className="text-md text-primary/90 md:text-lg">
              Choose your perfect portion size
            </p>
          </div>
        </div>

        {/* Scrollable Size Options */}
        <div className="flex-1 overflow-y-auto px-6 pb-4">
          <div className="space-y-4">
            {item.customizations.sizes.map((size) => (
              <div
                key={size.name}
                className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-300 touch-target ${
                  selectedSize === size.name
                    ? "border-primary bg-primary/10 shadow-warm-glow"
                    : "border-gray-700/50 bg-gray-800/30 hover:border-primary/50 hover:bg-gray-800/50"
                }`}
                onClick={() => setSelectedSize(size.name)}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-1 items-center gap-3">
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        selectedSize === size.name
                          ? "border-primary bg-primary"
                          : "border-gray-500"
                      }`}
                    >
                      {selectedSize === size.name && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground md:text-lg">
                        {size.name} Portion
                      </h4>
                      <p className="text-sm text-foreground/70">
                        {size.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary md:text-xl">
                      QR {getSizePrice(size.name)}
                    </div>
                    {size.price !== 0 && (
                      <div className="text-xs text-foreground/60">
                        {size.price > 0 ? "+" : ""}QR {size.price}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="mt-auto border-t border-primary/20 p-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 rounded-xl border-2 border-gray-600/50 bg-transparent py-3 text-foreground hover:border-gray-500/50 hover:bg-gray-800/30"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddToCart}
              disabled={addingToCart}
              variant="cta"
              className="flex-1 rounded-xl bg-primary py-3 font-semibold"
            >
              {addingToCart ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Adding...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Add - QR {getSizePrice(selectedSize)}
                </div>
              )}
            </Button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-foreground/60">
              Selected:{" "}
              <span className="font-semibold text-primary">
                {selectedSize} Portion
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
