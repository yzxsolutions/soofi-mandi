"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Utensils, ChefHat, Coffee } from "lucide-react";

export function HeroSection() {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const router = useRouter();

  const handleOrderNow = () => {
    router.push("/menu");
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 geometric-pattern z-0 opacity-50"
        style={{ transform: `translateY(${offsetY * 0.3}px)` }}
      />

      {/* Hero Content - Full Width No Padding */}
      <div className="w-full h-screen flex items-center relative z-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center h-full">
          {/* Text Content */}
          <div className="flex flex-col justify-center items-center h-full px-8 sm:px-12 lg:px-16 xl:px-20 mobile-text-center lg:text-left mobile-space-y-8">
            <h1
              className="mobile-heading lg:responsive-text-display mobile-flex-col sm:flex-row mobile-gap-4 text-foreground animate-fade-in-up text-shadow-lg"
              style={{ fontSize: 100 }}
            >
              Authentic Arabian
              <span
                className="block animate-shimmer-text text-9xl text-display text-primary"
                style={{ fontSize: 100 }}
              >
                Flavors
              </span>
            </h1>

            <p
              className="text-base sm:text-lg lg:text-xl text-foreground/90 max-w-lg mx-auto lg:mx-0 animate-fade-in-up text-center"
              style={{ animationDelay: "0.2s" }}
            >
              Experience the rich tradition of Middle Eastern cuisine with our
              signature mandi dishes, prepared using time-honored recipes and
              the finest ingredients.
            </p>

            {/* Restaurant Info */}
            <div
              className="mobile-space-y-4 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-sm sm:text-base text-primary/90 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                  <svg
                    className="w-5 h-5 text-primary flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">
                    Open Daily: 11:00 AM - 11:00 PM
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm sm:text-base text-primary/90 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                  <svg
                    className="w-5 h-5 text-primary flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">Free Delivery Over QR 50</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div
            className="relative animate-fade-in-up flex items-center justify-center h-full px-8 sm:px-12 lg:px-16 xl:px-20"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative aspect-square w-full max-w-2xl">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl opacity-30 animate-float-slow flex items-center justify-center">
                <Utensils className="w-12 h-12 text-secondary/30" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl animate-float-medium flex items-center justify-center">
                <ChefHat className="w-16 h-16 text-accent/30" />
              </div>
              <div className="absolute top-1/2 -right-8 w-16 h-16 rounded-2xl animate-float-fast flex items-center justify-center">
                <Coffee className="w-8 h-8 text-accent/30 " />
              </div>

              {/* Main Image Container */}
              <div className="relative z-10 rounded-2xl overflow-hidden animate-spin-slow ">
                <Image
                  src="/images/mandi/mandi.png"
                  alt="Signature Mandi Dish - Authentic Arabian Cuisine"
                  width={400}
                  height={400}
                  className="w-4/5 h-full object-cover"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />

                {/* Image Overlay with Cultural Pattern */}
                <div className="absolute inset-0 geometric-pattern-dense opacity-10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
