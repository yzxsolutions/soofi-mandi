import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Address',
      value: 'Soofi Mandi Bangalore Bannerghatta Rd, Gottigere, Bengaluru, Kothnur, Karnataka 560076 '
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9562577775',
      href: 'tel:+91 9562577775'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'soofimandi@gmail.com',
      href: 'mailto:soofimandi@gmail.com'
    },
    {
      icon: Clock,
      label: 'Hours',
      value: 'Daily: 11:00 AM - 11:30 PM'
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  const quickLinks = [
    { href: '/home', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <footer className="bg-accent text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 geometric-pattern opacity-10" />
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 warm-gradient rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">SM</span>
                </div>
                <span className="text-h2 font-display text-white">
                  Soofi Mandi
                </span>
              </div>
              <p className="text-body text-white/80 mb-6 max-w-md">
                Experience authentic Arabian flavors with our traditional Mandi dishes, 
                prepared with time-honored recipes and the finest ingredients. 
                Taste the heritage of Middle Eastern cuisine.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-200"
                      aria-label={social.label}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-h3 font-display text-white mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body text-white/80 hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-h3 font-display text-white mb-4">Contact Info</h3>
              <ul className="space-y-4">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  const content = (
                    <div className="flex items-start space-x-3">
                      <Icon size={18} className="text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-small text-white/60 font-medium">{info.label}</p>
                        <p className="text-body text-white/80">{info.value}</p>
                      </div>
                    </div>
                  );

                  return (
                    <li key={info.label}>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="block hover:text-primary transition-colors duration-200"
                        >
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-body text-white/60">
                © {currentYear} Soofi Mandi. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link
                  href="/privacy"
                  className="text-body text-white/60 hover:text-primary transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-body text-white/60 hover:text-primary transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };