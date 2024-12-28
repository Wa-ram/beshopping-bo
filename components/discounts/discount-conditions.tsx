"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DiscountConditions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conditions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="minimum-requirements">Minimum Requirements</Label>
            <Switch id="minimum-requirements" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="Requirement type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="amount">Minimum purchase amount</SelectItem>
                <SelectItem value="quantity">
                  Minimum quantity of items
                </SelectItem>
              </SelectContent>
            </Select>
            <Input type="number" placeholder="Value" disabled />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="customer-eligibility">Customer Eligibility</Label>
            <Switch id="customer-eligibility" />
          </div>
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Select customers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All customers</SelectItem>
              <SelectItem value="specific">
                Specific customer segments
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="product-conditions">Product Conditions</Label>
            <Switch id="product-conditions" />
          </div>
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Select products" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All products</SelectItem>
              <SelectItem value="specific">Specific products</SelectItem>
              <SelectItem value="collections">Collections</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
