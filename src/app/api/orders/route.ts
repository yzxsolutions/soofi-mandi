import { NextRequest, NextResponse } from 'next/server';
import { OrderRequestSchema, formatOrderNumber, calculateOrderTotals, handleApiError } from '@/lib/api';
import { Order } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    
    // Validate order data with Zod schema
    const validatedData = OrderRequestSchema.parse(orderData);
    
    // Generate order ID and number
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    const orderNumber = formatOrderNumber();
    
    // Calculate order totals
    const discountRate = validatedData.couponCode ? getCouponDiscount(validatedData.couponCode) : 0;
    const totals = calculateOrderTotals(validatedData.items, discountRate);
    
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
        status: 'pending',
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

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error('Error processing order:', error);
    const errorMessage = handleApiError(error);
    const statusCode = error instanceof Error && error.name === 'ZodError' ? 400 : 500;
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: statusCode }
    );
  }
}

// Helper function to get coupon discount rate
function getCouponDiscount(couponCode: string): number {
  const discountMap: Record<string, number> = {
    'WELCOME10': 0.1,
    'SAVE20': 0.2,
    'FIRST15': 0.15,
  };
  
  return discountMap[couponCode.toUpperCase()] || 0;
}