"use client";

import { Users } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Users className="h-10 w-10" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">Aucun client</h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-xl">
        Lorsque les clients effectuent leur premier achat, ils apparaissent ici.
        Vous pouvez consulter l'historique de leurs commandes, gérer leurs
        informations et suivre leur engagement.
      </p>
    </div>
  );
}
