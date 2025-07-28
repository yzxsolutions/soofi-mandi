// Menu Item Types
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'mandi' | 'rice' | 'appetizers' | 'beverages' | 'desserts';
  images: string[];
  ingredients: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  spiceLevel: 'mild' | 'medium' | 'hot';
  preparationTime: number;
  isVegetarian: boolean;
  isAvailable: boolean;
  customizations: {
    sizes: Array<{
      name: string;
      price: number;
      description: string;
    }>;
    addOns: Array<{
      name: string;
      price: number;
    }>;
  };
  reviews: Review[];
  averageRating: number;
}

// Cart Item Types (from store)
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customizations: {
    size: 'Quarter' | 'Half' | 'Full';
    spiceLevel: 'mild' | 'medium' | 'hot';
    addOns: string[];
    specialInstructions?: string;
  };
}

// Order Types
export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  delivery: {
    address: string;
    instructions?: string;
    scheduledTime?: Date;
    contactPerson: string;
  };
  payment: {
    method: 'cash' | 'online';
    status: 'pending' | 'completed' | 'failed';
    amount: number;
  };
  status: 'confirmed' | 'preparing' | 'ready' | 'delivered';
  timestamps: {
    created: Date;
    confirmed?: Date;
    prepared?: Date;
    delivered?: Date;
  };
  subtotal: number;
  tax: number;
  deliveryCharge: number;
  discount: number;
  total: number;
}

// Review Types
export interface Review {
  id: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date;
  isVerified: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  total?: number;
}

// Form Types
export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
}

export interface DeliveryInfo {
  address: string;
  instructions?: string;
  scheduledTime?: string;
  contactPerson: string;
}

export interface PaymentInfo {
  method: 'cash' | 'online';
}

// Filter Types (from UI store)
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