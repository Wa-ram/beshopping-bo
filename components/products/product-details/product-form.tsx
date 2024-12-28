"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/lib/types/product";

interface ProductFormProps {
  product: Product;
  onChange: (data: Partial<Product>) => void;
}

export function ProductForm({ product, onChange }: ProductFormProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={product.title}
              onChange={(e) => onChange({ title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={product.description}
              onChange={(e) => onChange({ description: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={product.price}
              onChange={(e) => onChange({ price: parseFloat(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="compareAtPrice">Compare at price</Label>
            <Input
              id="compareAtPrice"
              type="number"
              value={product.compareAtPrice || ""}
              onChange={(e) =>
                onChange({ compareAtPrice: parseFloat(e.target.value) })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="chargeTax">Charge tax on this product</Label>
            <Switch
              id="chargeTax"
              checked={product.chargeTax}
              onCheckedChange={(checked) => onChange({ chargeTax: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="trackInventory">Track inventory</Label>
            <Switch
              id="trackInventory"
              checked={product.trackInventory}
              onCheckedChange={(checked) =>
                onChange({ trackInventory: checked })
              }
            />
          </div>
          {product.trackInventory && (
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={product.quantity || 0}
                onChange={(e) =>
                  onChange({ quantity: parseInt(e.target.value) })
                }
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="sku">SKU</Label>
            <Input
              id="sku"
              value={product.sku || ""}
              onChange={(e) => onChange({ sku: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
