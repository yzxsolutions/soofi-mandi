'use client';

import { useState } from 'react';
import { MapPin, User, Phone, Mail, Clock, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useSavedAddressesStore, SavedAddress } from '@/stores/saved-addresses-store';
import { CustomerInfo, DeliveryInfo } from '@/types';

interface SavedAddressSelectorProps {
  onSelectAddress: (customerInfo: CustomerInfo, deliveryInfo: DeliveryInfo) => void;
  className?: string;
}

export function SavedAddressSelector({ onSelectAddress, className = '' }: SavedAddressSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { getValidAddresses, deleteAddress, updateLastUsed } = useSavedAddressesStore();
  
  const savedAddresses = getValidAddresses();

  if (savedAddresses.length === 0) {
    return null;
  }

  const handleSelectAddress = (address: SavedAddress) => {
    updateLastUsed(address.id);
    onSelectAddress(address.customerInfo, address.deliveryInfo);
    setIsExpanded(false);
  };

  const handleDeleteAddress = (e: React.MouseEvent, addressId: string) => {
    e.stopPropagation();
    deleteAddress(addressId);
  };

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) {
      return 'Just now';
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return 'Today';
    }
  };

  return (
    <div className={`mb-6 ${className}`}>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-black/30 backdrop-blur-sm border border-primary/20 rounded-xl hover:bg-black/50 hover:border-primary/40 transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="font-medium text-white">
            Use Saved Address ({savedAddresses.length})
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-primary" />
        ) : (
          <ChevronDown className="w-5 h-5 text-primary" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-3 space-y-3 animate-fade-in-up">
          {savedAddresses.map((address) => (
            <div
              key={address.id}
              className="p-4 bg-black/40 backdrop-blur-sm border border-gray-700/50 rounded-xl hover:border-primary/50 transition-colors cursor-pointer group"
              onClick={() => handleSelectAddress(address)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  {/* Address Name & Time */}
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white truncate">
                      {address.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <Clock className="w-3 h-3" />
                      {formatTimeAgo(address.lastUsed)}
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <User className="w-4 h-4 text-primary" />
                      <span>{address.customerInfo.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>{address.customerInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <Mail className="w-4 h-4 text-primary" />
                      <span>{address.customerInfo.email}</span>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="line-clamp-2">{address.deliveryInfo.address}</p>
                      {address.deliveryInfo.contactPerson && (
                        <p className="text-xs text-white/60 mt-1">
                          Contact: {address.deliveryInfo.contactPerson}
                        </p>
                      )}
                      {address.deliveryInfo.instructions && (
                        <p className="text-xs text-white/60 mt-1">
                          Note: {address.deliveryInfo.instructions}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={(e) => handleDeleteAddress(e, address.id)}
                  className="ml-3 p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete address"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Select Button */}
              <div className="mt-3 pt-3 border-t border-gray-700/50">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full text-primary border-primary/30 hover:bg-primary/10 bg-transparent"
                >
                  Use This Address
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}