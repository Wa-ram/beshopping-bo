import { Card, CardContent } from "@/components/ui/card"
import { Order } from "@/lib/types/order"
import { formatCurrency } from "@/lib/utils"

interface OrderSummaryProps {
  order: Order
}

export function OrderSummary({ order }: OrderSummaryProps) {
  return (
    <Card>
      {/* <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader> */}
      <CardContent>
        <div className="space-y-4 mt-6">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatCurrency(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{formatCurrency(order.shippingCost)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>{formatCurrency(order.tax)}</span>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}