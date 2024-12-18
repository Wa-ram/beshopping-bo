"use client"

import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useCustomerStore } from "@/lib/stores/customer-store"
import { Customer } from "@/lib/types/customer"
import { formatCurrency } from "@/lib/utils"

interface CustomerTableProps {
  customers: Customer[]
}

export function CustomerTable({ customers }: CustomerTableProps) {
  const router = useRouter()
  const { selectedCustomers, toggleCustomerSelection } = useCustomerStore()

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Total Spent</TableHead>
            <TableHead>Last Order</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow
              key={customer.id}
              className="cursor-pointer"
              onClick={() => router.push(`/customers/${customer.id}`)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedCustomers.includes(customer.id)}
                  onCheckedChange={() => toggleCustomerSelection(customer.id)}
                />
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">
                    {customer.firstName} {customer.lastName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {customer.email}
                  </div>
                </div>
              </TableCell>
              <TableCell>{customer.totalOrders}</TableCell>
              <TableCell>{formatCurrency(customer.totalSpent)}</TableCell>
              <TableCell>
                {customer.lastOrderDate?.toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge
                  variant={customer.status === "active" ? "default" : "secondary"}
                >
                  {customer.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}