"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useCustomerStore } from "@/lib/stores/customer-store"
import { Customer } from "@/lib/types/customer"

interface CustomerTabsProps {
  customer: Customer
}

export function CustomerTabs({ customer }: CustomerTabsProps) {
  const { updateCustomerNote } = useCustomerStore()

  return (
    <Tabs defaultValue="orders" className="w-full">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
        <TabsTrigger value="timeline">Timeline</TabsTrigger>
      </TabsList>

      <TabsContent value="orders" className="space-y-4">
        <Card>
          <CardContent className="p-6">
            No orders yet
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notes" className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <Textarea
              placeholder="Add a note about this customer..."
              value={customer.notes || ""}
              onChange={(e) => updateCustomerNote(customer.id, e.target.value)}
              className="min-h-[200px]"
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="timeline" className="space-y-4">
        <Card>
          <CardContent className="p-6">
            Timeline will be implemented later
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
} 