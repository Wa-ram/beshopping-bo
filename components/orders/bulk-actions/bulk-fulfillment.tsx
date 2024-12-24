"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useOrderStore } from "@/lib/stores/order-store"
import { Loader2 } from "lucide-react"

export function BulkFulfillment() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [carrier, setCarrier] = useState("")
  const { selectedOrders, orders, updateShippingDetails } = useOrderStore()

  const handleFulfill = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      selectedOrders.forEach(orderId => {
        const order = orders.find(o => o.id === orderId)
        if (order && order.fulfillmentStatus !== "fulfilled") {
          updateShippingDetails(orderId, {
            carrier,
            shippingMethod: "Standard",
            shippingCost: order.shippingCost
          })
        }
      })
      
      setIsOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  if (selectedOrders.length === 0) return null

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Fulfill Orders
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bulk Fulfill Orders</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-1">
            <Label>Selected Orders</Label>
            <div className="text-sm text-muted-foreground">
              {selectedOrders.length} orders selected
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="carrier">Shipping Carrier</Label>
            <Input
              id="carrier"
              value={carrier}
              onChange={(e) => setCarrier(e.target.value)}
              placeholder="Enter shipping carrier"
            />
          </div>
          <Button 
            onClick={handleFulfill}
            disabled={isLoading || !carrier}
            className="w-full"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Fulfill {selectedOrders.length} Orders
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}