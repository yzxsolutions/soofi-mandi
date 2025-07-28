'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';
import { ChefHat, Clock, Award, Heart } from 'lucide-react';

export function AboutSection() {
  const features = [
    {
      icon: ChefHat,
      title: 'Traditional Recipes',
      description: 'Authentic Arabian recipes passed down through generations, prepared by skilled chefs.',
    },
    {
      icon: Clock,
      title: 'Slow-Cooked Perfection',
      description: 'Our signature mandi is slow-cooked for hours to achieve the perfect tenderness and flavor.',
    },
    {
      icon: Award,
      title: 'Premium Ingredients',
      description: 'We source only the finest spices and ingredients to ensure authentic taste in every bite.',
    },
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Every dish is prepared with care and passion, bringing you the true essence of Arabian hospitality.',
    },
  ];

  return (
    <section className="py-16  relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 geometric-pattern opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-h1 text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-body text-foreground/80">
                <p>
                  Welcome to Soofi Mandi, where authentic Arabian flavors meet modern dining excellence. 
                  Our journey began with a simple mission: to bring the rich culinary traditions of the 
                  Middle East to your table.
                </p>
                <p>
                  Our signature mandi dishes are prepared using traditional underground cooking methods, 
                  where tender meat is slow-cooked with fragrant basmati rice and a carefully balanced 
                  blend of aromatic spices. Each dish tells a story of heritage, craftsmanship, and 
                  unwavering commitment to quality.
                </p>
                <p>
                  From our kitchen to your home, we ensure that every meal captures the warmth and 
                  hospitality that defines Arabian culture. Experience the difference that authentic 
                  ingredients and traditional cooking methods make.
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="flex items-start gap-3 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-body font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-small text-foreground/70">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* About Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Main Image */}
              <div className="col-span-2 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-warm-lg">
                <Image
                  src="/images/about/kitchen-cooking.jpg"
                  alt="Traditional Arabian cooking in our kitchen"
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
              
              {/* Secondary Images */}
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-warm-md">
                <Image
                  src="/images/about/spices.jpg"
                  alt="Traditional Arabian spices"
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
              
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-warm-md">
                <Image
                  src="/images/about/chef-preparing.jpg"
                  alt="Chef preparing traditional mandi"
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 warm-gradient rounded-full opacity-20 animate-float-slow" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/20 rounded-full animate-float-medium" />
          </div>
        </div>
      </div>
    </section>
  );
}