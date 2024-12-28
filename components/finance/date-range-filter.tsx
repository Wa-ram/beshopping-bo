"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DateRangeFilterProps {
  onRangeChange: (range: string) => void
  selectedRange: string
}

export function DateRangeFilter({ onRangeChange, selectedRange }: DateRangeFilterProps) {
  return (
    <div className="flex items-center gap-4">
      <Select value={selectedRange} onValueChange={onRangeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select date range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="30">Last 30 days</SelectItem>
          <SelectItem value="60">Last 60 days</SelectItem>
          <SelectItem value="90">Last 90 days</SelectItem>
          <SelectItem value="180">Last 6 months</SelectItem>
          <SelectItem value="365">Last year</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}