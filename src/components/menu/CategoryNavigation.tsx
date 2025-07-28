'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface CategoryNavigationProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', name: 'All Items', icon: '🍽️' },
  { id: 'mandi', name: 'Mandi Varieties', icon: '🍖' },
  { id: 'rice', name: 'Rice Dishes', icon: '🍚' },
  { id: 'appetizers', name: 'Appetizers', icon: '🥗' },
  { id: 'beverages', name: 'Beverages', icon: '🥤' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
];

export default function CategoryNavigation({ activeCategory, onCategoryChange }: CategoryNavigationProps) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-foreground/80 mb-3">Categories</h3>
      
      {/* Compact Grid Layout */}
      <div className="grid grid-cols-2 gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeCategory === category.id
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'bg-gray-800/40 text-foreground/70 hover:bg-primary/20 hover:text-primary border border-gray-700/50'
            }`}
          >
            <span className="text-base">{category.icon}</span>
            <span className="truncate">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}