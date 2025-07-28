"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Star, Clock, Flame, Leaf, ChefHat } from "lucide-react";
import { MenuItem } from "@/types";
import { getMenuItemById } from "@/lib/mock-data";
import ItemDetailHero from "@/components/menu/ItemDetailHero";
import RelatedItems from "@/components/menu/RelatedItems";
import ReviewsSection from "@/components/menu/ReviewsSection";
import FloatingCart from "@/components/menu/FloatingCart";
import { Button } from "@/components/ui/Button";

export default function MenuItemClient() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState<MenuItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadItem = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      const menuItem = getMenuItemById(params.id as string);
      setItem(menuItem || null);
      setIsLoading(false);
    };

    if (params.id) {
      loadItem();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground/60">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍽️</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Item Not Found
          </h1>
          <p className="text-foreground/60 mb-6">
            The menu item you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button
            onClick={() => router.push("/menu")}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-2xl"
          >
            Back to Menu
          </Button>
        </div>
      </div>
    );
  }

  const getSpiceIcon = (level: string) => {
    switch (level) {
      case "mild":
        return <Flame className="w-5 h-5 text-green-500" />;
      case "medium":
        return <Flame className="w-5 h-5 text-yellow-500" />;
      case "hot":
        return <Flame className="w-5 h-5 text-red-500" />;
      default:
        return <Flame className="w-5 h-5 text-gray-400" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "mandi":
        return "Mandi Varieties";
      case "rice":
        return "Rice Dishes";
      case "appetizers":
        return "Appetizers";
      case "beverages":
        return "Beverages";
      case "desserts":
        return "Desserts";
      default:
        return category;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Enhanced Navigation Header */}
      <div className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => router.back()}
                variant="secondary"
                className="p-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-2xl transition-all duration-200 hover:scale-110"
              >
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {item.name}
                </h1>
                <p className="text-sm text-foreground/60">
                  {getCategoryLabel(item.category)}
                </p>
              </div>
            </div>

            {/* Back to Menu Button */}
            <Button
              onClick={() => router.push("/menu")}
              variant="secondary"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-primary/20 border border-gray-700/50 hover:border-primary/50 rounded-2xl transition-all duration-200 text-foreground hover:text-primary"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span>Back to Menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <ItemDetailHero item={item} />

      {/* Optimized Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Main Content - Full Width */}
          <div className="space-y-10">
            {/* Enhanced Basic Information */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-gray-700/50 shadow-2xl">
              {/* Quick Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8 p-6 bg-gray-800/30 rounded-2xl border border-gray-700/30">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-bold text-foreground">
                      {item.averageRating}
                    </span>
                  </div>
                  <span className="text-sm text-foreground/60">
                    ({item.reviews.length} reviews)
                  </span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-lg font-bold text-foreground">
                      {item.preparationTime}
                    </span>
                  </div>
                  <span className="text-sm text-foreground/60">Minutes</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {getSpiceIcon(item.spiceLevel)}
                    <span className="text-lg font-bold text-foreground capitalize">
                      {item.spiceLevel}
                    </span>
                  </div>
                  <span className="text-sm text-foreground/60">
                    Spice Level
                  </span>
                </div>
                {item.isVegetarian && (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Leaf className="w-5 h-5 text-green-500" />
                      <span className="text-lg font-bold text-green-500">
                        Yes
                      </span>
                    </div>
                    <span className="text-sm text-foreground/60">
                      Vegetarian
                    </span>
                  </div>
                )}
              </div>

              {/* Description Section */}
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                  About This Dish
                </h2>
                <p className="text-foreground/85 text-lg leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>

              {/* Enhanced Ingredients Section */}
              <div className="mb-10">
                <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
                  <ChefHat className="w-7 h-7 text-primary" />
                  Fresh Ingredients
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {item.ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className="group px-4 py-3 bg-gradient-to-br from-gray-800/40 to-gray-800/60 text-foreground/90 rounded-2xl text-sm font-medium border border-gray-700/40 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10"
                    >
                      <span className="group-hover:text-primary transition-colors duration-300">
                        {ingredient}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Nutritional Information */}
              {item.nutritionalInfo && (
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
                    <svg
                      className="w-7 h-7 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    Nutritional Facts
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-800/60 rounded-2xl p-6 text-center border border-gray-700/40 hover:border-primary/30 transition-all duration-300 hover:scale-105">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {item.nutritionalInfo.calories}
                      </div>
                      <div className="text-sm font-medium text-foreground/70 uppercase tracking-wide">
                        Calories
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-800/60 rounded-2xl p-6 text-center border border-gray-700/40 hover:border-primary/30 transition-all duration-300 hover:scale-105">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {item.nutritionalInfo.protein}g
                      </div>
                      <div className="text-sm font-medium text-foreground/70 uppercase tracking-wide">
                        Protein
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-800/60 rounded-2xl p-6 text-center border border-gray-700/40 hover:border-primary/30 transition-all duration-300 hover:scale-105">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {item.nutritionalInfo.carbs}g
                      </div>
                      <div className="text-sm font-medium text-foreground/70 uppercase tracking-wide">
                        Carbs
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-800/60 rounded-2xl p-6 text-center border border-gray-700/40 hover:border-primary/30 transition-all duration-300 hover:scale-105">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {item.nutritionalInfo.fat}g
                      </div>
                      <div className="text-sm font-medium text-foreground/70 uppercase tracking-wide">
                        Fat
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Reviews Section */}
            <ReviewsSection item={item} />
          </div>
        </div>

        {/* Related Items with Better Spacing */}
        <div className="mt-16">
          <RelatedItems currentItem={item} />
        </div>
      </div>

      {/* Floating Cart */}
      <FloatingCart />

      {/* Floating Back to Menu Button (Mobile) */}
      <div className="fixed bottom-6 left-6 z-30 md:hidden">
        <Button
          onClick={() => router.push("/menu")}
          className="p-4 bg-gray-900/90 backdrop-blur-sm hover:bg-gray-800/90 text-white rounded-full border border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}