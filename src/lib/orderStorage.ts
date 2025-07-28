import { Order } from '@/types';

// Simple in-memory storage for demo purposes
// In a real app, this would be a database
const orders: Map<string, Order> = new Map();

export function saveOrder(order: Order): void {
  orders.set(order.id, order);
}

// Alias for backward compatibility
export const saveOrderToStorage = saveOrder;

export function getOrder(orderId: string): Order | null {
  return orders.get(orderId) || null;
}

export function getAllOrders(): Order[] {
  return Array.from(orders.values());
}

export function deleteOrder(orderId: string): boolean {
  return orders.delete(orderId);
}

export function updateOrderStatus(orderId: string, status: Order['status']): boolean {
  const order = orders.get(orderId);
  if (order) {
    order.status = status;
    orders.set(orderId, order);
    return true;
  }
  return false;
}