"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const products = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    views: 1234,
    sales: 89,
    conversion: "7.2%",
    revenue: "$2,670",
  },
  {
    id: "2",
    name: "Blue Denim Jeans",
    views: 956,
    sales: 65,
    conversion: "6.8%",
    revenue: "$5,850",
  },
  {
    id: "3",
    name: "Running Shoes",
    views: 842,
    sales: 51,
    conversion: "6.1%",
    revenue: "$4,335",
  },
];

export function ProductPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Sales</TableHead>
              <TableHead className="text-right">Conversion</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell className="text-right">{product.views}</TableCell>
                <TableCell className="text-right">{product.sales}</TableCell>
                <TableCell className="text-right">
                  {product.conversion}
                </TableCell>
                <TableCell className="text-right">{product.revenue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
