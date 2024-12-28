"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types/product";
import { Upload, X } from "lucide-react";

interface ProductMediaProps {
  product: Product;
  onChange: () => void;
}

export function ProductMedia({ product, onChange }: ProductMediaProps) {
  const handleUpload = () => {
    // Implement media upload logic
    onChange();
  };

  const handleRemove = (index: number) => {
    // Implement media removal logic
    onChange();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Media</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {product.media.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Product ${index + 1}`}
                className="w-full h-40 object-cover rounded-md"
              />
              <button
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 p-1 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full" onClick={handleUpload}>
          <Upload className="h-4 w-4 mr-2" />
          Upload Media
        </Button>
      </CardContent>
    </Card>
  );
}
