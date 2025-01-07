import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Order } from "@/lib/types/order";
// import { useOrderStore } from "@/lib/stores/order-store"

interface OrderFulfillmentProps {
  order: Order;
}

export function OrderFulfillment({ order }: OrderFulfillmentProps) {
  const [carrier, setCarrier] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  // const { updateShippingDetails } = useOrderStore()

  // const handleFulfill = () => {
  //   updateShippingDetails(order.id, {
  //     carrier,
  //     trackingNumber,
  //     shippingMethod: "Standard",
  //     shippingCost: order.shippingCost
  //   })
  // }

  if (order.fulfillmentStatus === "fulfilled") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Fulfillment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">Carrier:</span>{" "}
              {order.shippingDetails?.carrier}
            </div>
            <div className="text-sm">
              <span className="font-medium">Tracking Number:</span>{" "}
              {order.shippingDetails?.trackingNumber}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fulfill Order</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="carrier">Shipping Carrier</Label>
            <Input
              id="carrier"
              value={carrier}
              onChange={(e) => setCarrier(e.target.value)}
              placeholder="Enter shipping carrier"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="tracking">Tracking Number</Label>
            <Input
              id="tracking"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter tracking number"
            />
          </div>
          <Button
          // onClick={handleFulfill}
          >
            Mark as Fulfilled
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
