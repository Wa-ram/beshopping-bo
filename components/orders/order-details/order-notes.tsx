import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Order } from "@/lib/types/order"

interface OrderNotesProps {
  order: Order
}

export function OrderNotes({ order }: OrderNotesProps) {
  if (!order.notes) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="whitespace-pre-wrap text-sm">
          {order.notes}
        </div>
      </CardContent>
    </Card>
  )
}