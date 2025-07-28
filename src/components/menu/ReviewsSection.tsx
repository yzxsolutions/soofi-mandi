'use client';

import { useState, useRef } from 'react';
import { Star, ThumbsUp, MessageCircle, Camera, Send, X, Upload } from 'lucide-react';
import { MenuItem, Review } from '@/types';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

interface ReviewsSectionProps {
  item: MenuItem;
}

export default function ReviewsSection({ item }: ReviewsSectionProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    customerName: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewImages, setReviewImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call with image upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Reset form
    setNewReview({ rating: 5, comment: '', customerName: '' });
    setReviewImages([]);
    setShowReviewForm(false);
    setIsSubmitting(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        if (file.type.startsWith('image/') && reviewImages.length + newImages.length < 3) {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target?.result) {
              setReviewImages(prev => [...prev, e.target!.result as string]);
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const removeImage = (index: number) => {
    setReviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRatingChange?.(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            disabled={!interactive}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-400'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50">
      {/* Reviews Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Customer Reviews</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {renderStars(Math.round(item.averageRating))}
              <span className="text-xl font-bold text-foreground">{item.averageRating.toFixed(1)}</span>
            </div>
            <span className="text-foreground/60">({item.reviews.length} reviews)</span>
          </div>
        </div>
        <Button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-2xl flex items-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          Write Review
        </Button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="mb-8 p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Write a Review</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Your Name</label>
              <input
                type="text"
                value={newReview.customerName}
                onChange={(e) => setNewReview(prev => ({ ...prev, customerName: e.target.value }))}
                className="w-full p-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-foreground placeholder-foreground/50"
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
              {renderStars(newReview.rating, true, (rating) => 
                setNewReview(prev => ({ ...prev, rating }))
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Your Review</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                className="w-full p-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-foreground placeholder-foreground/50 resize-none"
                placeholder="Share your experience with this dish..."
                rows={4}
                required
              />
            </div>

            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Add Photos (Optional)
              </label>
              <div className="space-y-3">
                {/* Upload Button */}
                <div className="flex items-center gap-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={reviewImages.length >= 3}
                    className="bg-gray-700/50 hover:bg-gray-600/50 text-foreground px-4 py-2 rounded-xl border border-gray-600/50 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Camera className="w-4 h-4" />
                    {reviewImages.length === 0 ? 'Add Photos' : `Add More (${reviewImages.length}/3)`}
                  </Button>
                  <span className="text-xs text-foreground/60">
                    Upload up to 3 photos of your dish
                  </span>
                </div>

                {/* Image Preview */}
                {reviewImages.length > 0 && (
                  <div className="flex gap-3 flex-wrap">
                    {reviewImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-600/50">
                          <Image
                            src={image}
                            alt={`Review image ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Review
                  </>
                )}
              </Button>
              <Button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="bg-gray-700/50 hover:bg-gray-600/50 text-foreground px-6 py-3 rounded-xl border border-gray-600/50"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {item.reviews.length > 0 ? (
          item.reviews.map((review) => (
            <div key={review.id} className="p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-foreground">{review.customerName}</h4>
                    {review.isVerified && (
                      <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full border border-green-500/30">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {renderStars(review.rating)}
                    <span className="text-sm text-foreground/60">{formatDate(review.createdAt)}</span>
                  </div>
                </div>
                <Button className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-full border border-gray-600/50">
                  <ThumbsUp className="w-4 h-4 text-foreground/60" />
                </Button>
              </div>
              
              <p className="text-foreground/80 leading-relaxed mb-4">{review.comment}</p>
              
              {review.images && review.images.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Customer Photos
                  </h5>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {review.images.map((image, index) => (
                      <div key={index} className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border border-gray-600/50 hover:border-primary/50 transition-colors cursor-pointer group">
                        <Image
                          src={image}
                          alt={`Review image ${index + 1} by ${review.customerName}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                          sizes="96px"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Upload className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Reviews Yet</h3>
            <p className="text-foreground/60 mb-6">Be the first to share your experience with this dish!</p>
            <Button
              onClick={() => setShowReviewForm(true)}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-2xl"
            >
              Write First Review
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}