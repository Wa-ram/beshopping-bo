"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { useProductStore } from "@/lib/stores/product-store";
import { ProductForm } from "@/components/products/add-new/product-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NewProductPage() {
  // const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  //const addProduct = useProductStore((state) => state.addProduct);

  // const handleSave = async (productData: any) => {
  //   setIsSaving(true);
  //   try {
  //     // Simulate API call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     //addProduct({
  //       //id: Math.random().toString(36).substr(2, 9),
  //       //...productData,
  //     //});
  //     router.push("/products");
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };

  return (
    <div className="space-y-6 lg:w-10/12 mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {/* Back */}
        </Button>
        <h1 className="text-2xl font-bold">Ajouter un produit</h1>
      </div>
      <ProductForm 
      //onSubmit={handleSave} isLoading={isSaving} 
       />
    </div>
  );
}
