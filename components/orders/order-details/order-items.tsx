import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "@/lib/types/order";
import { formatCurrency } from "@/lib/utils";

interface OrderItemsProps {
  order: Order;
}

export function OrderItems({ order }: OrderItemsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Produits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-md bg-muted" />
              <div className="flex-1">
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-muted-foreground">
                  SKU: {item.sku} • Qty: {item.quantity}
                </div>
              </div>
              <div className="font-medium">
                {formatCurrency(item.totalPrice)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
