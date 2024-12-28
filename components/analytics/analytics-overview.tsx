"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Mon", visitors: 2400, conversions: 240 },
  { name: "Tue", visitors: 1398, conversions: 139 },
  { name: "Wed", visitors: 9800, conversions: 980 },
  { name: "Thu", visitors: 3908, conversions: 390 },
  { name: "Fri", visitors: 4800, conversions: 480 },
  { name: "Sat", visitors: 3800, conversions: 380 },
  { name: "Sun", visitors: 4300, conversions: 430 },
];

export function AnalyticsOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Traffic Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Line
              type="monotone"
              dataKey="visitors"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="conversions"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
