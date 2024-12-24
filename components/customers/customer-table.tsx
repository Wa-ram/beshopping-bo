"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useCustomerStore } from "@/lib/stores/customer-store";
import { Customer } from "@/lib/types/customer";
import { formatCurrency } from "@/lib/utils";

interface CustomerTableProps {
  customers: Customer[];
}

export function CustomerTable({ customers }: CustomerTableProps) {
  const router = useRouter();
  const { selectedCustomers, toggleCustomerSelection } = useCustomerStore();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Nbre total de commandes</TableHead>
            <TableHead>Montant dépensé</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow
              key={customer.id}
              className="cursor-pointer"
              onClick={() => router.push(`/dashboard/customers/${customer.id}`)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedCustomers.includes(customer.id)}
                  onCheckedChange={() => toggleCustomerSelection(customer.id)}
                />
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">
                    {customer.firstName} {customer.lastName}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-muted-foreground">
                  {customer.email}
                </div>
              </TableCell>
              <TableCell>
                {customer.address ? `${customer.address.street}, ${customer.address.city}, ${customer.address.country}` : "--"}
              </TableCell>
              <TableCell>
                {customer.totalOrders}
                {/* <Badge
                  variant={
                    customer.status === "active" ? "default" : "secondary"
                  }
                >
                  {customer.status}
                </Badge> */}
              </TableCell>
              <TableCell>{formatCurrency(customer.totalSpent)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
