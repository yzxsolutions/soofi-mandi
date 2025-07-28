"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { DesktopNavigation } from "./DesktopNavigation";

// --- Main Navigation Component ---

export function Navigation() {
  return (
    <>

      {/* Mobile Logo - Only visible on mobile */}
      <div className="md:hidden sticky w-full flex items-center justify-center z-50 safe-area-top">
        <Link
          href="/home"
          className="flex items-center space-x-3 group touch-target focus-enhanced"
          aria-label="Soofi Mandi - Go to home page"
        >
          <Image
            src="/images/logo/logo-without-bg.png"
            alt="Soofi Mandi - Authentic Arabian Cuisine Logo"
            width={200}
            height={200}
            className="w-32 h-32 sm:w-40 sm:h-40"
            priority
          />
        </Link>
      </div>

      {/* Desktop Navigation - Hidden on mobile */}
      <nav
        className="hidden md:block nav-landmark"
        aria-label="Main navigation"
        role="navigation"
      >
        <DesktopNavigation />
      </nav>
    </>
  );
}
