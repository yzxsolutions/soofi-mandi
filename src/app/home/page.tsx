import { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/home/HeroSection";
import FloatingCart from "@/components/menu/FloatingCart";
import { FeaturedItemsSkeleton } from "@/components/ui/SkeletonLoader";
import { Skeleton } from "@/components/ui/SkeletonLoader";

const FeaturedItems = dynamic(
  () =>
    import("@/components/home/FeaturedItems").then((mod) => mod.FeaturedItems),
  {
    loading: () => <FeaturedItemsSkeleton />,
  }
);

const ContactSection = dynamic(
  () =>
    import("@/components/home/ContactSection").then(
      (mod) => mod.ContactSection
    ),
  {
    loading: () => <Skeleton variant="card" className="h-96 w-full" />,
  }
);

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
  
    </div>
  );
}
