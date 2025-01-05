"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Filter, Download, Trash2 } from "lucide-react";
import { useProductStore } from "@/lib/stores/product-store";
import { useRouter } from "next/navigation";

export function ProductHeader() {
  const router = useRouter();
  const selectedProducts = useProductStore((state) => state.selectedProducts);
  const deleteProducts = useProductStore((state) => state.deleteProducts);
  const clearSelection = useProductStore((state) => state.clearSelection);

  const handleDelete = () => {
    deleteProducts(selectedProducts);
    clearSelection();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Produits</h1>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            {selectedProducts.length > 0 && (
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <Button
            size="sm"
            onClick={() => router.push("/dashboard/products/add-new")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Input placeholder="Search products..." className="w-full md:max-w-sm" />
      </div>
    </div>
  );
}
