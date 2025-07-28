import { NextRequest, NextResponse } from 'next/server';
import { mockMenuItems, getMenuItemsByCategory, searchMenuItems } from '@/lib/mock-data';
import { handleApiError } from '@/lib/api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    let filteredItems = mockMenuItems;
    
    // Apply category filter
    if (category && category !== 'all') {
      filteredItems = getMenuItemsByCategory(category);
    }
    
    // Apply search filter
    if (search) {
      filteredItems = searchMenuItems(search);
      
      // If both category and search are provided, apply both filters
      if (category && category !== 'all') {
        filteredItems = filteredItems.filter(item => item.category === category);
      }
    }

    return NextResponse.json({
      success: true,
      data: filteredItems,
      total: filteredItems.length,
    });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    const errorMessage = handleApiError(error);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}