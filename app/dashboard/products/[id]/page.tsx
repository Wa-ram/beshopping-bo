"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useProductStore } from "@/lib/stores/product-store"
import { ProductForm } from "@/components/products/product-details/product-form"
import { ProductMedia } from "@/components/products/product-details/product-media"
import { ProductVariants } from "@/components/products/product-details/product-variants"
import { Product } from "@/lib/types/product"

export default function ProductDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [isModified, setIsModified] = useState(false)
  const { products, updateProduct } = useProductStore()

  useEffect(() => {
    const found = products.find(p => p.id === params.id)
    setProduct(found || null)
  }, [products, params.id])

  const handleSave = async (updatedData: Partial<Product>) => {
    if (!product) return
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      updateProduct(product.id, updatedData)
      setIsModified(false)
    } catch (error) {
      console.error("Failed to update product:", error)
    }
  }

  if (!product) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Edit Product</h1>
        </div>
        <Button
          onClick={() => handleSave(product)}
          disabled={!isModified}
        >
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ProductMedia product={product} onChange={() => setIsModified(true)} />
        <ProductForm 
          product={product} 
          onChange={(data) => {
            setProduct({ ...product, ...data })
            setIsModified(true)
          }} 
        />
      </div>

      <ProductVariants 
        product={product}
        onChange={() => setIsModified(true)}
      />
    </div>
  )
}