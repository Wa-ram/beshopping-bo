"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useOrderStore } from "@/lib/stores/order-store";
import { Order } from "@/lib/types/order";
import { OrderInfo } from "./order-info";
import { OrderSummary } from "./order-summary";
import { OrderItems } from "./order-items";
// import { OrderFulfillment } from "./order-fulfillment";
// import { OrderTimeline } from "./order-timeline";
import { OrderActions } from "./order-actions";
import { OrderNotes } from "./order-notes";

export function OrderDetails() {
  const router = useRouter();
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const { orders } = useOrderStore();

  useEffect(() => {
    // Simulate API call
    const fetchOrder = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const found = orders.find((o) => o.id === params.id);
      setOrder(found || null);
    };
    fetchOrder();
  }, [orders, params.id]);

  if (!order) {
    return null;
  }

  return (
    <div className="space-y-6 lg:w-10/12 mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {/* Back */}
          </Button>
          <h1 className="text-2xl font-bold">Order {order.orderNumber}</h1>
        </div>
        <OrderActions order={order} />
      </div>

      <div className="gap-4 flex">
        <div className="w-8/12 gap-6 flex flex-col">
          <OrderItems order={order} />
          <OrderSummary order={order} />

          {/* <OrderFulfillment order={order} /> */}
          {/* <OrderTimeline order={order} /> */}
        </div>
        <div className="w-4/12 gap-6 flex flex-col">
          <OrderNotes order={order} />
          <OrderInfo order={order} />
        </div>
      </div>
    </div>
  );
}
