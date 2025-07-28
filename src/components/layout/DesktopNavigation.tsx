"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  Home,
  UtensilsCrossed,
  Phone,
  User,
  History,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { hasRecentOrders } from "@/lib/orderStorage";
import Image from "next/image";

// --- Sub-components for better structure and readability ---

type NavigationItemProps = {
  href: string;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
};

const DesktopNavigationItem: React.FC<NavigationItemProps> = ({
  href,
  label,
  icon: Icon,
  isActive,
}) => {
  return ( 
    <Link
      href={href}
      className="relative flex flex-col items-center justify-center gap-1 p-2 group transition-colors duration-300 touch-target"
    >
      {/* Background Glow Effect */}
      <div
        className={cn(
          "absolute inset-0 bg-primary/10 rounded-xl blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-50",
          isActive && "opacity-100"
        )}
      />

      {/* Icon */}
      <div
        className={cn(
          "relative transition-all duration-300",
          isActive ? "text-primary" : "text-foreground/60 group-hover:text-primary"
        )}
      >
        <Icon strokeWidth={isActive ? 2.5 : 2} className="w-6 h-6" />
      </div>

      {/* Label */}
      <span
        className={cn(
          "text-xs font-medium transition-colors duration-300",
          isActive ? "text-primary" : "text-foreground/60 group-hover:text-primary"
        )}
      >
        {label}
      </span>

      {/* Active Indicator Dot */}
      {isActive && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
      )}
    </Link>
  );
};

// --- Desktop Navigation Component ---

const DesktopNavigation: React.FC = () => {
  const pathname = usePathname();
  const { itemCount } = useCartStore();
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  
  // Check for recent orders on component mount and when pathname changes
  useEffect(() => {
    setShowOrderHistory(hasRecentOrders());
    
    // Set up interval to check for expired orders
    const intervalId = setInterval(() => {
      setShowOrderHistory(hasRecentOrders());
    }, 5 * 60 * 1000); // Check every 5 minutes
    
    return () => clearInterval(intervalId);
  }, [pathname]);

  const navItems = [
    { href: "/home", label: "Home", icon: Home },
    { href: "/menu", label: "Menu", icon: UtensilsCrossed },
    { href: "/contact", label: "Contact", icon: Phone },
    { href: "/profile", label: "Profile", icon: User },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Logo - Fixed Top Left */}
      <div className="sticky w-full flex items-center justify-center z-50 safe-area-top">
        <Link href="/home" className="flex items-center space-x-3 group touch-target">
          <Image
            src="/images/logo/logo-without-bg.png"
            alt="Soofi Mandi Logo"
            width={200}
            height={200}
            className="w-40 h-40 lg:w-48 lg:h-48"
            priority
          />
        </Link>
      </div>

      {/* Bottom Center Navigation - Desktop Only */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 safe-area-bottom">
        <div className="bg-black/80 backdrop-blur-lg rounded-3xl p-3 shadow-2xl border border-primary/10">
          <div className="flex items-center space-x-2">
            {/* Navigation Items */}
            {navItems.map((item) => (
              <DesktopNavigationItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                isActive={isActive(item.href)}
              />
            ))}

            {/* Order History - Only shown when there are recent orders */}
            {showOrderHistory && (
              <Link
                href="/orders"
                className="relative flex flex-col items-center justify-center gap-1 p-2 group transition-colors duration-300 touch-target"
              >
                {/* Background Glow Effect */}
                <div
                  className={cn(
                    "absolute inset-0 bg-primary/10 rounded-xl blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-50",
                    isActive("/orders") && "opacity-100"
                  )}
                />

                {/* Icon */}
                <div
                  className={cn(
                    "relative transition-all duration-300",
                    isActive("/orders") ? "text-primary" : "text-foreground/60 group-hover:text-primary"
                  )}
                >
                  <History strokeWidth={isActive("/orders") ? 2.5 : 2} className="w-6 h-6" />
                </div>

                {/* Label */}
                <span
                  className={cn(
                    "text-xs font-medium transition-colors duration-300",
                    isActive("/orders") ? "text-primary" : "text-foreground/60 group-hover:text-primary"
                  )}
                >
                  Orders
                </span>

                {/* Active Indicator Dot */}
                {isActive("/orders") && (
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
                )}
              </Link>
            )}
            
            {/* Divider */}
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-primary/30 to-transparent mx-1"></div>

            {/* Cart Button */}
            <Link
              href="/checkout"
              className="relative flex flex-col items-center justify-center gap-1 p-2 group transition-colors duration-300 touch-target"
            >
              {/* Background Glow Effect */}
              <div
                className={cn(
                  "absolute inset-0 bg-secondary/10 rounded-xl blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-50",
                  isActive("/checkout") && "opacity-100"
                )}
              />

              {/* Icon */}
              <div
                className={cn(
                  "relative transition-all duration-300",
                  isActive("/checkout")
                    ? "text-primary"
                    : "text-secondary group-hover:text-primary"
                )}
              >
                <ShoppingCart
                  strokeWidth={isActive("/checkout") ? 2.5 : 2}
                  className="w-6 h-6"
                />
                {/* Cart Badge */}
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </div>
              {/* Label */}
              <span
                className={cn(
                  "text-xs font-medium transition-colors duration-300",
                  isActive("/checkout")
                    ? "text-primary"
                    : "text-secondary group-hover:text-primary"
                )}
              >
                Cart
              </span>
              {/* Active Indicator Dot */}
              {isActive("/checkout") && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
              )}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export { DesktopNavigation };