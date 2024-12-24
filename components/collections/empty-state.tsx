"use client";

import { FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function EmptyState() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <FolderOpen className="h-10 w-10" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">Aucune collection</h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-xl">
        Créez des collections pour organiser vos produits et les rendre plus
        faciles à découvrir.
        {/* Vous pouvez créer des collections manuellement ou
        automatiquement en fonction de conditions. */}
      </p>
      <Button
        onClick={() => router.push("/dashboard/products/collections/add-new")}
        className="mt-6"
      >
        Create Your First Collection
      </Button>
    </div>
  );
}
