"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useProductStore } from "@/lib/stores/product-store"
import { Product } from "@/lib/types/product"
import { formatCurrency } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface ProductTableProps {
  products: Product[]
}

export function ProductTable({ products }: ProductTableProps) {
  const router = useRouter()
  const { selectedProducts, toggleProductSelection } = useProductStore()

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Inventory</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              className="cursor-pointer"
              onClick={() => router.push(`/products/${product.id}`)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedProducts.includes(product.id)}
                  onCheckedChange={() => toggleProductSelection(product.id)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  {product.media[0] && (
                    <img
                      src={product.media[0]}
                      alt={product.title}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  )}
                  <div>
                    <div className="font-medium">{product.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {product.sku}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    product.status === "active"
                      ? "default"
                      : product.status === "draft"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {product.status}
                </Badge>
              </TableCell>
              <TableCell>
                {product.trackInventory
                  ? `${product.quantity} in stock`
                  : "Not tracked"}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(product.price)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}