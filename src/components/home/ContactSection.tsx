'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

export function ContactSection() {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Arabian Street', 'Doha, Qatar'],
      action: 'Get Directions',
      href: 'https://maps.google.com',
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+974 1234 5678', '+974 8765 4321'],
      action: 'Call Now',
      href: 'tel:+97412345678',
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@soofimandi.com', 'orders@soofimandi.com'],
      action: 'Send Email',
      href: 'mailto:info@soofimandi.com',
    },
    {
      icon: Clock,
      title: 'Opening Hours',
      details: ['Daily: 11:00 AM - 11:00 PM', 'Friday: 2:00 PM - 11:00 PM'],
      action: null,
      href: null,
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      name: 'Facebook',
      href: 'https://facebook.com/soofimandi',
      color: 'hover:text-blue-600',
    },
    {
      icon: Instagram,
      name: 'Instagram',
      href: 'https://instagram.com/soofimandi',
      color: 'hover:text-pink-600',
    },
    {
      icon: Twitter,
      name: 'Twitter',
      href: 'https://twitter.com/soofimandi',
      color: 'hover:text-blue-400',
    },
  ];

  return (
    <section className="py-16 bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 geometric-pattern opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-h1 text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-body-lg text-foreground/70 max-w-2xl mx-auto">
            Have questions or want to make a reservation? We&apos;re here to help. 
            Reach out to us through any of the channels below.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <Card 
              key={info.title}
              variant="default" 
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                
                <h3 className="text-body font-semibold text-foreground mb-3">
                  {info.title}
                </h3>
                
                <div className="space-y-1 mb-4">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-small text-foreground/70">
                      {detail}
                    </p>
                  ))}
                </div>
                
                {info.action && info.href && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => window.open(info.href, '_blank')}
                    className="w-full"
                  >
                    {info.action}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Media and Newsletter */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Social Media */}
          <div className="text-center md:text-left">
            <h3 className="text-h3 text-foreground mb-4">
              Follow Us
            </h3>
            <p className="text-body text-foreground/70 mb-6">
              Stay updated with our latest dishes, special offers, and behind-the-scenes content.
            </p>
            
            <div className="flex justify-center md:justify-start gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary transition-colors duration-200 ${social.color}`}
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <Card variant="cultural">
            <CardContent className="p-6">
              <h3 className="text-h3 text-foreground mb-3">
                Stay Updated
              </h3>
              <p className="text-body text-foreground/70 mb-4">
                Subscribe to our newsletter for exclusive offers and updates.
              </p>
              
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-700 border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <Button variant="primary" size="sm">
                  Subscribe
                </Button>
              </div>
              
              <p className="text-small text-foreground/60 mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-h2 font-bold text-primary mb-1">500+</div>
            <div className="text-small text-foreground/70">Happy Customers</div>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-h2 font-bold text-primary mb-1">50+</div>
            <div className="text-small text-foreground/70">Menu Items</div>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-h2 font-bold text-primary mb-1">5</div>
            <div className="text-small text-foreground/70">Years Experience</div>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-h2 font-bold text-primary mb-1">4.8★</div>
            <div className="text-small text-foreground/70">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}