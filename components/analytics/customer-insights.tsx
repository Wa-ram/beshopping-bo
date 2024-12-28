"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const insights = [
  {
    category: "New Customers",
    value: "65%",
    trend: "up",
    description: "First-time buyers",
  },
  {
    category: "Returning Customers",
    value: "35%",
    trend: "down",
    description: "Repeat buyers",
  },
  {
    category: "Average Order Value",
    value: "$85.20",
    trend: "up",
    description: "Per transaction",
  },
];

export function CustomerInsights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div
              key={insight.category}
              className="flex items-center justify-between"
            >
              <div>
                <div className="font-medium">{insight.category}</div>
                <div className="text-sm text-muted-foreground">
                  {insight.description}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-lg font-bold">{insight.value}</div>
                <Badge
                  variant={insight.trend === "up" ? "default" : "secondary"}
                >
                  {insight.trend === "up" ? "↑" : "↓"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
