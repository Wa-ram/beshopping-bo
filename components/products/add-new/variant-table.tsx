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
import { ScrollArea } from "@/components/ui/scroll-area";
import { VariantOption, VariantCombination } from "@/lib/types/product";

interface VariantTableProps {
  options: VariantOption[];
  variants: VariantCombination[];
  onVariantUpdate: (
    id: string,
    field: "price" | "available" | "onHand" | "sku",
    value: string
  ) => void;
}

export function VariantTable({
  options,
  variants,
  onVariantUpdate,
}: VariantTableProps) {
  return (
    <ScrollArea className="w-full rounded-md border">
      <div className="min-w-max">
        <Table>
          <TableHeader>
            <TableRow>
              {options.map((option) => (
                <TableHead key={option.name}>{option.name}</TableHead>
              ))}
              <TableHead>Price</TableHead>
              <TableHead>Available</TableHead>
              <TableHead>On Hand</TableHead>
              <TableHead>SKU</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variants.map((variant) => (
              <TableRow key={variant.id}>
                {options.map((option) => (
                  <TableCell key={option.name}>
                    {variant.combination[option.name]}
                  </TableCell>
                ))}
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
                    value={variant.available}
                    onChange={(e) =>
                      onVariantUpdate(variant.id, "available", e.target.value)
                    }
                    placeholder="0"
                    className="max-w-[100px]"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={variant.onHand}
                    onChange={(e) =>
                      onVariantUpdate(variant.id, "onHand", e.target.value)
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
    </ScrollArea>
  );
}
