"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { VariantCombination } from "@/lib/types/product";

interface VariantTableProps {
  variants: VariantCombination[];
  onVariantUpdate: (
    id: string,
    field: "price" | "stock_quantity" | "sku",
    value: string
  ) => void;
}

export function VariantTable({ variants, onVariantUpdate }: VariantTableProps) {
  if (variants.length === 0) {
    return null;
  }
  return (
    <div className="relative w-full overflow-hidden rounded-md border">
      <ScrollArea className="w-full" aria-orientation="horizontal">
        <div className="w-full min-w-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>SKU</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {variants.map((variant) => (
                <TableRow key={variant.id}>
                  <TableCell className="min-w-[200px]">
                    {variant.combination
                      .map((item) => `${item.value}`)
                      .join(" / ")}
                  </TableCell>
                  <TableCell>
                    <Input
                      value={variant.price}
                      onChange={(e) =>
                        onVariantUpdate(variant.id, "price", e.target.value)
                      }
                      placeholder="0.00"
                      className="max-w-[100px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={variant.stock_quantity}
                      onChange={(e) =>
                        onVariantUpdate(
                          variant.id,
                          "stock_quantity",
                          e.target.value
                        )
                      }
                      placeholder="0"
                      className="max-w-[100px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={variant.sku}
                      onChange={(e) =>
                        onVariantUpdate(variant.id, "sku", e.target.value)
                      }
                      placeholder="SKU"
                      className="max-w-[120px]"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
