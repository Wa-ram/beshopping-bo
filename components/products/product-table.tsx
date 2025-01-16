"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useProductStore } from "@/lib/stores/product-store";
import { Product } from "@/lib/types/product";
// import { formatCurrency } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProductTableProps {
  products: Product[];
}

export function ProductTable({ products }: ProductTableProps) {
  const router = useRouter();
  const { selectedProducts, toggleProductSelection } = useProductStore();

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead className="w-20"></TableHead>
            <TableHead>Nom du produit</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Inventaire</TableHead>
            <TableHead>Catégorie</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              className="cursor-pointer"
              onClick={() => router.push(`/dashboard/products/${product.id}`)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedProducts.includes(product.id)}
                  onCheckedChange={() => toggleProductSelection(product.id)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  {product.main_image_url && (
                    <Image
                      src={product.main_image_url}
                      alt={product.title}
                      className="h-10 w-10 rounded-md object-cover"
                      width={40}
                      height={40}
                    />
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-3">
                  <div className="font-medium">{product.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {product.sku}
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
                  ? `${product.quantity} en stock`
                  : "Pas répertorié"}
              </TableCell>
              <TableCell>{product.category.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
