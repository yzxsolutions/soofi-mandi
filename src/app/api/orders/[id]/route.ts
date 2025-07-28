import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { handleApiError, setCachedData, getCachedData } from '@/lib/api';
import { Order } from '@/types';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// Import mock orders from the main orders route
let mockOrders: Record<string, Order> = {};

// Validation schema for order ID
const OrderIdSchema = z.object({
  id: z.string().min(1, 'Order ID is required').max(100, 'Invalid order ID'),
});

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    
    // Validate the ID parameter
    const validatedParams = OrderIdSchema.parse({ id });
    
    // Check cache first
    const cacheKey = `order-${validatedParams.id}`;
    const cachedOrder = getCachedData<Order>(cacheKey);
    
    if (cachedOrder) {
      return NextResponse.json({
        success: true,
        data: cachedOrder,
        cached: true,
      });
    }
    
    // Try to import mock orders from the main route
    try {
      const ordersModule = await import('../route');
      mockOrders = ordersModule.mockOrders || {};
    } catch (error) {
      console.warn('Could not import mock orders:', error);
    }
    
    // In a real app, this would query the database
    const order = mockOrders[validatedParams.id];
    
    if (!order) {
      // Create a mock order for demonstration purposes
      const mockOrder: Order = {
        id: validatedParams.id,
        orderNumber: `SM${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        items: [
          {
            id: 'chicken-mandi',
            name: 'Chicken Mandi',
            price: 180,
            quantity: 2,
            image: '/images/placeholder-food.svg',
            customizations: {
              size: 'Full',
              spiceLevel: 'medium',
              addOns: ['Extra Rice'],
              specialInstructions: 'Please make it less spicy',
            },
          },
          {
            id: 'arabic-coffee',
            name: 'Arabic Coffee',
            price: 50,
            quantity: 1,
            image: '/images/placeholder-food.svg',
            customizations: {
              size: 'Full',
              spiceLevel: 'mild',
              addOns: ['Extra Cardamom'],
            },
          },
        ],
        customer: {
          name: 'Rajesh Kumar',
          phone: '+91 98765 43210',
          email: 'rajesh.kumar@example.com',
        },
        delivery: {
          address: 'Flat 4B, Prestige Apartments, Koramangala 5th Block, Bangalore - 560095',
          instructions: 'Ring the doorbell twice. Security gate code: 1234',
          scheduledTime: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes from now
          contactPerson: 'Rajesh Kumar',
        },
        payment: {
          method: 'cash',
          status: 'pending',
          amount: 533,
        },
        status: 'confirmed',
        timestamps: {
          created: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
          confirmed: new Date(Date.now() - 4 * 60 * 1000), // 4 minutes ago
        },
        subtotal: 410,
        tax: 74, // 18% GST
        deliveryCharge: 50,
        discount: 41, // 10% discount applied
        total: 533,
      };
      
      // Cache the mock order
      setCachedData(cacheKey, mockOrder);
      
      return NextResponse.json({
        success: true,
        data: mockOrder,
        note: 'This is a demo order for testing purposes'
      });
    }

    // Cache the real order
    setCachedData(cacheKey, order);

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid order ID',
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

// PATCH endpoint for updating order status (bonus functionality)
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const updateData = await request.json();
    
    // Validate the ID parameter
    const validatedParams = OrderIdSchema.parse({ id });
    
    // Validation schema for order updates
    const OrderUpdateSchema = z.object({
      status: z.enum(['confirmed', 'preparing', 'ready', 'delivered']).optional(),
      payment: z.object({
        status: z.enum(['pending', 'completed', 'failed']).optional(),
      }).optional(),
    });
    
    const validatedUpdate = OrderUpdateSchema.parse(updateData);
    
    // Try to import mock orders
    try {
      const ordersModule = await import('../route');
      mockOrders = ordersModule.mockOrders || {};
    } catch (error) {
      console.warn('Could not import mock orders:', error);
    }
    
    const order = mockOrders[validatedParams.id];
    
    if (!order) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Order not found',
          code: 'ORDER_NOT_FOUND'
        },
        { status: 404 }
      );
    }
    
    // Update order fields
    if (validatedUpdate.status) {
      order.status = validatedUpdate.status;
      
      // Update timestamps based on status
      switch (validatedUpdate.status) {
        case 'preparing':
          order.timestamps.prepared = new Date();
          break;
        case 'delivered':
          order.timestamps.delivered = new Date();
          break;
      }
    }
    
    if (validatedUpdate.payment?.status) {
      order.payment.status = validatedUpdate.payment.status;
    }
    
    // Update the order in storage
    mockOrders[validatedParams.id] = order;
    
    // Clear cache
    const cacheKey = `order-${validatedParams.id}`;
    setCachedData(cacheKey, order);
    
    return NextResponse.json({
      success: true,
      data: order,
      message: 'Order updated successfully'
    });
  } catch (error) {
    console.error('Error updating order:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid update data',
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