import { Order } from '@/types';

// Constants
const STORAGE_KEY = 'soofi_mandi_orders';
const ORDER_EXPIRY_TIME = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

// Types for storage
interface StoredOrder extends Order {
  expiresAt: number; // Timestamp when the order expires
}

// Helper functions
const getStoredOrders = (): Record<string, StoredOrder> => {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error retrieving orders from localStorage:', error);
    return {};
  }
};

const saveStoredOrders = (orders: Record<string, StoredOrder>): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error('Error saving orders to localStorage:', error);
  }
};

const cleanExpiredOrders = (): void => {
  const orders = getStoredOrders();
  const now = Date.now();
  let hasChanges = false;
  
  Object.keys(orders).forEach(id => {
    if (orders[id].expiresAt < now) {
      delete orders[id];
      hasChanges = true;
    }
  });
  
  if (hasChanges) {
    saveStoredOrders(orders);
  }
};

// Public API
export function saveOrder(order: Order): void {
  const orders = getStoredOrders();
  const expiresAt = Date.now() + ORDER_EXPIRY_TIME;
  
  orders[order.id] = {
    ...order,
    expiresAt
  };
  
  saveStoredOrders(orders);
}

// Alias for backward compatibility
export const saveOrderToStorage = saveOrder;

export function getOrder(orderId: string): Order | null {
  cleanExpiredOrders();
  const orders = getStoredOrders();
  const order = orders[orderId];
  
  if (!order) return null;
  
  // Don't expose the expiresAt field to consumers
  const { expiresAt, ...cleanOrder } = order;
  return cleanOrder;
}

export function getAllOrders(): Order[] {
  cleanExpiredOrders();
  const orders = getStoredOrders();
  
  return Object.values(orders).map(({ expiresAt, ...order }) => order);
}

export function getRecentOrders(): Order[] {
  cleanExpiredOrders();
  return getAllOrders();
}

export function hasRecentOrders(): boolean {
  cleanExpiredOrders();
  return Object.keys(getStoredOrders()).length > 0;
}

export function deleteOrder(orderId: string): boolean {
  const orders = getStoredOrders();
  
  if (orders[orderId]) {
    delete orders[orderId];
    saveStoredOrders(orders);
    return true;
  }
  
  return false;
}

export function updateOrderStatus(orderId: string, status: Order['status']): boolean {
  const orders = getStoredOrders();
  
  if (orders[orderId]) {
    orders[orderId] = {
      ...orders[orderId],
      status
    };
    saveStoredOrders(orders);
    return true;
  }
  
  return false;
}