"use client"

import { FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function EmptyState() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <FolderOpen className="h-10 w-10" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">No collections yet</h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        Create collections to organize your products and make them easier to discover.
        You can create collections manually or automatically based on conditions.
      </p>
      <Button
        onClick={() => router.push("/products/collections/new")}
        className="mt-6"
      >
        Create Your First Collection
      </Button>
    </div>
  )
}