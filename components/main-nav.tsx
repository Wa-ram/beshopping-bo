"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Wallet,
  BarChart,
  Megaphone,
  Tag,
} from "lucide-react";

const navigation = [
  {
    name: "Accueil",
    href: "/dashboard/home",
    icon: LayoutDashboard,
  },
  {
    name: "Produits",
    href: "/dashboard/products",
    icon: Package,
    children: [
      { name: "Vue d’ensemble", href: "/dashboard/products" },
      { name: "Collections", href: "/dashboard/products/collections" },
      // { name: "Inventaires", href: "/dashboard/products/inventory" },
    ],
  },
  {
    name: "Commandes",
    href: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    name: "Clients",
    href: "/dashboard/customers",
    icon: Users,
  },
  // {
  //   name: "Finance",
  //   href: "/dashboard/finance",
  //   icon: Wallet
  // },
  // {
  //   name: "Analytics",
  //   href: "/dashboard/analytics",
  //   icon: BarChart
  // },
  // {
  //   name: "Marketing",
  //   href: "/dashboard/marketing",
  //   icon: Megaphone
  // },
  // {
  //   name: "Discounts",
  //   href: "/dashboard/discounts",
  //   icon: Tag
  // }
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col w-64 border-r bg-gray-50/40 dark:bg-gray-900/40">
      <div className="p-4">
        <h1 className="text-xl font-bold">BeShopping</h1>
      </div>
      <div className="space-y-1">
        {navigation.map((item) => (
          <div key={item.name}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center px-6 py-2 text-sm font-medium",
                pathname === item.href && !item.children
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
            {item.children?.map((child) => (
              <Link
                key={child.name}
                href={child.href}
                className={cn(
                  "flex items-center pl-14 py-2 text-sm font-medium",
                  pathname === child.href
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                )}
              >
                {child.name}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </nav>
  );
}
