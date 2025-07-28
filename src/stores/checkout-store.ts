import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CustomerInfo, DeliveryInfo, PaymentInfo } from '@/types';

interface CheckoutStore {
  // Customer information
  customerInfo: CustomerInfo;
  setCustomerInfo: (info: CustomerInfo) => void;
  
  // Delivery information
  deliveryInfo: DeliveryInfo;
  setDeliveryInfo: (info: DeliveryInfo) => void;
  
  // Payment information
  paymentInfo: PaymentInfo;
  setPaymentInfo: (info: PaymentInfo) => void;
  
  // Reset all checkout data
  resetCheckout: () => void;
}

// Initial state
const initialState = {
  customerInfo: {
    name: '',
    phone: '',
    email: ''
  },
  deliveryInfo: {
    address: '',
    instructions: '',
    scheduledTime: undefined,
    contactPerson: ''
  },
  paymentInfo: {
    method: 'cash' as const
  }
};

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      ...initialState,
      
      setCustomerInfo: (info: CustomerInfo) => {
        set({ customerInfo: info });
      },
      
      setDeliveryInfo: (info: DeliveryInfo) => {
        set({ deliveryInfo: info });
      },
      
      setPaymentInfo: (info: PaymentInfo) => {
        set({ paymentInfo: info });
      },
      
      resetCheckout: () => {
        set(initialState);
      }
    }),
    {
      name: 'soofi-mandi-checkout',
      partialize: (state) => ({
        customerInfo: state.customerInfo,
        deliveryInfo: state.deliveryInfo,
        paymentInfo: state.paymentInfo
      })
    }
  )
);