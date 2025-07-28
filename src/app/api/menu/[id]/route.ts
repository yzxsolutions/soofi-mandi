import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getMenuItemById } from '@/lib/mock-data';
import { handleApiError, setCachedData, getCachedData } from '@/lib/api';
import { MenuItem } from '@/types';

// Validation schema for route parameters
const MenuItemParamsSchema = z.object({
  id: z.string().min(1, 'Menu item ID is required').max(100, 'Invalid menu item ID'),
});

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    
    // Validate the ID parameter
    const validatedParams = MenuItemParamsSchema.parse({ id });
    
    // Check cache first
    const cacheKey = `menu-item-${validatedParams.id}`;
    const cachedItem = getCachedData<MenuItem>(cacheKey);
    
    if (cachedItem) {
      return NextResponse.json({
        success: true,
        data: cachedItem,
        cached: true,
      });
    }
    
    const menuItem = getMenuItemById(validatedParams.id);

    if (!menuItem) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Menu item not found',
          code: 'ITEM_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // Check if item is available
    if (!menuItem.isAvailable) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Menu item is currently unavailable',
          code: 'ITEM_UNAVAILABLE',
          data: menuItem // Still return item data for display purposes
        },
        { status: 200 } // 200 because we want to show the item but indicate unavailability
      );
    }

    // Cache the result
    setCachedData(cacheKey, menuItem);

    return NextResponse.json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    console.error('Error fetching menu item:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid menu item ID',
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