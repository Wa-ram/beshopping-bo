"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import ProductGeneralInfo from "./product-general-info";
import ProductPricingAndOptions from "./product-pricing-and-options";

const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  status: z.enum(["draft", "active", "archived"]),
  price: z.number().min(0),
});

interface ProductFormProps {
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
  initialData?: any;
}

export function ProductForm({
  onSubmit,
  isLoading,
  initialData,
}: ProductFormProps) {
  const [date, setDate] = useState<Date>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex gap-6">
        <div className="lg:w-8/12 gap-6 flex flex-col order-2 lg:order-1">
          <ProductPricingAndOptions />
        </div>
        <div className="lg:w-4/12 gap-6 flex flex-col order-1 lg:order-2">
          <ProductGeneralInfo />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        {/* <Button variant="outline" type="button">
          Save as Draft
        </Button> */}
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Publish Product
        </Button>
      </div>
    </form>
  );
}
