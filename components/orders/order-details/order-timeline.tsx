import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "@/lib/types/order";

interface OrderTimelineProps {
  order: Order;
}

export function OrderTimeline({ order }: OrderTimelineProps) {
  const events = [
    {
      date: order.createdAt,
      title: "Order placed",
      description: `Order ${order.orderNumber} was placed by ${order.customerName}`,
    },
    {
      date: order.updatedAt,
      title: "Payment confirmed",
      description: "Payment was successfully processed",
    },
  ];

  if (order.shippingDetails) {
    events.push({
      date: order.updatedAt,
      title: "Order fulfilled",
      description: `Order was shipped via ${order.shippingDetails.carrier}`,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-24 text-sm text-muted-foreground">
                {/* {event.date.toLocaleDateString()} */}
              </div>
              <div>
                <div className="font-medium">{event.title}</div>
                <div className="text-sm text-muted-foreground">
                  {event.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
