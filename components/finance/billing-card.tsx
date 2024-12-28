"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Download } from "lucide-react"

export function BillingCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Bill</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Next billing date</p>
            <p className="text-2xl font-bold">April 1, 2024</p>
          </div>
          <CreditCard className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subscription Plan</span>
            <span>Premium</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Amount Due</span>
            <span>$299.00</span>
          </div>
        </div>
        <Button className="w-full" variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download Invoice
        </Button>
      </CardContent>
    </Card>
  )
}