"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const mockTransactions = [
  {
    id: "1",
    date: "2024-03-20",
    description: "Product Sale #1234",
    type: "income",
    amount: 299.99,
    status: "completed"
  },
  {
    id: "2",
    date: "2024-03-19",
    description: "Supplier Payment",
    type: "expense",
    amount: -1250.00,
    status: "completed"
  },
  {
    id: "3",
    date: "2024-03-18",
    description: "Subscription Revenue",
    type: "income",
    amount: 49.99,
    status: "pending"
  }
]

export function TransactionList() {
  const [transactions] = useState(mockTransactions)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                <Badge variant={transaction.type === "income" ? "default" : "secondary"}>
                  {transaction.type}
                </Badge>
              </TableCell>
              <TableCell className={transaction.type === "income" ? "text-green-600" : "text-red-600"}>
                {transaction.type === "income" ? "+" : ""}{transaction.amount.toFixed(2)}
              </TableCell>
              <TableCell>
                <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                  {transaction.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}