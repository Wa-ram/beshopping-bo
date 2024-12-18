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
import { Tag } from "lucide-react"

export function BulkTagManagement() {
  const [isOpen, setIsOpen] = useState(false)
  const [newTag, setNewTag] = useState("")
  const { selectedOrders, orders, updateOrderTags } = useOrderStore()

  const handleAddTag = () => {
    if (!newTag) return

    selectedOrders.forEach(orderId => {
      const order = orders.find(o => o.id === orderId)
      if (order && !order.tags.includes(newTag)) {
        updateOrderTags(orderId, [...order.tags, newTag])
      }
    })

    setNewTag("")
    setIsOpen(false)
  }

  if (selectedOrders.length === 0) return null

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Tag className="h-4 w-4 mr-2" />
          Add Tags
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Tags to Orders</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Selected Orders</Label>
            <div className="text-sm text-muted-foreground">
              {selectedOrders.length} orders selected
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tag">Tag</Label>
            <div className="flex gap-2">
              <Input
                id="tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Enter a tag..."
              />
              <Button onClick={handleAddTag} disabled={!newTag}>
                Add
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}