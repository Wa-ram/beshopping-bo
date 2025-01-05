import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Wallet,
    BarChart,
    Tag,
  } from "lucide-react";
  
  export const navigation = [
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
        { name: "Vue d'ensemble", href: "/dashboard/products" },
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
    {
      name: "Discounts",
      href: "/dashboard/discounts",
      icon: Tag,
    },
  ];