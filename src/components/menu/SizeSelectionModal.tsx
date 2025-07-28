"use client";

import { useState } from "react";
import { MenuItem } from "@/types";
import { Button } from "@/components/ui/Button";
import { X, ShoppingCart, Check } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/stores/cart-store";

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

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl">
      {/* Full Screen Background with Pattern */}
      <div className="absolute inset-0 geometric-pattern opacity-20" />
      
      {/* Close Button - Top Right */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 z-10 touch-target-large bg-gray-800/60 hover:bg-gray-700/60 rounded-full transition-all duration-300 hover:scale-110 border-2 border-gray-600/40 hover:border-primary/50"
      >
        <X className="w-6 h-6 text-foreground/90" />
      </button>

      {/* Full Screen Modal Content */}
      <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
        {/* Modal Container */}
        <div className="relative bg-black/90 backdrop-blur-xl rounded-3xl border-2 border-primary/40 w-full max-w-2xl shadow-2xl animate-fade-in-up">
          {/* Decorative Border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 p-[2px]">
            <div className="w-full h-full bg-black/95 rounded-3xl" />
          </div>
          
          {/* Cultural Pattern Overlay */}
          <div className="absolute inset-0 rounded-3xl geometric-pattern-dense opacity-10" />
          {/* Header */}
          <div className="relative flex items-center justify-center p-8 border-b border-primary/30 bg-gradient-to-r from-black/50 to-gray-900/50 backdrop-blur-sm rounded-t-3xl">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-3 border-primary/40 shadow-warm-lg animate-spin-slow mb-6">
                <Image
                  src={item.images[0] || "/images/mandi/mandi.png"}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute inset-0 geometric-pattern-dense opacity-20" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-3 font-display animate-shimmer-text">
                  {item.name}
                </h3>
                <p className="text-lg text-primary/90 font-medium">
                  Choose your perfect portion size
                </p>
              </div>
            </div>
          </div>

        {/* Size Options */}
        <div className="relative p-6 space-y-4">
          {item.customizations.sizes.map((size, index) => (
            <div
              key={size.name}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 touch-target ${
                selectedSize === size.name
                  ? "border-primary bg-primary/10 shadow-warm-glow"
                  : "border-gray-700/50 hover:border-primary/50 bg-gray-800/30 hover:bg-gray-800/50"
              }`}
              onClick={() => setSelectedSize(size.name)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      selectedSize === size.name
                        ? "border-primary bg-primary"
                        : "border-gray-500"
                    }`}
                  >
                    {selectedSize === size.name && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-foreground">
                      {size.name} Portion
                    </h4>
                    <p className="text-sm text-foreground/70">
                      {size.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-primary">
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

        {/* Footer */}
        <div className="relative p-6 border-t border-primary/20">
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 bg-transparent border-2 border-gray-600/50 hover:border-gray-500/50 text-foreground hover:bg-gray-800/30 rounded-xl py-3"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddToCart}
              disabled={addingToCart}
              variant="cta"
              className="flex-1 rounded-xl py-3 flex items-center justify-center gap-2 font-semibold"
            >
              {addingToCart ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Add - QR {getSizePrice(selectedSize)}
                </>
              )}
            </Button>
          </div>

          {/* Price Summary */}
          <div className="mt-4 text-center">
            <p className="text-foreground/60 text-sm">
              Selected:{" "}
              <span className="text-primary font-semibold">
                {selectedSize} Portion
              </span>
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
