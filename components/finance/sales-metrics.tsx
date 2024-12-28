"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, Percent } from "lucide-react"

interface SalesMetricsProps {
  netSales: number
  grossProfit: number
  grossMargin: number
}

export function SalesMetrics({ netSales, grossProfit, grossMargin }: SalesMetricsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Sales</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${netSales.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+12.5% from last period</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Gross Profit</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${grossProfit.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+8.2% from last period</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Gross Margin</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{grossMargin}%</div>
          <p className="text-xs text-muted-foreground">+2.4% from last period</p>
        </CardContent>
      </Card>
    </div>
  )
}