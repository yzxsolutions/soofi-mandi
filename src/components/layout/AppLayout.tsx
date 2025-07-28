"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
// import { MobileBottomNav } from '@/components/layout/MobileBottomNav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSplash = pathname === "/";

  // For the splash screen, we only render the children (the splash page itself)
  if (isSplash) {
    return <>{children}</>;
  }

  // For all other pages, wrap them in the standard layout with Navigation and Footer
  return (
    <div className="min-h-screen flex flex-col">
      <header role="banner">
        <Navigation />
      </header>
      <div className="flex-1">{children}</div>
      <footer role="contentinfo">
        <Footer />
      </footer>
      {/* Mobile Bottom Navigation - Only shows on mobile */}
      {/* <nav role="navigation" aria-label="Mobile navigation" className="md:hidden">
        <MobileBottomNav />
      </nav> */}
    </div>
  );
}
