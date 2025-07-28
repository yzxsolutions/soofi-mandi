"use client";

import { useState, useEffect } from "react";
import CategoryNavigation from "@/components/menu/CategoryNavigation";
import SearchFilter from "@/components/menu/SearchFilter";
import MenuGrid from "@/components/menu/MenuGrid";
import FloatingCart from "@/components/menu/FloatingCart";
import QuickViewModal from "@/components/menu/QuickViewModal";
import { MenuItem, MenuFilter } from "@/types";
import { searchMenuItems, mockMenuItems } from "@/lib/mock-data";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<MenuFilter>({
    category: "all",
    priceRange: { min: 0, max: 100 },
    dietary: "all",
    spiceLevel: "all",
    sortBy: "name",
  });
  const [quickViewItem, setQuickViewItem] = useState<MenuItem | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  useEffect(() => {
    // Simulate API call
    const loadMenuItems = async () => {
      setIsLoading(true);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      let items = mockMenuItems;

      // Apply search filter
      if (searchQuery.trim()) {
        items = searchMenuItems(searchQuery);
      }

      // Apply category filter
      if (filters.category !== "all") {
        items = items.filter((item) => item.category === filters.category);
      }

      // Apply dietary filter
      if (filters.dietary !== "all") {
        if (filters.dietary === "vegetarian") {
          items = items.filter((item) => item.isVegetarian);
        } else if (filters.dietary === "non-vegetarian") {
          items = items.filter((item) => !item.isVegetarian);
        }
      }

      // Apply spice level filter
      if (filters.spiceLevel !== "all") {
        items = items.filter((item) => item.spiceLevel === filters.spiceLevel);
      }

      // Apply price range filter
      items = items.filter(
        (item) =>
          item.price >= filters.priceRange.min &&
          item.price <= filters.priceRange.max
      );

      // Apply sorting
      switch (filters.sortBy) {
        case "price-low":
          items.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          items.sort((a, b) => b.price - a.price);
          break;
        case "popularity":
          items.sort((a, b) => b.averageRating - a.averageRating);
          break;
        case "name":
        default:
          items.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }

      setMenuItems(items);
      setIsLoading(false);
    };

    loadMenuItems();
  }, [activeCategory, searchQuery, filters]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setFilters((prev) => ({
      ...prev,
      category: category as MenuFilter["category"],
    }));
  };

  const handleFiltersChange = (newFilters: MenuFilter) => {
    setFilters(newFilters);
    setActiveCategory(newFilters.category);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleQuickView = (item: MenuItem) => {
    setQuickViewItem(item);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewItem(null);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        {/* Fixed Full-Height Sidebar - Hidden on mobile */}
        <div className="hidden lg:block sticky top-0 w-80 h-screen bg-black/80 backdrop-blur-lg border-r border-primary/20 shadow-2xl z-30 overflow-y-auto scrollbar-hide">
          <div className="p-6 h-full flex flex-col">
            {/* Header */}
            <div className="mb-8 pt-4">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Menu Filters
              </h2>
              <p className="text-sm text-foreground/60">Find your perfect dish</p>
            </div>

            {/* Category Navigation */}
            <div className="mb-8">
              <CategoryNavigation
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>

            {/* Search and Filters */}
            <div className="flex-1">
              <SearchFilter
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onSearchChange={handleSearchChange}
                searchQuery={searchQuery}
              />
            </div>

            {/* Footer Info */}
            <div className="mt-8 pt-6 border-t border-gray-700/50">
              <div className="text-center">
                <p className="text-sm text-foreground/60 mb-2">
                  Need help choosing?
                </p>
                <p className="text-xs text-foreground/50">
                  Call us at{" "}
                  <span className="font-semibold text-primary">
                    +974 1234 5678
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Filters - Shown only on mobile */}
          <div className="lg:hidden sticky top-0 z-20 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 p-4">
            <div className="mb-4">
              <CategoryNavigation
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>
            <SearchFilter
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onSearchChange={handleSearchChange}
              searchQuery={searchQuery}
            />
          </div>

          {/* Content */}
          <div className="p-4 lg:p-8 pt-40">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-h1 text-foreground mb-4">Our Menu</h1>
            <p className="text-body text-foreground/70 max-w-2xl">
              Discover authentic Arabian flavors crafted with traditional
              recipes and the finest ingredients. Each dish tells a story of
              heritage and culinary excellence.
            </p>
          </div>

          {/* Results Summary */}
          {!isLoading && (
            <div className="mb-6 text-sm text-foreground/60">
              {searchQuery ? (
                <span>
                  Found{" "}
                  <strong className="text-primary">{menuItems.length}</strong>{" "}
                  results for &quot;{searchQuery}&quot;
                </span>
              ) : (
                <span>
                  Showing{" "}
                  <strong className="text-primary">{menuItems.length}</strong>{" "}
                  items
                  {filters.category !== "all" && (
                    <span>
                      {" "}
                      in{" "}
                      <strong className="text-primary">
                        {filters.category}
                      </strong>
                    </span>
                  )}
                </span>
              )}
            </div>
          )}

          {/* Menu Items Grid */}
          <MenuGrid
            items={menuItems}
            isLoading={isLoading}
            onQuickView={handleQuickView}
          />

            {/* Footer Message */}
            {!isLoading && menuItems.length > 0 && (
              <div className="text-center mt-12 p-6 bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-800">
                <p className="text-foreground/70 mb-2">
                  Can&apos;t find what you&apos;re looking for?
                </p>
                <p className="text-sm text-foreground/50">
                  Call us at{" "}
                  <span className="font-semibold text-primary">
                    +974 1234 5678
                  </span>{" "}
                  for special requests or custom orders
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Cart */}
      <FloatingCart />

      {/* Quick View Modal */}
      <QuickViewModal
        item={quickViewItem}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
      />
    </div>
  );
}
