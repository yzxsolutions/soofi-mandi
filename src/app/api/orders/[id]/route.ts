import { NextRequest, NextResponse } from 'next/server';
import { handleApiError } from '@/lib/api';
import { Order } from '@/types';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// Mock order storage - in real app, this would be a database
const mockOrders: Record<string, Order> = {};

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    
    // In a real app, this would query the database
    const order = mockOrders[id];
    
    if (!order) {
      // Create a mock order for demonstration
      const mockOrder: Order = {
        id,
        orderNumber: `SM${Date.now().toString().slice(-6)}`,
        items: [
          {
            id: 'chicken-mandi',
            name: 'Chicken Mandi',
            price: 7.80,
            quantity: 2,
            image: '/images/menu/chicken-mandi-1.jpg',
            customizations: {
              size: 'Full',
              spiceLevel: 'medium',
              addOns: ['Extra Rice'],
              specialInstructions: 'Please make it less spicy',
            },
          },
        ],
        customer: {
          name: 'John Doe',
          phone: '+1234567890',
          email: 'john@example.com',
        },
        delivery: {
          address: '123 Main St, City, State 12345',
          instructions: 'Ring the doorbell',
          scheduledTime: new Date(Date.now() + 45 * 60 * 1000),
          contactPerson: 'John Doe',
        },
        payment: {
          method: 'cash',
          status: 'pending',
          amount: 22.84,
        },
        status: 'confirmed',
        timestamps: {
          created: new Date(),
          confirmed: new Date(),
        },
        subtotal: 15.60,
        tax: 1.25,
        deliveryCharge: 5.99,
        discount: 0,
        total: 22.84,
      };
      
      return NextResponse.json({
        success: true,
        data: mockOrder,
      });
    }

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    const errorMessage = handleApiError(error);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}