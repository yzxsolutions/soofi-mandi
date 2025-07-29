import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CustomerInfo, DeliveryInfo } from '@/types';

export interface SavedAddress {
  id: string;
  name: string; // Display name for the address
  customerInfo: CustomerInfo;
  deliveryInfo: DeliveryInfo;
  createdAt: number;
  lastUsed: number;
}

interface SavedAddressesStore {
  addresses: SavedAddress[];
  
  // Actions
  saveAddress: (customerInfo: CustomerInfo, deliveryInfo: DeliveryInfo, name?: string) => void;
  getValidAddresses: () => SavedAddress[];
  deleteAddress: (id: string) => void;
  updateLastUsed: (id: string) => void;
  clearExpiredAddresses: () => void;
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000; // 1 day in milliseconds

export const useSavedAddressesStore = create<SavedAddressesStore>()(
  persist(
    (set, get) => ({
      addresses: [],

      saveAddress: (customerInfo, deliveryInfo, name) => {
        const now = Date.now();
        const addressName = name || `${customerInfo.name} - ${deliveryInfo.address.substring(0, 30)}...`;
        
        // Check if similar address already exists
        const existingAddresses = get().getValidAddresses();
        const existingAddress = existingAddresses.find(addr => 
          addr.customerInfo.phone === customerInfo.phone && 
          addr.deliveryInfo.address === deliveryInfo.address
        );

        if (existingAddress) {
          // Update existing address
          set(state => ({
            addresses: state.addresses.map(addr => 
              addr.id === existingAddress.id 
                ? { ...addr, customerInfo, deliveryInfo, lastUsed: now }
                : addr
            )
          }));
        } else {
          // Create new address
          const newAddress: SavedAddress = {
            id: `addr_${now}_${Math.random().toString(36).substr(2, 9)}`,
            name: addressName,
            customerInfo,
            deliveryInfo,
            createdAt: now,
            lastUsed: now
          };

          set(state => ({
            addresses: [...state.addresses, newAddress]
          }));
        }

        // Clean up expired addresses
        get().clearExpiredAddresses();
      },

      getValidAddresses: () => {
        const now = Date.now();
        return get().addresses.filter(addr => 
          (now - addr.createdAt) < ONE_DAY_MS
        ).sort((a, b) => b.lastUsed - a.lastUsed); // Sort by most recently used
      },

      deleteAddress: (id) => {
        set(state => ({
          addresses: state.addresses.filter(addr => addr.id !== id)
        }));
      },

      updateLastUsed: (id) => {
        const now = Date.now();
        set(state => ({
          addresses: state.addresses.map(addr => 
            addr.id === id ? { ...addr, lastUsed: now } : addr
          )
        }));
      },

      clearExpiredAddresses: () => {
        const now = Date.now();
        set(state => ({
          addresses: state.addresses.filter(addr => 
            (now - addr.createdAt) < ONE_DAY_MS
          )
        }));
      }
    }),
    {
      name: 'soofi-mandi-saved-addresses',
      partialize: (state) => ({
        addresses: state.addresses
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Clean up expired addresses on load
          state.clearExpiredAddresses();
        }
      }
    }
  )
);