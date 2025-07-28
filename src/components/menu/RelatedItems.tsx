'use client';

import { useState, useEffect } from 'react';
import { MenuItem } from '@/types';
import { mockMenuItems } from '@/lib/mock-data';
import ItemCard from './ItemCard';
import Link from 'next/link';

interface RelatedItemsProps {
  currentItem: MenuItem;
}

export default function RelatedItems({ currentItem }: RelatedItemsProps) {
  const [relatedItems, setRelatedItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const getComplementaryItems = () => {
      // Define complementary relationships for better suggestions
      const complementaryMap: Record<string, string[]> = {
        // Mandi dishes complement with rice, appetizers, and beverages
        'mandi': ['rice', 'appetizers', 'beverages'],
        // Rice dishes complement with mandi and appetizers
        'rice': ['mandi', 'appetizers', 'beverages'],
        // Appetizers complement with main dishes
        'appetizers': ['mandi', 'rice', 'beverages'],
        // Beverages complement with all food items
        'beverages': ['mandi', 'rice', 'appetizers', 'desserts'],
        // Desserts complement with beverages
        'desserts': ['beverages', 'mandi', 'rice']
      };

      const complementaryCategories = complementaryMap[currentItem.category] || [];
      
      // Get items from the same category first (similar dishes)
      const sameCategory = mockMenuItems.filter(
        item => item.category === currentItem.category && item.id !== currentItem.id
      );

      // Get complementary items from related categories
      const complementaryItems = mockMenuItems.filter(
        item => complementaryCategories.includes(item.category) && item.id !== currentItem.id
      );

      // Get popular items as fallback
      const popularItems = mockMenuItems
        .filter(item => item.id !== currentItem.id)
        .sort((a, b) => b.averageRating - a.averageRating);

      // Prioritize: 2 from same category, 2 complementary, fill with popular
      const suggestions = [
        ...sameCategory.slice(0, 2),
        ...complementaryItems.slice(0, 2),
        ...popularItems
      ];

      // Remove duplicates and limit to 4 items
      const unique = suggestions.filter((item, index, self) => 
        index === self.findIndex(i => i.id === item.id)
      );

      return unique.slice(0, 4);
    };

    setRelatedItems(getComplementaryItems());
  }, [currentItem]);

  if (relatedItems.length === 0) {
    return null;
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'mandi':
        return 'Mandi Varieties';
      case 'rice':
        return 'Rice Dishes';
      case 'appetizers':
        return 'Appetizers';
      case 'beverages':
        return 'Beverages';
      case 'desserts':
        return 'Desserts';
      default:
        return category;
    }
  };

  return (
    <div className="mt-16">
      <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">You Might Also Like</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Discover more delicious dishes from our {getCategoryLabel(currentItem.category)} collection and other popular items
          </p>
        </div>

        {/* Related Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedItems.map((item, index) => (
            <div
              key={item.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link href={`/menu/${item.id}`}>
                <div className="group cursor-pointer">
                  <ItemCard item={item} showQuickView={false} />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* View More Link */}
        <div className="text-center mt-8">
          <Link href="/menu">
            <button className="px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 text-foreground border border-gray-700/50 hover:border-primary/50 rounded-2xl transition-all duration-300 font-medium">
              View Full Menu
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}