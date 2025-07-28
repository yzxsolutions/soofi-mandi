import React from 'react';

// Basic Skeleton component
export function Skeleton({ 
  variant = 'card', 
  className = '' 
}: { 
  variant?: 'card' | 'text' | 'circle';
  className?: string;
}) {
  const baseClasses = 'animate-pulse bg-gray-300 rounded';
  const variantClasses = {
    card: 'h-64',
    text: 'h-4',
    circle: 'rounded-full w-12 h-12'
  };
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
  );
}

export function FeaturedItemsSkeleton() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-8 bg-gray-300 rounded-md w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded-md w-96 mx-auto animate-pulse"></div>
        </div>

        {/* Featured Items Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              {/* Image Skeleton */}
              <div className="aspect-square mb-4 bg-gray-300 rounded-2xl"></div>
              
              {/* Content Skeleton */}
              <div className="text-center space-y-3">
                <div className="h-6 bg-gray-300 rounded-md w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-300 rounded-md w-full mx-auto"></div>
                <div className="h-4 bg-gray-300 rounded-md w-2/3 mx-auto"></div>
                <div className="h-8 bg-gray-300 rounded-md w-20 mx-auto"></div>
                <div className="h-10 bg-gray-300 rounded-xl w-32 mx-auto"></div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button Skeleton */}
        <div className="text-center mt-12">
          <div className="h-12 bg-gray-300 rounded-lg w-40 mx-auto animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

export function MenuItemSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square mb-4 bg-gray-300 rounded-2xl"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  );
}