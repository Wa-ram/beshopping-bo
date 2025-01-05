"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter, Download, Tag, Printer } from "lucide-react"
import { useOrderStore } from "@/lib/stores/order-store"

export function OrderHeader() {
  const selectedOrders = useOrderStore((state) => state.selectedOrders)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Commandes</h1>
        <div className="flex items-center gap-2">
          {selectedOrders.length > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
              >
                <Tag className="h-4 w-4 mr-2" />
                Add Tags
              </Button>
              <Button
                variant="outline"
                size="sm"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Shipping Labels
              </Button>
            </>
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
          placeholder="Search orders..."
          className="w-full md:max-w-sm"
        />
      </div>
    </div>
  )
}