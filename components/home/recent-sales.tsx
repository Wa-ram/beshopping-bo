"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentSales = [
  {
    name: "John Doe",
    email: "john@example.com",
    amount: "$250.00",
    avatar: "/avatars/01.png",
    initials: "JD"
  },
  {
    name: "Alice Smith",
    email: "alice@example.com",
    amount: "$120.00",
    avatar: "/avatars/02.png",
    initials: "AS"
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    amount: "$450.00",
    avatar: "/avatars/03.png",
    initials: "BJ"
  },
  {
    name: "Sarah Wilson",
    email: "sarah@example.com",
    amount: "$800.00",
    avatar: "/avatars/04.png",
    initials: "SW"
  },
  {
    name: "Mike Brown",
    email: "mike@example.com",
    amount: "$1,200.00",
    avatar: "/avatars/05.png",
    initials: "MB"
  }
]

export function RecentSales() {
  return (
    <div className="space-y-8">
      {recentSales.map((sale) => (
        <div key={sale.email} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={sale.avatar} alt={sale.name} />
            <AvatarFallback>{sale.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium">{sale.amount}</div>
        </div>
      ))}
    </div>
  )
}