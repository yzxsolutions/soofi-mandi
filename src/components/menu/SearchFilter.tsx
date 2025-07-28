'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MenuFilter } from '@/types';

interface SearchFilterProps {
  filters: MenuFilter;
  onFiltersChange: (filters: MenuFilter) => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export default function SearchFilter({ 
  filters, 
  onFiltersChange, 
  onSearchChange, 
  searchQuery 
}: SearchFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchQuery, onSearchChange]);

  const handleFilterChange = (key: keyof MenuFilter, value: unknown) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    handleFilterChange('priceRange', { min, max });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      category: 'all',
      priceRange: { min: 0, max: 100 },
      dietary: 'all',
      spiceLevel: 'all',
      sortBy: 'name',
    });
    setLocalSearchQuery('');
  };

  const hasActiveFilters = 
    filters.category !== 'all' ||
    filters.dietary !== 'all' ||
    filters.spiceLevel !== 'all' ||
    filters.priceRange.min > 0 ||
    filters.priceRange.max < 100 ||
    searchQuery.length > 0;

  return (
    <div className="space-y-4">
      {/* Compact Search Bar */}
      <div role="search" aria-label="Search menu items">
        <h3 className="text-sm font-medium text-foreground/80 mb-2" id="search-label">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40 w-4 h-4" aria-hidden="true" />
          <Input
            type="text"
            placeholder="Search items..."
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            className="pl-9 pr-8 py-2 w-full bg-gray-800/40 border border-gray-700/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-foreground placeholder-foreground/50 text-sm"
            aria-label="Search menu items"
            aria-describedby="search-label"
            role="searchbox"
          />
          {localSearchQuery && (
            <button
              onClick={() => setLocalSearchQuery('')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-foreground/40 hover:text-foreground/60 touch-target focus-enhanced"
              aria-label="Clear search"
              title="Clear search"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Compact Filter Toggle */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 px-3 py-2 bg-gray-800/40 border border-gray-700/50 rounded-xl text-sm font-medium text-foreground/70 hover:text-primary transition-colors touch-target focus-enhanced"
          aria-expanded={isFilterOpen}
          aria-controls="filter-panel"
          aria-label={`${isFilterOpen ? 'Hide' : 'Show'} additional filters`}
        >
          <Filter className="w-4 h-4" aria-hidden="true" />
          <span>More Filters</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
          {hasActiveFilters && (
            <span 
              className="bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center ml-1"
              aria-label="Active filters indicator"
              title="Active filters applied"
            >
              !
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-xs text-foreground/60 hover:text-primary transition-colors touch-target focus-enhanced"
            aria-label="Clear all active filters"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Compact Filter Panel */}
      {isFilterOpen && (
        <div 
          id="filter-panel" 
          className="space-y-4 pt-4 border-t border-gray-700/50"
          role="region"
          aria-label="Filter options"
        >
          {/* Sort By */}
          <div>
            <label 
              htmlFor="sort-select"
              className="block text-xs font-medium text-foreground/80 mb-2"
            >
              Sort By
            </label>
            <select
              id="sort-select"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full p-2 bg-gray-800/40 border border-gray-700/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-foreground text-sm focus-enhanced"
              aria-label="Sort menu items by"
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-xs font-medium text-foreground/80 mb-2">
              Price Range (QR)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="100"
                value={filters.priceRange.min}
                onChange={(e) => handlePriceRangeChange(Number(e.target.value), filters.priceRange.max)}
                className="flex-1 p-2 bg-gray-800/40 border border-gray-700/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-foreground text-sm"
                placeholder="Min"
              />
              <span className="text-foreground/50 text-xs">to</span>
              <input
                type="number"
                min="0"
                max="100"
                value={filters.priceRange.max}
                onChange={(e) => handlePriceRangeChange(filters.priceRange.min, Number(e.target.value))}
                className="flex-1 p-2 bg-gray-800/40 border border-gray-700/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-foreground text-sm"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Dietary Preferences */}
          <div>
            <label className="block text-xs font-medium text-foreground/80 mb-2">
              Dietary
            </label>
            <div className="grid grid-cols-1 gap-1">
              {[
                { value: 'all', label: 'All' },
                { value: 'vegetarian', label: 'Vegetarian' },
                { value: 'non-vegetarian', label: 'Non-Veg' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange('dietary', option.value)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    filters.dietary === option.value
                      ? 'bg-primary text-white'
                      : 'bg-gray-800/40 text-foreground/70 hover:bg-primary/20 hover:text-primary border border-gray-700/50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Spice Level filter removed as requested */}
        </div>
      )}
    </div>
  );
}