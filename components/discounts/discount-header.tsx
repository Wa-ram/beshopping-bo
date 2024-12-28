"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Filter, Download } from "lucide-react";
import { useRouter } from "next/navigation";

export function DiscountHeader() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Discounts</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button
            size="sm"
            onClick={() => router.push("/dashboard/discounts/add-new")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Discount
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Input placeholder="Search discounts..." className="max-w-sm" />
      </div>
    </div>
  );
}
