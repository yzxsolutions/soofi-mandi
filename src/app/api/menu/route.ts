import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { mockMenuItems, getMenuItemsByCategory, searchMenuItems } from '@/lib/mock-data';
import { handleApiError, setCachedData, getCachedData } from '@/lib/api';
import { MenuItem } from '@/types';

// Helper function to validate and parse query parameters
function validateQueryParams(searchParams: URLSearchParams) {
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const priceMin = searchParams.get('priceMin');
  const priceMax = searchParams.get('priceMax');
  const dietary = searchParams.get('dietary');
  const spiceLevel = searchParams.get('spiceLevel');
  const sortBy = searchParams.get('sortBy');
  const limit = searchParams.get('limit');
  const offset = searchParams.get('offset');

  // Validate category
  if (category && !['all', 'mandi', 'rice', 'appetizers', 'beverages', 'desserts'].includes(category)) {
    throw new Error('Invalid category parameter');
  }

  // Validate search
  if (search && (search.length < 1 || search.length > 100)) {
    throw new Error('Search query must be between 1 and 100 characters');
  }

  // Validate price range
  const parsedPriceMin = priceMin ? parseFloat(priceMin) : undefined;
  const parsedPriceMax = priceMax ? parseFloat(priceMax) : undefined;
  
  if (parsedPriceMin !== undefined && (isNaN(parsedPriceMin) || parsedPriceMin < 0)) {
    throw new Error('Invalid priceMin parameter');
  }
  
  if (parsedPriceMax !== undefined && (isNaN(parsedPriceMax) || parsedPriceMax < 0)) {
    throw new Error('Invalid priceMax parameter');
  }

  // Validate dietary
  if (dietary && !['all', 'vegetarian', 'non-vegetarian'].includes(dietary)) {
    throw new Error('Invalid dietary parameter');
  }

  // Validate spice level
  if (spiceLevel && !['all', 'mild', 'medium', 'hot'].includes(spiceLevel)) {
    throw new Error('Invalid spiceLevel parameter');
  }

  // Validate sort by
  if (sortBy && !['name', 'price-low', 'price-high', 'popularity', 'rating'].includes(sortBy)) {
    throw new Error('Invalid sortBy parameter');
  }

  // Validate pagination
  const parsedLimit = limit ? parseInt(limit) : undefined;
  const parsedOffset = offset ? parseInt(offset) : undefined;
  
  if (parsedLimit !== undefined && (isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 100)) {
    throw new Error('Limit must be between 1 and 100');
  }
  
  if (parsedOffset !== undefined && (isNaN(parsedOffset) || parsedOffset < 0)) {
    throw new Error('Offset must be 0 or greater');
  }

  return {
    category: category as 'all' | 'mandi' | 'rice' | 'appetizers' | 'beverages' | 'desserts' | null,
    search,
    priceMin: parsedPriceMin,
    priceMax: parsedPriceMax,
    dietary: dietary as 'all' | 'vegetarian' | 'non-vegetarian' | null,
    spiceLevel: spiceLevel as 'all' | 'mild' | 'medium' | 'hot' | null,
    sortBy: sortBy as 'name' | 'price-low' | 'price-high' | 'popularity' | 'rating' | null,
    limit: parsedLimit,
    offset: parsedOffset,
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Create cache key from search params
    const cacheKey = `menu-${searchParams.toString()}`;
    const cachedData = getCachedData<{ data: MenuItem[]; total: number }>(cacheKey);
    
    if (cachedData) {
      return NextResponse.json({
        success: true,
        data: cachedData.data,
        total: cachedData.total,
        cached: true,
      });
    }

    // Validate query parameters
    const validatedParams = validateQueryParams(searchParams);
    
    let filteredItems = [...mockMenuItems];
    
    // Apply category filter
    if (validatedParams.category && validatedParams.category !== 'all') {
      filteredItems = getMenuItemsByCategory(validatedParams.category);
    }
    
    // Apply search filter
    if (validatedParams.search) {
      const searchResults = searchMenuItems(validatedParams.search);
      
      // If both category and search are provided, apply both filters
      if (validatedParams.category && validatedParams.category !== 'all') {
        filteredItems = searchResults.filter(item => item.category === validatedParams.category);
      } else {
        filteredItems = searchResults;
      }
    }

    // Apply price range filter
    if (validatedParams.priceMin !== undefined) {
      filteredItems = filteredItems.filter(item => item.price >= validatedParams.priceMin!);
    }
    if (validatedParams.priceMax !== undefined) {
      filteredItems = filteredItems.filter(item => item.price <= validatedParams.priceMax!);
    }

    // Apply dietary filter
    if (validatedParams.dietary && validatedParams.dietary !== 'all') {
      const isVegetarian = validatedParams.dietary === 'vegetarian';
      filteredItems = filteredItems.filter(item => item.isVegetarian === isVegetarian);
    }

    // Apply spice level filter
    if (validatedParams.spiceLevel && validatedParams.spiceLevel !== 'all') {
      filteredItems = filteredItems.filter(item => item.spiceLevel === validatedParams.spiceLevel);
    }

    // Apply sorting
    if (validatedParams.sortBy) {
      switch (validatedParams.sortBy) {
        case 'name':
          filteredItems.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'price-low':
          filteredItems.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filteredItems.sort((a, b) => b.price - a.price);
          break;
        case 'popularity':
          filteredItems.sort((a, b) => b.reviews.length - a.reviews.length);
          break;
        case 'rating':
          filteredItems.sort((a, b) => b.averageRating - a.averageRating);
          break;
      }
    }

    const totalItems = filteredItems.length;

    // Apply pagination
    if (validatedParams.offset !== undefined || validatedParams.limit !== undefined) {
      const offset = validatedParams.offset || 0;
      const limit = validatedParams.limit || 20;
      filteredItems = filteredItems.slice(offset, offset + limit);
    }

    // Cache the results
    const result = { data: filteredItems, total: totalItems };
    setCachedData(cacheKey, result);

    return NextResponse.json({
      success: true,
      data: filteredItems,
      total: totalItems,
      pagination: validatedParams.limit ? {
        offset: validatedParams.offset || 0,
        limit: validatedParams.limit,
        hasMore: (validatedParams.offset || 0) + validatedParams.limit < totalItems,
      } : undefined,
    });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    
    if (error instanceof Error && error.message.includes('Invalid')) {
      return NextResponse.json(
        { 
          success: false, 
          error: error.message
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