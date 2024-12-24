import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function EmptyState() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Package className="h-10 w-10" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">Ajouter vos produits</h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-xl">
        Commencez par créer votre premier produit. Vous pouvez ajouter des
        détails, fixer des prix et gérer les stocks en un seul endroit.
      </p>
      <Button
        onClick={() => router.push("/dashboard/products/add-new")}
        className="mt-6"
      >
        Ajouter un produit
      </Button>
    </div>
  );
}
