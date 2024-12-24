"use client";

import { ShoppingCart } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <ShoppingCart className="h-10 w-10" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">Aucune commande</h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-xl">
        Lorsque les clients passent des commandes, celles-ci apparaissent ici.
        Vous pouvez traiter les commandes, gérer l'exécution et suivre l'état
        des expéditions.
      </p>
    </div>
  );
}
