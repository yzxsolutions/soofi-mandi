'use client';

import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail('');
  };

  if (isSubscribed) {
    return (
      <Card variant="cultural">
        <CardContent className="p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-h3 text-foreground mb-2">Welcome to our family!</h3>
          <p className="text-body text-foreground/70">
            You&apos;ll receive exclusive offers and updates about our authentic Arabian cuisine.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="cultural">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Stay Updated
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-body text-foreground/70 mb-4">
          Subscribe to our newsletter for exclusive offers, new menu items, and authentic Arabian recipes!
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
          
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isLoading || !email.trim()}
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
        
        <p className="text-xs text-foreground/50 mt-3 text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </CardContent>
    </Card>
  );
}