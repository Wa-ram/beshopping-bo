"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ShoppingBag, ArrowUpRight, ArrowDownRight } from "lucide-react"

export function AnalyticsStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Visitors</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,350</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
            +12.3% from last week
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Orders</CardTitle>
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,234</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
            -3.2% from last week
          </div>
        </CardContent>
      </Card>
    </div>
  )
}