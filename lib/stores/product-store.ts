"use client"

import { create } from 'zustand'
import { Product } from '@/lib/types/product'

interface ProductStore {
  products: Product[]
  selectedProducts: string[]
  setProducts: (products: Product[]) => void
  addProduct: (product: Product) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProducts: (ids: string[]) => void
  toggleProductSelection: (id: string) => void
  clearSelection: () => void
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  selectedProducts: [],
  setProducts: (products) => set({ products }),
  addProduct: (product) => 
    set((state) => ({ products: [...state.products, product] })),
  updateProduct: (id, updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      ),
    })),
  deleteProducts: (ids) =>
    set((state) => ({
      products: state.products.filter((product) => !ids.includes(product.id)),
      selectedProducts: state.selectedProducts.filter((id) => !ids.includes(id)),
    })),
  toggleProductSelection: (id) =>
    set((state) => ({
      selectedProducts: state.selectedProducts.includes(id)
        ? state.selectedProducts.filter((productId) => productId !== id)
        : [...state.selectedProducts, id],
    })),
  clearSelection: () => set({ selectedProducts: [] }),
}))