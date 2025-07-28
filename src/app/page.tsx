"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

// Performance optimization: Preload the home page component
const preloadHomePage = () => {
  if (typeof window !== "undefined") {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = "/home";
    document.head.appendChild(link);
  }
};

export default function SplashScreen() {
  const [showSkip, setShowSkip] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRedirect = useCallback(() => {
    console.log("Redirecting to /home...");
    setFadeOut(true);

    if (typeof window !== "undefined") {
      localStorage.setItem("soofi-mandi-visited", "true");

      // Use window.location for more reliable redirect
      setTimeout(() => {
        console.log("Executing redirect to /home");
        window.location.href = "/home";
      }, 300);
    }
  }, []);

  const handleSkip = useCallback(() => {
    handleRedirect();
  }, [handleRedirect]);

  useEffect(() => {
    if (!mounted) return;

    // Performance optimization: Preload home page
    preloadHomePage();

    // Check if user has visited before (returning user detection)
    if (typeof window !== "undefined") {
      const hasVisited = localStorage.getItem("soofi-mandi-visited");
      const lastVisit = localStorage.getItem("soofi-mandi-last-visit");
      const now = Date.now();

      // Show skip button for returning users (visited within last 24 hours)
      if (hasVisited && lastVisit) {
        const timeSinceLastVisit = now - parseInt(lastVisit);
        const twentyFourHours = 24 * 60 * 60 * 1000;

        if (timeSinceLastVisit < twentyFourHours) {
          setShowSkip(true);
        }
      }
    }

    // Trigger entrance animation after a brief delay
    const loadTimer = setTimeout(() => {
      setStartAnimation(true);
    }, 150);

    // Auto-redirect after 3 seconds to allow animation to complete
    const redirectTimer = setTimeout(() => {
      console.log("Auto-redirect timer triggered");
      handleRedirect();
    }, 3000);

    // Cleanup function
    return () => {
      clearTimeout(loadTimer);
      clearTimeout(redirectTimer);
    };
  }, [mounted, handleRedirect]);

  // Handle keyboard navigation (ESC to skip)
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showSkip) {
        handleRedirect();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [showSkip, handleRedirect]);

  // Update last visit timestamp when component unmounts
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        localStorage.setItem("soofi-mandi-last-visit", Date.now().toString());
      }
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 bg-black transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Main Content */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Logo container */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Circle Logo */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40">
            <Image
              src="/images/logo/splash/circle-logo.png"
              alt="Soofi Mandi Logo"
              fill
              priority
              className={`object-contain transition-all duration-[1500ms] ease-out ${
                startAnimation
                  ? "opacity-100 translate-x-0 rotate-0"
                  : "opacity-0 -translate-x-[50vw] -rotate-360"
              }`}
            />
          </div>

          {/* Primary Text Logo */}
          <div className="relative w-48 h-12 sm:w-64 sm:h-16 -mt-4">
            <Image
              src="/images/logo/splash/primaryText-logo.png"
              alt="Soofi Mandi"
              fill
              priority
              className={`object-contain transition-opacity duration-1000 ${
                startAnimation ? "opacity-100 delay-[1200ms]" : "opacity-0"
              }`}
            />
          </div>

          {/* Secondary Text Logo */}
          <div className="relative w-64 h-8 sm:w-80 sm:h-10">
            <Image
              src="/images/logo/splash/secondaryText-logo.png"
              alt="Authentic Arabian Flavors"
              fill
              priority
              className={`object-contain transition-opacity duration-1000 ${
                startAnimation ? "opacity-100 delay-[1700ms]" : "opacity-0"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Skip Button */}
      {showSkip && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-in-up">
          <button
            onClick={handleSkip}
            className="px-6 py-2 bg-white/10 text-white rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
            aria-label="Skip splash screen and go to home page"
          >
            Skip
          </button>
        </div>
      )}



      {/* Performance optimization: Preload home page */}
      <link rel="prefetch" href="/home" />
    </div>
  );
}
