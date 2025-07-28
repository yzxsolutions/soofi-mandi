"use client";

import { Button } from "@/components/ui/Button";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center pt-20">
      <div className="text-center p-8">
        <ShoppingCart className="w-16 h-16 mx-auto text-primary/50 mb-6" />
        <h1 className="text-h2 text-foreground mb-4">Checkout Coming Soon</h1>
        <p className="text-body text-foreground/70 mb-8 max-w-md">
          The checkout functionality is currently being developed.
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
