"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navigation } from "@/lib/config/navigation";

export function NavigationMenu() {
  const router = useRouter();
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
    <nav className="flex flex-col space-y-1">
      {navigation.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
        const isExpanded = expandedItems.includes(item.name);
        const hasChildren = item.children && item.children.length > 0;

        return (
          <div key={item.name}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-between",
                isActive && !hasChildren && "bg-gray-100 dark:bg-gray-800"
              )}
              onClick={() => {
                if (hasChildren) {
                  toggleItem(item.name);
                } else {
                  router.push(item.href);
                }
              }}
            >
              <span className="flex items-center">
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </span>
              {hasChildren && (
                isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
              )}
            </Button>

            {hasChildren && isExpanded && (
              <div className="ml-4 mt-1 space-y-1">
                {item.children.map((child) => (
                  <Button
                    key={child.href}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start pl-8",
                      pathname === child.href && "bg-gray-100 dark:bg-gray-800"
                    )}
                    onClick={() => router.push(child.href)}
                  >
                    {child.name}
                  </Button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}