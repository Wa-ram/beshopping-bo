"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ShippingSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Shipping Zones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Domestic Shipping</h3>
              <p className="text-sm text-muted-foreground">United States</p>
            </div>
            <Button variant="outline">Edit</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">International Shipping</h3>
              <p className="text-sm text-muted-foreground">Rest of World</p>
            </div>
            <Button variant="outline">Edit</Button>
          </div>
          <Button>Add Shipping Zone</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shipping Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="freeShipping">Enable free shipping</Label>
            <Switch id="freeShipping" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="minimumOrder">
              Minimum order amount for free shipping
            </Label>
            <Input
              id="minimumOrder"
              type="number"
              placeholder="0.00"
              disabled
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
