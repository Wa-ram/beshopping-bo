"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useOrderStore } from "@/lib/stores/order-store";
import { Order } from "@/lib/types/order";
import { formatCurrency } from "@/lib/utils/utils";

interface OrderTableProps {
  orders: Order[];
}

export function OrderTable({ orders }: OrderTableProps) {
  const router = useRouter();
  const { selectedOrders, toggleOrderSelection } = useOrderStore();

  const getStatusBadgeVariant = (status: Order["fulfillmentStatus"]) => {
    switch (status) {
      case "fulfilled":
        return "default";
      case "partially_fulfilled":
        return "secondary";
      case "unfulfilled":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead>Order</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Articles</TableHead>
            <TableHead>Statut d&apos;accomplissement</TableHead>
            <TableHead>Statut de la livraison</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              className="cursor-pointer"
              onClick={() => router.push(`/dashboard/orders/${order.id}`)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedOrders.includes(order.id)}
                  onCheckedChange={() => toggleOrderSelection(order.id)}
                />
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{order.orderNumber}</div>
                  <div className="text-sm text-muted-foreground"></div>
                </div>
              </TableCell>
              <TableCell>{order.createdAt.toLocaleDateString()}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{order.customerName}</div>
                  <div className="text-sm text-muted-foreground">
                    {order.customerEmail}
                  </div>
                </div>
              </TableCell>
              <TableCell>{formatCurrency(order.total)}</TableCell>
              <TableCell>{order.items.length}</TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(order.fulfillmentStatus)}>
                  {order.fulfillmentStatus.replace("_", " ")}
                </Badge>
              </TableCell>
              <TableCell>
                {order.shippingDetails && order.shippingDetails?.shippingMethod}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
