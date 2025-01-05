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
  // Megaphone,
  Tag,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

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
      { name: "Inventaires", href: "/dashboard/products/inventory" },
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
  {
    name: "Finance",
    href: "/dashboard/finance",
    icon: Wallet,
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart,
  },
  // {
  //   name: "Marketing",
  //   href: "/dashboard/marketing",
  //   icon: Megaphone,
  // },
  {
    name: "Discounts",
    href: "/dashboard/discounts",
    icon: Tag,
  },
];

interface NavItemProps {
  item: (typeof navigation)[0];
  isExpanded: boolean;
  onToggle: () => void;
  pathname: string;
}

function NavItem({ item, isExpanded, onToggle, pathname }: NavItemProps) {
  const isActive =
    pathname === item.href || pathname.startsWith(item.href + "/");
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div>
      <Link
        href={item.href}
        className={cn(
          "flex items-center px-6 py-2 text-sm font-medium",
          isActive && !hasChildren
            ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
        )}
        onClick={(e) => {
          if (hasChildren) {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        <item.icon className="mr-3 h-5 w-5" />
        <span>{item.name}</span>
        {hasChildren && (
          <div className="ml-auto">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>
        )}
      </Link>
      {hasChildren && isExpanded && (
        <div className=" mt-1 space-y-1">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={cn(
                "flex items-center pl-8 py-2 text-sm font-medium",
                pathname === child.href
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              )}
            >
              {child.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function MainNav() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (itemName: string) => {
    setExpandedItems((current) =>
      current.includes(itemName)
        ? current.filter((name) => name !== itemName)
        : [...current, itemName]
    );
  };

  return (
    <nav className="md:flex flex-col min-w-64 border-r bg-gray-50/40 hidden ">
      <div className="p-4">
        <h1 className="text-xl font-bold">BeShopping</h1>
      </div>
      <div className="space-y-1">
        {navigation.map((item) => (
          <NavItem
            key={item.name}
            item={item}
            isExpanded={expandedItems.includes(item.name)}
            onToggle={() => toggleItem(item.name)}
            pathname={pathname}
          />
        ))}
      </div>
    </nav>
  );
}
