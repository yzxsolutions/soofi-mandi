'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// Mock reviews data for the carousel
const reviews = [
  {
    id: '1',
    customerName: 'Ahmed Hassan',
    rating: 5,
    comment: 'Absolutely authentic! The lamb mandi reminded me of home. Perfect spices and tender meat. The rice was perfectly cooked and the flavors were incredible.',
    date: '2024-01-15',
    isVerified: true,
  },
  {
    id: '2',
    customerName: 'Sarah Johnson',
    rating: 4,
    comment: 'Delicious food and generous portions. The chicken mandi was flavorful and the rice was perfectly cooked. Great value for money!',
    date: '2024-01-10',
    isVerified: true,
  },
  {
    id: '3',
    customerName: 'Omar Al-Rashid',
    rating: 5,
    comment: 'Best Middle Eastern food in the city! The mutton mandi is exceptional. The meat falls off the bone and the spices are perfectly balanced.',
    date: '2024-01-08',
    isVerified: true,
  },
  {
    id: '4',
    customerName: 'Fatima Al-Zahra',
    rating: 5,
    comment: 'Outstanding quality and authentic taste. The traditional cooking methods really make a difference. Highly recommended!',
    date: '2024-01-05',
    isVerified: true,
  },
  {
    id: '5',
    customerName: 'Mohammed Ali',
    rating: 4,
    comment: 'Great experience! The food arrived hot and fresh. The portion sizes are generous and the flavors are authentic.',
    date: '2024-01-03',
    isVerified: true,
  },
];

export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setIsAutoPlaying(false);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setIsAutoPlaying(false);
  };

  const goToReview = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-h1 text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-body-lg text-foreground/70 max-w-2xl mx-auto">
            Don&apos;t just take our word for it - hear from our satisfied customers who have experienced 
            the authentic taste of Arabian cuisine
          </p>
        </div>

        {/* Reviews Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 px-4">
                  <Card variant="cultural" className="mx-auto max-w-2xl">
                    <CardContent className="p-8 text-center">
                      {/* Quote Icon */}
                      <div className="mb-6">
                        <Quote className="w-12 h-12 text-primary/30 mx-auto" />
                      </div>

                      {/* Rating */}
                      <div className="flex justify-center mb-4">
                        {renderStars(review.rating)}
                      </div>

                      {/* Review Text */}
                      <blockquote className="text-body-lg text-foreground/80 mb-6 italic leading-relaxed">
                        &quot;{review.comment}&quot;
                      </blockquote>

                      {/* Customer Info */}
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-semibold">
                            {review.customerName.charAt(0)}
                          </span>
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-2">
                            <span className="text-body font-semibold text-foreground">
                              {review.customerName}
                            </span>
                            {review.isVerified && (
                              <div className="w-4 h-4 bg-success rounded-full flex items-center justify-center">
                                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <span className="text-small text-foreground/60">
                            {new Date(review.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="secondary"
            size="sm"
            onClick={prevReview}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full p-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full p-0"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToReview(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-primary scale-110'
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Overall Rating Stats */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 bg-gray-800 rounded-2xl px-8 py-4 shadow-warm-md">
            <div className="flex items-center gap-2">
              <div className="flex">
                {renderStars(5)}
              </div>
              <span className="text-h3 font-bold text-foreground">4.8</span>
            </div>
            <div className="w-px h-8 bg-foreground/20" />
            <div className="text-left">
              <div className="text-body font-semibold text-foreground">500+ Reviews</div>
              <div className="text-small text-foreground/60">Verified customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}