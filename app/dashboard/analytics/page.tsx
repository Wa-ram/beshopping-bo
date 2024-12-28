"use client"

import { useState } from "react"
import { DateRangeFilter } from "@/components/analytics/date-range-filter"
import { MetricsGrid } from "@/components/analytics/metrics-grid"

export default function AnalyticsPage() {
  const [selectedRange, setSelectedRange] = useState("30")

  const handleRangeChange = (range: string) => {
    setSelectedRange(range)
    // Add logic to fetch data for the selected range
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <DateRangeFilter 
          onRangeChange={handleRangeChange} 
          selectedRange={selectedRange} 
        />
      </div>
      <MetricsGrid selectedRange={selectedRange} />
    </div>
  )
}