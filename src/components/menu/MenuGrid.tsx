'use client';

import { MenuItem } from '@/types';
import ItemCard from './ItemCard';

interface MenuGridProps {
  items: MenuItem[];
  isLoading?: boolean;
  onQuickView?: (item: MenuItem) => void;
}

export default function MenuGrid({ items, isLoading = false, onQuickView }: MenuGridProps) {
  if (isLoading) {
    return (
      <div className="mobile-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-transparent animate-pulse"
          >
            <div className="mobile-skeleton mobile-skeleton-image mb-4"></div>
            <div className="mobile-text-center mobile-space-y-4">
              <div className="mobile-skeleton mobile-skeleton-title w-3/4 mx-auto"></div>
              <div className="mobile-skeleton mobile-skeleton-text w-full mx-auto"></div>
              <div className="mobile-skeleton mobile-skeleton-text w-2/3 mx-auto"></div>
              <div className="mobile-skeleton h-8 w-1/2 mx-auto"></div>
              <div className="mobile-skeleton h-10 w-full mx-auto"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-foreground/40 text-6xl mb-4">🍽️</div>
        <h3 className="text-xl font-semibold text-foreground/60 mb-2">
          No items found
        </h3>
        <p className="text-foreground/50">
          Try adjusting your filters or search terms
        </p>
      </div>
    );
  }

  return (
    <div className="mobile-grid">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <ItemCard item={item} onQuickView={onQuickView} />
        </div>
      ))}
    </div>
  );
}