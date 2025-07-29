'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  UtensilsCrossed, 
  ShoppingCart, 
  User, 
  Phone,
  ChevronUp
} from 'lucide-react';
import { useCartCount } from '@/hooks/useCartCount';
import { useUIStore } from '@/stores/ui-store';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const itemCount = useCartCount();
  const isModalOpen = useUIStore((state) => state.isModalOpen);

  const navItems: NavItem[] = [
    { href: '/home', label: 'Home', icon: Home },
    { href: '/menu', label: 'Menu', icon: UtensilsCrossed },
    { href: '/checkout', label: 'Cart', icon: ShoppingCart, badge: itemCount },
    { href: '/contact', label: 'Contact', icon: Phone },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Bottom Navigation - Only visible on mobile */}
      <nav 
        className={cn(
          'md:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 safe-area-bottom',
          isModalOpen ? 'translate-y-full' : 'translate-y-0'
        )}
      >
        <div className="bg-black/90 backdrop-blur-xl border-t border-primary/20">
          <div className="flex items-center justify-around px-2 py-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 touch-target min-w-[60px]',
                    isActive(item.href)
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/60 hover:text-primary hover:bg-primary/5'
                  )}
                >
                  {/* Icon with badge */}
                  <div className="relative">
                    <IconComponent 
                      className={cn(
                        'w-5 h-5 transition-all duration-300',
                        isActive(item.href) ? 'scale-110' : ''
                      )} 
                    />
                    
                    {/* Badge for cart */}
                    {typeof item.badge === 'number' && item.badge > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                        {item.badge > 99 ? '99+' : item.badge}
                      </span>
                    )}
                  </div>
                  
                  {/* Label */}
                  <span className={cn(
                    'text-xs font-medium mt-1 transition-colors duration-300',
                    isActive(item.href) ? 'text-primary' : 'text-foreground/60'
                  )}>
                    {item.label}
                  </span>
                  
                  {/* Active indicator */}
                  {isActive(item.href) && (
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from being hidden behind bottom nav - Mobile only */}
      <div className="md:hidden h-20 safe-area-bottom" />
    </>
  );
}