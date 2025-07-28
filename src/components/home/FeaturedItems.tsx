"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/stores/cart-store";
import { getFeaturedItems } from "@/lib/mock-data";
import { MenuItem } from "@/types";
import { ShoppingCart, Eye } from "lucide-react";
import SizeSelectionModal from "@/components/menu/SizeSelectionModal";
import { FeaturedItemsSkeleton } from "@/components/ui/SkeletonLoader";
import { LazyOnView } from "@/components/ui/LazyComponent";

export function FeaturedItems() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);
  const addItem = useCartStore((state) => state.addItem);

  // Simulate loading featured items
  useEffect(() => {
    const loadFeaturedItems = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setFeaturedItems(getFeaturedItems(6));
      setIsLoading(false);
    };

    loadFeaturedItems();
  }, []);

  const handleAddToCart = (item: MenuItem) => {
    // If item has multiple sizes, show size selection modal
    if (item.customizations.sizes.length > 1) {
      setSelectedItem(item);
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
          size: "Full",
          spiceLevel: item.spiceLevel,
          addOns: [],
          specialInstructions: undefined,
        },
      });
    }
  };



  if (isLoading) {
    return <FeaturedItemsSkeleton />;
  }

  return (
    <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-h1 text-foreground mb-4">Featured Dishes</h2>
            <p className="text-body-lg text-foreground/70 max-w-2xl mx-auto">
              Discover our most popular dishes, carefully crafted with authentic
              spices and traditional cooking methods
            </p>
          </div>

          {/* Featured Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item, index) => (
            <div
              key={item.id}
              className="group animate-fade-in-up bg-transparent"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Item Image with Spinning Animation */}
              <div className="relative aspect-square mb-4 overflow-hidden rounded-2xl">
                <div className="animate-spin-slow w-full h-full">
                  <Image
                    src={
                      item.images && item.images.length > 0
                        ? item.images[0]
                        : "/images/mandi/mandi.png"
                    }
                    alt={`${item.name} - ${item.description}`}
                    fill
                    className="object-cover rounded-2xl"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    loading="lazy"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/mandi/mandi.png";
                    }}
                  />
                </div>

                {/* Hover Eye Icon - Top Right */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 cursor-pointer">
                  <button
                    onClick={() => (window.location.href = `/menu/${item.id}`)}
                    className="w-10 h-10 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </div>

              {/* Item Details */}
              <div className="text-center space-y-3">
                {/* Item Name */}
                <h3 className="text-h3 text-foreground group-hover:text-primary transition-colors">
                  {item.name}
                </h3>

                {/* Item Description */}
                <p className="text-body text-foreground/70 line-clamp-2 max-w-xs mx-auto">
                  {item.description}
                </p>

                {/* Highlighted Price */}
                <div className="py-2">
                  <span className="text-3xl font-bold text-primary warm-gradient bg-clip-text text-transparent animate-shimmer-text">
                    ₹{item.price}
                  </span>
                  {item.customizations.sizes.length > 1 && (
                    <div className="text-small text-foreground/60 mt-1">
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
                <div className="flex flex-col gap-3 max-w-xs mx-auto">
                 

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleAddToCart(item)}
                    className="w-full flex items-center justify-center gap-2 border-2 border-secondary/40 text-secondary hover:bg-secondary cursor-pointer hover:text-white transition-all duration-300 rounded-xl font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          ))}
          </div>

          {/* View All Menu CTA */}
          <div className="text-center mt-12">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => (window.location.href = "/menu")}
              className="px-8"
            >
              View Full Menu
            </Button>
          </div>
        </div>

        {/* Size Selection Modal */}
        {selectedItem && (
          <SizeSelectionModal
            item={selectedItem}
            isOpen={showSizeModal}
            onClose={() => {
              setShowSizeModal(false);
              setSelectedItem(null);
            }}
          />
        )}
      </section>
  );
}
