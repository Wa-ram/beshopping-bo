"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <ShoppingCart className="h-10 w-10" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">No orders yet</h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        When customers place orders, they'll appear here. You can process orders,
        manage fulfillment, and track shipping status.
      </p>
      <Button
        variant="outline"
        className="mt-6"
      >
        Learn about order management
      </Button>
    </div>
  )
}