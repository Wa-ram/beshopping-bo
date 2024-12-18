"use client"

import { create } from 'zustand'
import { Customer } from '@/lib/types/customer'

interface CustomerStore {
  customers: Customer[];
  selectedCustomers: string[];
  setCustomers: (customers: Customer[]) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  updateCustomerNote: (id: string, note: string) => void;
  toggleCustomerSelection: (id: string) => void;
  clearSelection: () => void;
}

export const useCustomerStore = create<CustomerStore>((set) => ({
  customers: [],
  selectedCustomers: [],
  setCustomers: (customers) => set({ customers }),
  updateCustomer: (id, updatedCustomer) =>
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === id ? { ...customer, ...updatedCustomer } : customer
      ),
    })),
  updateCustomerNote: (id, note) =>
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === id ? { ...customer, notes: note } : customer
      ),
    })),
  toggleCustomerSelection: (id) =>
    set((state) => ({
      selectedCustomers: state.selectedCustomers.includes(id)
        ? state.selectedCustomers.filter((customerId) => customerId !== id)
        : [...state.selectedCustomers, id],
    })),
  clearSelection: () => set({ selectedCustomers: [] }),
}))