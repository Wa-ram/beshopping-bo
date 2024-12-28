"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function TaxSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tax Calculation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="automaticTax">Automatic tax calculation</Label>
            <Switch id="automaticTax" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="taxRate">Default tax rate</Label>
            <div className="relative">
              <Input
                id="taxRate"
                type="number"
                placeholder="0.00"
                className="pl-8"
                disabled
              />
              <span className="absolute left-3 top-2.5 text-muted-foreground">
                %
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tax Regions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">United States</h3>
              <p className="text-sm text-muted-foreground">
                State and local taxes
              </p>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
          <Button>Add Tax Region</Button>
        </CardContent>
      </Card>
    </div>
  );
}
