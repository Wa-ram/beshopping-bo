"use client"

import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Order } from "@/lib/types/order"
import { useOrderStore } from "@/lib/stores/order-store"
import { MoreHorizontal, FileText, Tag, Ban, RefreshCw } from "lucide-react"

interface OrderActionsProps {
  order: Order
}

export function OrderActions({ order }: OrderActionsProps) {
  const [isNoteOpen, setIsNoteOpen] = useState(false)
  const [isTagOpen, setIsTagOpen] = useState(false)
  const [note, setNote] = useState(order.notes || "")
  const [newTag, setNewTag] = useState("")
  const { updateOrderNote, updateOrderTags } = useOrderStore()

  const handleUpdateNote = () => {
    updateOrderNote(order.id, note)
    setIsNoteOpen(false)
  }

  const handleAddTag = () => {
    if (newTag) {
      updateOrderTags(order.id, [...order.tags, newTag])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    updateOrderTags(
      order.id,
      order.tags.filter(tag => tag !== tagToRemove)
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={order.status === "cancelled"}
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Refund
      </Button>

      <Dialog open={isNoteOpen} onOpenChange={setIsNoteOpen}>
        <Dialog open={isTagOpen} onOpenChange={setIsTagOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <FileText className="h-4 w-4 mr-2" />
                  Add Note
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <Tag className="h-4 w-4 mr-2" />
                  Manage Tags
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem disabled={order.status === "cancelled"}>
                <Ban className="h-4 w-4 mr-2" />
                Cancel Order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Note</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter a note about this order..."
                className="min-h-[100px]"
              />
              <div className="flex justify-end">
                <Button onClick={handleUpdateNote}>Save Note</Button>
              </div>
            </div>
          </DialogContent>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manage Tags</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Enter a tag..."
                />
                <Button onClick={handleAddTag}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {order.tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md"
                  >
                    <span className="text-sm">{tag}</span>
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </Dialog>
    </div>
  )
}