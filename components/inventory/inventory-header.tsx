"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Download, RefreshCw } from "lucide-react";

export function InventoryHeader() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <Button size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Update Stock
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Input placeholder="Search inventory..." className="w-full md:max-w-sm" />
      </div>
    </div>
  );
}
