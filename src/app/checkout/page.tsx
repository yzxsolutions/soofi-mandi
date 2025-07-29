"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/stores/cart-store";
import { useCheckoutStore } from "@/stores/checkout-store";
import { useSavedAddressesCleanup } from "@/hooks/useSavedAddressesCleanup";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { CustomerForm } from "@/components/checkout/CustomerForm";
import { DeliveryForm } from "@/components/checkout/DeliveryForm";
import { PaymentForm } from "@/components/checkout/PaymentForm";
import { CheckoutProgress } from "@/components/checkout/CheckoutProgress";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { itemCount, getTotal } = useCartStore();
  const { resetCheckout } = useCheckoutStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  
  // Clean up expired saved addresses
  useSavedAddressesCleanup();
  
  // Reset checkout data when the page loads
  useEffect(() => {
    resetCheckout();
  }, [resetCheckout]);

  // Redirect if cart is empty
  if (itemCount === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center pt-20">
        <div className="text-center p-8">
          <ShoppingCart className="w-16 h-16 mx-auto text-primary/50 mb-6" />
          <h1 className="text-h2 text-foreground mb-4">Your Cart is Empty</h1>
          <p className="text-body text-foreground/70 mb-8 max-w-md">
            Looks like you havent added any delicious dishes to your cart yet.
          </p>
          <Link href="/menu">
            <Button variant="primary" size="lg">
              Browse Our Menu
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const steps = [
    { id: 1, title: "Review", description: "Check your items" },
    { id: 2, title: "Details", description: "Your information" },
    { id: 3, title: "Delivery", description: "Address & time" },
    { id: 4, title: "Payment", description: "Finalize your order" },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="text-h2 text-foreground mb-6">Review Your Order</h2>
            <OrderSummary onNext={() => setCurrentStep(2)} />
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-h2 text-foreground mb-6">
              Customer Information
            </h2>
            <CustomerForm
              onNext={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
            />
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-h2 text-foreground mb-6">Delivery Details</h2>
            <DeliveryForm
              onNext={() => setCurrentStep(4)}
              onBack={() => setCurrentStep(2)}
            />
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-h2 text-foreground mb-6">Payment Method</h2>
            <PaymentForm onBack={() => setCurrentStep(3)} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-28 sm:pt-32 pb-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/menu" className="hidden sm:block">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Menu
              </Button>
            </Link>
            <h1 className="text-h1 text-foreground">Checkout</h1>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8 w-full flex justify-center items-center
         sm:mb-12">
          <CheckoutProgress steps={steps} currentStep={currentStep} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 bg-black/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 sm:p-8">
            {renderStepContent()}
          </div>

          {/* Order Summary Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28">
              <div className="bg-black/30 backdrop-blur-sm border border-primary/20 rounded-2xl">
                <OrderSummary isCompact />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Order Summary - Drawer/Modal style */}
        {currentStep > 1 && (
          <>
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-primary/20 p-4 z-40">
              <Button
                onClick={() => setIsSummaryOpen(true)}
                variant="secondary"
                className="w-full"
              >
                View Order Summary (${getTotal().toFixed(2)})
              </Button>
            </div>

            {/* Mobile Summary Modal */}
            <div
              className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
                isSummaryOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              onClick={() => setIsSummaryOpen(false)}
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
              <div
                className={`absolute bottom-0 left-0 right-0 bg-background border-t border-primary/20 rounded-t-2xl transition-transform duration-300 ease-out max-h-[80vh] flex flex-col ${
                  isSummaryOpen ? "translate-y-0" : "translate-y-full"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-2 right-2 z-10">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSummaryOpen(false)}
                  >
                    Close
                  </Button>
                </div>
                <OrderSummary isCompact={true} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}