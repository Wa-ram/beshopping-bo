import { Suspense } from "react"
import { ProductList } from "@/components/products/product-list"
import { ProductHeader } from "@/components/products/product-header"
import { ProductTableSkeleton } from "@/components/products/product-table-skeleton"

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-6">
      <ProductHeader />
      <Suspense fallback={<ProductTableSkeleton />}>
        <ProductList />
      </Suspense>
    </div>
  )
}