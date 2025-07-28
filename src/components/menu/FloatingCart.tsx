"use client";

import { useState } from "react";
import { ShoppingCart, X, Plus, Minus, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/stores/cart-store";
import Link from "next/link";
import Image from "next/image";

// Coupon Section Component
function CouponSection() {
  const [couponInput, setCouponInput] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const { couponCode, discount, applyCoupon, removeCoupon } = useCartStore();

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;

    setIsApplying(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    applyCoupon(couponInput.trim());
    setIsApplying(false);
    setCouponInput("");
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
  };

  return (
    <div className="mb-4 pb-4 border-b border-gray-600/50">
      {couponCode ? (
        // Applied Coupon Display
        <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 rounded-xl p-3">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400 font-medium">
              {couponCode} applied ({(discount * 100)}% off)
            </span>
          </div>
          <button
            onClick={handleRemoveCoupon}
            className="text-green-400 hover:text-green-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        // Coupon Input
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                placeholder="Enter coupon code"
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-foreground placeholder-foreground/50 text-sm"
                onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
              />
            </div>
            <Button
              onClick={handleApplyCoupon}
              disabled={!couponInput.trim() || isApplying}
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isApplying ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                "Apply"
              )}
            </Button>
          </div>
          <div className="text-xs text-foreground/60">
            Try: WELCOME10, SAVE20, FIRST15
          </div>
        </div>
      )}
    </div>
  );
}

export default function FloatingCart() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { items, itemCount, updateQuantity, removeItem, discount, couponCode } =
    useCartStore();

  // Get calculated values
  const subtotal = useCartStore((state) => state.getSubtotal());
  const tax = useCartStore((state) => state.getTax());
  const deliveryCharge = useCartStore((state) => state.getDeliveryCharge());
  const total = useCartStore((state) => state.getTotal());

  if (itemCount === 0) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-fade-in-up"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Floating Cart */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-out ${
          isExpanded ? "w-96 max-w-[calc(100vw-3rem)]" : "w-auto"
        }`}
      >
        {/* Collapsed Cart Button */}
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="bg-gray-900/95 backdrop-blur-xl hover:bg-gray-800/95 text-white rounded-3xl p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-4 group border border-gray-700/50 hover:border-primary/50 animate-glow-pulse"
          >
            <div className="relative">
              <ShoppingCart className="w-7 h-7 text-primary" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg ">
                {itemCount}
              </span>
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-lg font-bold text-primary">
                ₹{total}
              </div>
              <div className="text-xs text-foreground/70">
                {itemCount} item{itemCount > 1 ? "s" : ""}
              </div>
            </div>
          </button>
        )}

        {/* Expanded Cart */}
        {isExpanded && (
          <div className="bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden animate-nav-entrance">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Your Cart</h3>
                <p className="text-sm opacity-90">
                  {itemCount} item{itemCount > 1 ? "s" : ""}
                </p>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200 hover:rotate-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="max-h-80 overflow-y-auto scrollbar-hide">
              {items.map((item, index) => (
                <div
                  key={`${item.id}-${JSON.stringify(item.customizations)}`}
                  className="p-4 border-b border-gray-700/50 last:border-b-0 hover:bg-gray-800/30 transition-colors animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    {/* Item Image */}
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-800/50 flex-shrink-0 border border-gray-700/50">
                      {item.image ? (
                        <div className="animate-spin-slow w-full h-full">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover rounded-2xl"
                            sizes="64px"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full text-2xl">
                          🍽️
                        </div>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground truncate mb-1">
                        {item.name}
                      </h4>
                      <div className="text-xs text-foreground/60 space-y-1">
                        <div className="flex gap-4">
                          <span>
                            Size:{" "}
                            <span className="text-primary font-medium">
                              {item.customizations.size}
                            </span>
                          </span>
                          <span>
                            Spice:{" "}
                            <span className="text-primary font-medium capitalize">
                              {item.customizations.spiceLevel}
                            </span>
                          </span>
                        </div>
                        {item.customizations.addOns.length > 0 && (
                          <div className="text-primary/80">
                            Add-ons: {item.customizations.addOns.join(", ")}
                          </div>
                        )}
                      </div>
                      <div className="text-lg font-bold text-primary mt-2">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-full bg-gray-800/50 hover:bg-gray-700/50 flex items-center justify-center transition-all duration-200 border border-gray-700/50 hover:border-primary/50"
                      >
                        <Minus className="w-4 h-4 text-foreground" />
                      </button>
                      <span className="text-lg font-bold text-foreground w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-full bg-gray-800/50 hover:bg-gray-700/50 flex items-center justify-center transition-all duration-200 border border-gray-700/50 hover:border-primary/50"
                      >
                        <Plus className="w-4 h-4 text-foreground" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-foreground/40 hover:text-red-400 transition-colors flex-shrink-0 p-1 hover:bg-red-500/10 rounded-full"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-800/30 backdrop-blur-sm border-t border-gray-700/50">
              {/* Coupon Section */}
              <CouponSection />

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                {/* Subtotal */}
                <div className="flex justify-between items-center text-foreground">
                  <span className="text-sm">
                    Subtotal ({itemCount} item{itemCount > 1 ? "s" : ""})
                  </span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>

                {/* Discount */}
                {discount > 0 && (
                  <div className="flex justify-between items-center text-green-400">
                    <span className="text-sm">Discount ({couponCode})</span>
                    <span className="font-medium">
                      -₹{subtotal * discount}
                    </span>
                  </div>
                )}

                {/* Tax */}
                <div className="flex justify-between items-center text-foreground/80">
                  <span className="text-sm">Tax (18% GST)</span>
                  <span className="font-medium">₹{tax}</span>
                </div>

                {/* Delivery */}
                <div className="flex justify-between items-center text-foreground/80">
                  <span className="text-sm">
                    Delivery Fee
                    {subtotal >= 500 && (
                      <span className="text-green-400 ml-1">
                        (Free over ₹500)
                      </span>
                    )}
                  </span>
                  <span className="font-medium">
                    {deliveryCharge === 0 ? (
                      <span className="text-green-400">FREE</span>
                    ) : (
                      `₹${deliveryCharge}`
                    )}
                  </span>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-600/50 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-foreground">
                      Total:
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      ₹{total}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link href="/checkout" className="block">
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group">
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-full text-center text-sm text-foreground/60 hover:text-primary transition-colors py-3 hover:bg-gray-800/30 rounded-2xl"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
