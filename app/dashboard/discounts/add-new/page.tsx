"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { DiscountForm } from "@/components/discounts/discount-form";
import { DiscountConditions } from "@/components/discounts/discount-conditions";
import { DiscountLimits } from "@/components/discounts/discount-limits";

export default function NewDiscountPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (data: any) => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/dashboard/discounts");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Create Discount</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <DiscountForm onSubmit={handleSave} isLoading={isSaving} />
          {/* <DiscountLimits /> */}
        </div>
        {/* <DiscountConditions /> */}
      </div>
    </div>
  );
}
