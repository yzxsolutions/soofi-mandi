import { create } from 'zustand';

export interface MenuFilter {
  category: 'all' | 'mandi' | 'rice' | 'appetizers' | 'beverages' | 'desserts';
  priceRange: {
    min: number;
    max: number;
  };
  dietary: 'all' | 'vegetarian' | 'non-vegetarian';
  spiceLevel: 'all' | 'mild' | 'medium' | 'hot';
  sortBy: 'name' | 'price-low' | 'price-high' | 'popularity';
}

interface UIStore {
  // Navigation state
  isMenuOpen: boolean;
  isCartOpen: boolean;
  
  // Menu and search state
  currentFilter: MenuFilter;
  searchQuery: string;
  
  // Loading states
  isLoading: boolean;
  isSubmittingOrder: boolean;
  
  // Modal states
  isQuickViewOpen: boolean;
  quickViewItemId?: string;
  
  // Actions
  setMenuOpen: (open: boolean) => void;
  setCartOpen: (open: boolean) => void;
  setFilter: (filter: Partial<MenuFilter>) => void;
  resetFilters: () => void;
  setSearchQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
  setSubmittingOrder: (submitting: boolean) => void;
  setQuickView: (open: boolean, itemId?: string) => void;
}

const defaultFilter: MenuFilter = {
  category: 'all',
  priceRange: {
    min: 0,
    max: 100,
  },
  dietary: 'all',
  spiceLevel: 'all',
  sortBy: 'popularity',
};

export const useUIStore = create<UIStore>((set) => ({
  // Initial state
  isMenuOpen: false,
  isCartOpen: false,
  currentFilter: defaultFilter,
  searchQuery: '',
  isLoading: false,
  isSubmittingOrder: false,
  isQuickViewOpen: false,
  quickViewItemId: undefined,

  // Actions
  setMenuOpen: (open) => {
    set({ isMenuOpen: open });
  },

  setCartOpen: (open) => {
    set({ isCartOpen: open });
  },

  setFilter: (filterUpdate) => {
    set((state) => ({
      currentFilter: {
        ...state.currentFilter,
        ...filterUpdate,
      },
    }));
  },

  resetFilters: () => {
    set({
      currentFilter: defaultFilter,
      searchQuery: '',
    });
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  setSubmittingOrder: (submitting) => {
    set({ isSubmittingOrder: submitting });
  },

  setQuickView: (open, itemId) => {
    set({
      isQuickViewOpen: open,
      quickViewItemId: itemId,
    });
  },
}));