"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Banknote, ExternalLink } from "lucide-react";

export function PayoutAccount() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payout Account</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Next payout</p>
            <p className="text-2xl font-bold">$12,458.00</p>
          </div>
          <Banknote className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Bank Account</span>
            <span>••••4589</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Schedule</span>
            <span>Weekly</span>
          </div>
        </div>
        <Button className="w-full" variant="outline">
          <ExternalLink className="mr-2 h-4 w-4" />
          View Payout Settings
        </Button>
      </CardContent>
    </Card>
  );
}
