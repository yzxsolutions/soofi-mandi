import { z } from 'zod';
import { MenuItem, Order, ApiResponse, CustomerInfo, DeliveryInfo, PaymentInfo } from '@/types';

// Zod schemas for validation
export const CustomerInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]{10,}$/, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
});

export const DeliveryInfoSchema = z.object({
  address: z.string().min(10, 'Address must be at least 10 characters').max(200, 'Address must be less than 200 characters'),
  instructions: z.string().max(500, 'Instructions must be less than 500 characters').optional(),
  scheduledTime: z.string().optional(),
  contactPerson: z.string().min(2, 'Contact person name must be at least 2 characters').max(50, 'Contact person name must be less than 50 characters'),
});

export const PaymentInfoSchema = z.object({
  method: z.enum(['cash', 'online'], {
    message: 'Please select a payment method',
  }),
});

export const OrderRequestSchema = z.object({
  items: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    quantity: z.number().min(1),
    image: z.string(),
    customizations: z.object({
      size: z.enum(['Quarter', 'Half', 'Full']),
      spiceLevel: z.enum(['mild', 'medium', 'hot']),
      addOns: z.array(z.string()),
      specialInstructions: z.string().optional(),
    }),
  })).min(1, 'Order must contain at least one item'),
  customer: CustomerInfoSchema,
  delivery: DeliveryInfoSchema,
  payment: PaymentInfoSchema,
  couponCode: z.string().optional(),
});

// API utility functions
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      error instanceof Error ? error.message : 'An unknown error occurred',
      500
    );
  }
}

// Menu API functions
export async function fetchMenuItems(
  category?: string,
  search?: string
): Promise<ApiResponse<MenuItem[]>> {
  const params = new URLSearchParams();
  if (category && category !== 'all') params.append('category', category);
  if (search) params.append('search', search);
  
  const queryString = params.toString();
  const url = `/api/menu${queryString ? `?${queryString}` : ''}`;
  
  return apiRequest<MenuItem[]>(url);
}

export async function fetchMenuItem(id: string): Promise<ApiResponse<MenuItem>> {
  return apiRequest<MenuItem>(`/api/menu/${id}`);
}

// Order API functions
export async function createOrder(orderData: z.infer<typeof OrderRequestSchema>): Promise<ApiResponse<Order>> {
  // Validate the order data
  const validatedData = OrderRequestSchema.parse(orderData);
  
  return apiRequest<Order>('/api/orders', {
    method: 'POST',
    body: JSON.stringify(validatedData),
  });
}

export async function fetchOrder(id: string): Promise<ApiResponse<Order>> {
  return apiRequest<Order>(`/api/orders/${id}`);
}

// Utility functions for error handling
export function handleApiError(error: unknown): string {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 400:
        return 'Invalid request. Please check your information and try again.';
      case 404:
        return 'The requested item was not found.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return error.message || 'An unexpected error occurred.';
    }
  }
  
  if (error instanceof z.ZodError) {
    return error.issues[0]?.message || 'Validation error occurred.';
  }
  
  return 'An unexpected error occurred. Please try again.';
}

// Form validation helpers
export function validateCustomerInfo(data: unknown): CustomerInfo {
  return CustomerInfoSchema.parse(data);
}

export function validateDeliveryInfo(data: unknown): DeliveryInfo {
  return DeliveryInfoSchema.parse(data);
}

export function validatePaymentInfo(data: unknown): PaymentInfo {
  return PaymentInfoSchema.parse(data);
}

// Utility functions for data formatting
export function formatOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `SM${timestamp}${random}`;
}

export function calculateOrderTotals(
  items: Array<{ price: number; quantity: number }>,
  discountRate: number = 0
) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18; // 18% GST rate in India
  const deliveryCharge = subtotal >= 500 ? 0 : 50; // Free delivery over ₹500
  const discountAmount = subtotal * discountRate;
  const total = Math.max(0, subtotal + tax + deliveryCharge - discountAmount);
  
  return {
    subtotal: Number(subtotal.toFixed(0)), // No decimals for INR
    tax: Number(tax.toFixed(0)),
    deliveryCharge: Number(deliveryCharge.toFixed(0)),
    discount: Number(discountAmount.toFixed(0)),
    total: Number(total.toFixed(0)),
  };
}

// Cache utility for API responses
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function getCachedData<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as T;
  }
  return null;
}

export function setCachedData<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

export function clearCache(): void {
  cache.clear();
}