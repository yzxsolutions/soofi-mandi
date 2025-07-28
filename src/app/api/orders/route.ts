import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { OrderRequestSchema, formatOrderNumber, calculateOrderTotals, handleApiError } from '@/lib/api';
import { getMenuItemById } from '@/lib/mock-data';
import { Order } from '@/types';

// Mock order storage - in real app, this would be a database
const mockOrders: Record<string, Order> = {};

// Enhanced coupon validation type
type CouponType = {
  code: string;
  discountRate: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  isActive: boolean;
  expiryDate?: Date;
};

// Available coupons with enhanced validation (Indian pricing)
const availableCoupons: Record<string, CouponType> = {
  'WELCOME10': {
    code: 'WELCOME10',
    discountRate: 0.1,
    minOrderAmount: 200, // ₹200 minimum
    maxDiscountAmount: 100, // Max ₹100 discount
    isActive: true,
  },
  'SAVE20': {
    code: 'SAVE20',
    discountRate: 0.2,
    minOrderAmount: 500, // ₹500 minimum
    maxDiscountAmount: 200, // Max ₹200 discount
    isActive: true,
  },
  'FIRST15': {
    code: 'FIRST15',
    discountRate: 0.15,
    minOrderAmount: 300, // ₹300 minimum
    maxDiscountAmount: 150, // Max ₹150 discount
    isActive: true,
  },
  'NEWUSER25': {
    code: 'NEWUSER25',
    discountRate: 0.25,
    minOrderAmount: 400, // ₹400 minimum
    maxDiscountAmount: 250, // Max ₹250 discount
    isActive: true,
  },
  'EXPIRED': {
    code: 'EXPIRED',
    discountRate: 0.25,
    minOrderAmount: 300,
    isActive: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    
    // Validate order data with Zod schema
    const validatedData = OrderRequestSchema.parse(orderData);
    
    // Validate menu items exist and are available
    const itemValidationErrors = await validateOrderItems(validatedData.items);
    if (itemValidationErrors.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid items in order',
          details: itemValidationErrors
        },
        { status: 400 }
      );
    }
    
    // Validate and apply coupon if provided
    let discountRate = 0;
    let couponError: string | null = null;
    
    if (validatedData.couponCode) {
      const couponValidation = validateCoupon(
        validatedData.couponCode, 
        calculateOrderSubtotal(validatedData.items)
      );
      
      if (couponValidation.isValid) {
        discountRate = couponValidation.discountRate;
      } else {
        couponError = couponValidation.error || null;
        // Don't fail the order, just ignore the invalid coupon
      }
    }
    
    // Generate order ID and number
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    const orderNumber = formatOrderNumber();
    
    // Calculate order totals
    const totals = calculateOrderTotals(validatedData.items, discountRate);
    
    // Validate minimum order amount
    if (totals.subtotal < 100) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Minimum order amount is ₹100',
          code: 'MIN_ORDER_NOT_MET'
        },
        { status: 400 }
      );
    }
    
    // Create order object
    const order: Order = {
      id: orderId,
      orderNumber,
      items: validatedData.items,
      customer: validatedData.customer,
      delivery: {
        ...validatedData.delivery,
        scheduledTime: validatedData.delivery.scheduledTime 
          ? new Date(validatedData.delivery.scheduledTime) 
          : undefined,
      },
      payment: {
        ...validatedData.payment,
        status: validatedData.payment.method === 'cash' ? 'pending' : 'completed',
        amount: totals.total,
      },
      status: 'confirmed',
      timestamps: {
        created: new Date(),
        confirmed: new Date(),
      },
      subtotal: totals.subtotal,
      tax: totals.tax,
      deliveryCharge: totals.deliveryCharge,
      discount: totals.discount,
      total: totals.total,
    };

    // Store order in mock storage
    mockOrders[orderId] = order;

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));

    // Simulate occasional processing failures for testing
    if (Math.random() < 0.05) { // 5% chance of failure
      throw new Error('Order processing temporarily unavailable');
    }

    const response: {
      success: boolean;
      data: Order;
      warnings?: Array<{ type: string; message: string }>;
    } = {
      success: true,
      data: order,
    };

    // Include coupon error in response if applicable
    if (couponError) {
      response.warnings = [{
        type: 'coupon_invalid',
        message: couponError
      }];
    }

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error processing order:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid order data',
          details: error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message,
          }))
        },
        { status: 400 }
      );
    }
    
    const errorMessage = handleApiError(error);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// Helper function to validate order items
async function validateOrderItems(items: Array<{
  id: string;
  quantity: number;
  customizations?: {
    size?: string;
    spiceLevel?: string;
    addOns?: string[];
  };
}>): Promise<string[]> {
  const errors: string[] = [];
  
  for (const item of items) {
    const menuItem = getMenuItemById(item.id);
    
    if (!menuItem) {
      errors.push(`Menu item with ID "${item.id}" not found`);
      continue;
    }
    
    if (!menuItem.isAvailable) {
      errors.push(`Menu item "${menuItem.name}" is currently unavailable`);
      continue;
    }
    
    // Validate customizations
    if (item.customizations?.size) {
      const validSizes = menuItem.customizations.sizes.map(s => s.name);
      if (!validSizes.includes(item.customizations.size)) {
        errors.push(`Invalid size "${item.customizations.size}" for item "${menuItem.name}"`);
      }
    }
    
    if (item.customizations?.spiceLevel) {
      const validSpiceLevels = ['mild', 'medium', 'hot'];
      if (!validSpiceLevels.includes(item.customizations.spiceLevel)) {
        errors.push(`Invalid spice level "${item.customizations.spiceLevel}" for item "${menuItem.name}"`);
      }
    }
    
    // Validate add-ons
    if (item.customizations?.addOns && item.customizations.addOns.length > 0) {
      const validAddOns = menuItem.customizations.addOns.map(a => a.name);
      for (const addOn of item.customizations.addOns) {
        if (!validAddOns.includes(addOn)) {
          errors.push(`Invalid add-on "${addOn}" for item "${menuItem.name}"`);
        }
      }
    }
    
    // Validate quantity
    if (item.quantity < 1 || item.quantity > 10) {
      errors.push(`Invalid quantity ${item.quantity} for item "${menuItem.name}". Must be between 1 and 10.`);
    }
  }
  
  return errors;
}

// Helper function to calculate order subtotal
function calculateOrderSubtotal(items: Array<{ price: number; quantity: number }>): number {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Enhanced coupon validation function
function validateCoupon(couponCode: string, orderSubtotal: number): {
  isValid: boolean;
  discountRate: number;
  error?: string;
} {
  const coupon = availableCoupons[couponCode.toUpperCase()];
  
  if (!coupon) {
    return {
      isValid: false,
      discountRate: 0,
      error: 'Invalid coupon code'
    };
  }
  
  if (!coupon.isActive) {
    return {
      isValid: false,
      discountRate: 0,
      error: 'This coupon has expired'
    };
  }
  
  if (coupon.expiryDate && coupon.expiryDate < new Date()) {
    return {
      isValid: false,
      discountRate: 0,
      error: 'This coupon has expired'
    };
  }
  
  if (orderSubtotal < coupon.minOrderAmount) {
    return {
      isValid: false,
      discountRate: 0,
      error: `Minimum order amount of ₹${coupon.minOrderAmount} required for this coupon`
    };
  }
  
  return {
    isValid: true,
    discountRate: coupon.discountRate
  };
}

// Export mock orders for use in other API routes
export { mockOrders };