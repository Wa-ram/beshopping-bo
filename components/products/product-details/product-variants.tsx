"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/lib/types/product";
import { Plus } from "lucide-react";

interface ProductVariantsProps {
  product: Product;
  onChange: () => void;
}

export function ProductVariants({ product, onChange }: ProductVariantsProps) {
  const handleAddVariant = () => {
    // Implement variant addition logic
    onChange();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Variants</CardTitle>
        <Button size="sm" onClick={handleAddVariant}>
          <Plus className="h-4 w-4 mr-2" />
          Add Variant
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Variant</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {product?.variants?.map((variant) => (
              <TableRow key={variant.id}>
                <TableCell>{variant.title}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={variant.price}
                    onChange={() => {
                      // Implement price update logic
                      onChange();
                    }}
                    className="w-24"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={variant.sku || ""}
                    onChange={() => {
                      // Implement SKU update logic
                      onChange();
                    }}
                    className="w-32"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={variant.quantity || 0}
                    onChange={() => {
                      // Implement quantity update logic
                      onChange();
                    }}
                    className="w-24"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
