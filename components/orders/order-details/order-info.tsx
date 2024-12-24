import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "@/lib/types/order";

interface OrderInfoProps {
  order: Order;
}

export function OrderInfo({ order }: OrderInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="font-medium">{order.customerName}</div>
          <div className="text-sm text-muted-foreground">
            {order.customerEmail}
          </div>
        </div>
        <div>
          <div className="font-medium">Adresse de livraison</div>
          <div className="text-sm text-muted-foreground">
            {order.shippingAddress.address1}
            <br />
            {order.shippingAddress.address2 && (
              <>
                {order.shippingAddress.address2}
                <br />
              </>
            )}
            {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
            {order.shippingAddress.postalCode}
            <br />
            {order.shippingAddress.country}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
