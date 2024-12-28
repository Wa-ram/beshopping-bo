"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockDiscounts } from "@/lib/mock/discount";

export function DiscountList() {
  const [discounts] = useState(mockDiscounts);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Usage</TableHead>
            <TableHead>Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {discounts.map((discount) => (
            <TableRow key={discount.id}>
              <TableCell className="font-medium">{discount.code}</TableCell>
              <TableCell>{discount.type}</TableCell>
              <TableCell>{discount.value}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    discount.status === "active" ? "default" : "secondary"
                  }
                >
                  {discount.status}
                </Badge>
              </TableCell>
              <TableCell>
                {discount.usageCount}/{discount.usageLimit}
              </TableCell>
              <TableCell>
                {discount.startDate} - {discount.endDate}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
