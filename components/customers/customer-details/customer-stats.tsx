import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Customer } from "@/lib/types/customer"
import { formatCurrency } from "@/lib/utils/utils"

interface CustomerStatsProps {
  customer: Customer
}

export function CustomerStats({ customer }: CustomerStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-sm text-muted-foreground">Total Orders</div>
          <div className="text-2xl font-bold">{customer.totalOrders}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Total Spent</div>
          <div className="text-2xl font-bold">{formatCurrency(customer.totalSpent)}</div>
        </div>
      </CardContent>
    </Card>
  )
}