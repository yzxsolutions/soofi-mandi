import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customizations: {
    size: "Quarter" | "Half" | "Full";
    spiceLevel: "mild" | "medium" | "hot";
    addOns: string[];
    specialInstructions?: string;
  };
}

interface CartStore {
  items: CartItem[];
  total: number;
  itemCount: number;
  couponCode?: string;
  discount: number;

  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateCustomizations: (
    id: string,
    customizations: CartItem["customizations"]
  ) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;

  // Computed values
  getSubtotal: () => number;
  getTax: () => number;
  getDeliveryCharge: () => number;
  getTotal: () => number;
}

const TAX_RATE = 0.18; // 18% GST in India
const DELIVERY_CHARGE = 50;
const FREE_DELIVERY_THRESHOLD = 500;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,
      discount: 0,

      addItem: (newItem) => {
        set((state) => {
          // The newItem.id is the unique variant ID from the modal (e.g., "mandi-1-Full")
          const existingItem = state.items.find(
            (item) => item.id === newItem.id
          );

          let updatedItems;
          if (existingItem) {
            // Update quantity if item with same ID exists
            updatedItems = state.items.map((item, index) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            );
          } else {
            // Add new item
            updatedItems = [...state.items, newItem];
          }

          const itemCount = updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          return {
            items: updatedItems,
            itemCount,
            total: get().getTotal(),
          };
        });
      },

      removeItem: (id) => {
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== id);
          const itemCount = updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          return {
            items: updatedItems,
            itemCount,
            total: get().getTotal(),
          };
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          );

          const itemCount = updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          return {
            items: updatedItems,
            itemCount,
            total: get().getTotal(),
          };
        });
      },

      updateCustomizations: (id, customizations) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, customizations } : item
          ),
        }));
      },

      clearCart: () => {
        set(() => ({
          items: [],
          itemCount: 0,
          total: 0,
          couponCode: undefined,
          discount: 0,
        }));
      },

      applyCoupon: (code) => {
        // Simple coupon logic - in real app, this would call an API
        const discountMap: Record<string, number> = {
          WELCOME10: 0.1,
          SAVE20: 0.2,
          FIRST15: 0.15,
        };

        const discountRate = discountMap[code.toUpperCase()] || 0;

        set(() => ({
          couponCode: discountRate > 0 ? code : undefined,
          discount: discountRate,
          total: get().getTotal(),
        }));
      },

      removeCoupon: () => {
        set(() => ({
          couponCode: undefined,
          discount: 0,
          total: get().getTotal(),
        }));
      },

      getSubtotal: () => {
        const state = get();
        return state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },

      getTax: () => {
        return get().getSubtotal() * TAX_RATE;
      },

      getDeliveryCharge: () => {
        const subtotal = get().getSubtotal();
        return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
      },

      getTotal: () => {
        const state = get();
        const subtotal = state.getSubtotal();
        const tax = state.getTax();
        const delivery = state.getDeliveryCharge();
        const discountAmount = subtotal * state.discount;

        return Math.max(0, subtotal + tax + delivery - discountAmount);
      },
    }),
    {
      name: "soofi-mandi-cart",
      partialize: (state) => ({
        items: state.items,
        couponCode: state.couponCode,
        discount: state.discount,
      }),
    }
  )
);
