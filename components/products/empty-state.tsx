import { Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function EmptyState() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Package className="h-10 w-10" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">No products found</h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        Get started by creating your first product. You can add details, set pricing,
        and manage inventory all in one place.
      </p>
      <Button
        onClick={() => router.push("/products/new")}
        className="mt-6"
      >
        Add Your First Product
      </Button>
    </div>
  )
}