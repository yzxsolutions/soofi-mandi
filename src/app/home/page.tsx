import { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedItems } from "@/components/home/FeaturedItems";
import { ContactSection } from "@/components/home/ContactSection";
import FloatingCart from "@/components/menu/FloatingCart";

export const metadata: Metadata = {
  title: "Home - Soofi Mandi",
  description:
    "Authentic Arabian Flavors - Traditional Mandi and Middle Eastern Cuisine",
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      {/* <RecentOrders /> */}
      <FeaturedItems />
      <ContactSection />
      {/* Floating Cart */}
      <FloatingCart />
    </div>
  );
}
