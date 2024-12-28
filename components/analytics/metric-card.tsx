"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  chart: "line" | "realtime";
  realtimeUpdates?: boolean;
}

// Mock data generator for the sparkline
const generateSparklineData = () => {
  return Array.from({ length: 10 }, (_, i) => ({
    value: Math.floor(Math.random() * 100),
  }));
};

export function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  chart,
  realtimeUpdates,
}: MetricCardProps) {
  const [sparklineData, setSparklineData] = useState(generateSparklineData());

  useEffect(() => {
    if (realtimeUpdates) {
      const interval = setInterval(() => {
        setSparklineData((prev) => {
          const newData = [
            ...prev.slice(1),
            { value: Math.floor(Math.random() * 100) },
          ];
          return newData;
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [realtimeUpdates]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          <span className={change >= 0 ? "text-green-500" : "text-red-500"}>
            {change >= 0 ? "+" : ""}
            {change}%
          </span>
          <span className="ml-1">from previous period</span>
        </div>
        <div className="h-[80px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
