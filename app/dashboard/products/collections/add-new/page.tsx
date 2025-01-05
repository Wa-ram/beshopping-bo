"use client";

// import { useState } from "react";
import { useRouter } from "next/navigation";
// import { useCollectionStore } from "@/lib/stores/collection-store";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import CollectionForm from "@/components/collections/add-new/collection-form";

export default function NewCollectionPage() {
  // const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  // const addCollection = useCollectionStore((state) => state.addCollection);

  // const handleSave = async (collectionData: any) => {
  //   setIsSaving(true);
  //   try {
  //     // Simulate API call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     addCollection({
  //       id: Math.random().toString(36).substr(2, 9),
  //       ...collectionData,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     });
  //     router.push("/products/collections");
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };

  return (
    <div className="space-y-6 lg:w-10/12 mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Créer une collection</h1>
      </div>
      <CollectionForm />
    </div>
  );
}
