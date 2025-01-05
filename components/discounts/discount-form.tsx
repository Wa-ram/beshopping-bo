"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";

// Define the shape of the discount data
interface DiscountData {
  type: "percentage" | "fixed";
  code: string;
  value: number;
}

interface DiscountFormProps {
  onSubmit: (data: DiscountData) => Promise<void>;
  isLoading?: boolean;
}

export function DiscountForm({ onSubmit, isLoading }: DiscountFormProps) {
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">(
    "percentage"
  );
  const [code, setCode] = useState("");
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type: discountType,
      code,
      value: parseFloat(value),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Discount Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Discount Type</Label>
            <RadioGroup
              value={discountType}
              onValueChange={(value) =>
                setDiscountType(value as "percentage" | "fixed")
              }
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="percentage" id="percentage" />
                <Label htmlFor="percentage">Percentage</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fixed" id="fixed" />
                <Label htmlFor="fixed">Fixed Amount</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">Discount Code</Label>
            <Input
              id="code"
              placeholder="e.g., SUMMER2024"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="value">
              {discountType === "percentage" ? "Percentage" : "Amount"}
            </Label>
            <div className="relative">
              <Input
                id="value"
                type="number"
                placeholder={discountType === "percentage" ? "10" : "10.00"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
                className="pl-8"
              />
              <span className="absolute left-3 top-2.5 text-muted-foreground">
                {discountType === "percentage" ? "%" : "$"}
              </span>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Discount
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
