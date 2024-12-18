"use client"

import { useEffect } from "react"
import { useProductStore } from "@/lib/stores/product-store"
import { ProductTable } from "./product-table"
import { EmptyState } from "./empty-state"
import { mockProducts } from "@/lib/mock/products"

export function ProductList() {
  const { products, setProducts } = useProductStore()

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setProducts(mockProducts)
    }
    fetchProducts()
  }, [setProducts])

  if (products.length === 0) {
    return <EmptyState />
  }

  return <ProductTable products={products} />
}