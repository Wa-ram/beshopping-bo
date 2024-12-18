"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter, Download, Tag } from "lucide-react"
import { useCustomerStore } from "@/lib/stores/customer-store"

export function CustomerHeader() {
  const selectedCustomers = useCustomerStore((state) => state.selectedCustomers)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Clients</h1>
        <div className="flex items-center gap-2">
          {selectedCustomers.length > 0 && (
            <Button
              variant="outline"
              size="sm"
            >
              <Tag className="h-4 w-4 mr-2" />
              Add Tags
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button
            variant="outline"
            size="sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search customers..."
          className="max-w-sm"
        />
      </div>
    </div>
  )
}