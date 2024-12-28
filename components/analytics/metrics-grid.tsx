"use client";

import { MetricCard } from "./metric-card";
import { DollarSign, ShoppingCart, ArrowUpRight, Users } from "lucide-react";

interface MetricsGridProps {
  selectedRange: string;
}

export function MetricsGrid({ selectedRange }: MetricsGridProps) {
  // Mock data - replace with real API calls
  const metrics = {
    totalSales: 124500,
    conversion: 3.2,
    totalOrders: 1234,
    averageOrder: 98.5,
    activeVisitors: 573,
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <MetricCard
        title="Total Sales"
        value={`$${metrics.totalSales.toLocaleString()}`}
        change={12.5}
        icon={DollarSign}
        chart="line"
      />
      <MetricCard
        title="Online Store Conversion"
        value={`${metrics.conversion}%`}
        change={0.8}
        icon={ArrowUpRight}
        chart="line"
      />
      <MetricCard
        title="Total Orders"
        value={metrics.totalOrders.toString()}
        change={5.2}
        icon={ShoppingCart}
        chart="line"
      />
      <MetricCard
        title="Average Order Value"
        value={`$${metrics.averageOrder}`}
        change={-2.1}
        icon={DollarSign}
        chart="line"
      />
      <MetricCard
        title="Active Visitors"
        value={metrics.activeVisitors.toString()}
        change={15.3}
        icon={Users}
        chart="realtime"
        realtimeUpdates={true}
      />
    </div>
  );
}
