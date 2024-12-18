"use client"

import { create } from 'zustand'
import { Order } from '@/lib/types/order'

interface OrderStore {
  orders: Order[];
  selectedOrders: string[];
  setOrders: (orders: Order[]) => void;
  updateOrder: (id: string, order: Partial<Order>) => void;
  updateOrderNote: (id: string, note: string) => void;
  updateOrderTags: (id: string, tags: string[]) => void;
  updateShippingDetails: (id: string, shippingDetails: Order['shippingDetails']) => void;
  toggleOrderSelection: (id: string) => void;
  clearSelection: () => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  selectedOrders: [],
  setOrders: (orders) => set({ orders }),
  updateOrder: (id, updatedOrder) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, ...updatedOrder } : order
      ),
    })),
  updateOrderNote: (id, note) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, notes: note } : order
      ),
    })),
  updateOrderTags: (id, tags) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, tags } : order
      ),
    })),
  updateShippingDetails: (id, shippingDetails) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, shippingDetails } : order
      ),
    })),
  toggleOrderSelection: (id) =>
    set((state) => ({
      selectedOrders: state.selectedOrders.includes(id)
        ? state.selectedOrders.filter((orderId) => orderId !== id)
        : [...state.selectedOrders, id],
    })),
  clearSelection: () => set({ selectedOrders: [] }),
}))