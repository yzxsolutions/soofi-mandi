import { NextRequest, NextResponse } from 'next/server';
import { getMenuItemById } from '@/lib/mock-data';
import { handleApiError } from '@/lib/api';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    
    const menuItem = getMenuItemById(id);

    if (!menuItem) {
      return NextResponse.json(
        { success: false, error: 'Menu item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    console.error('Error fetching menu item:', error);
    const errorMessage = handleApiError(error);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}