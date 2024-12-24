"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Filter, Download, Trash2 } from "lucide-react"
import { useCollectionStore } from "@/lib/stores/collection-store"
import { useRouter } from "next/navigation"

export function CollectionHeader() {
  const router = useRouter()
  const selectedCollections = useCollectionStore((state) => state.selectedCollections)
  const deleteCollections = useCollectionStore((state) => state.deleteCollections)
  const clearSelection = useCollectionStore((state) => state.clearSelection)

  const handleDelete = () => {
    deleteCollections(selectedCollections)
    clearSelection()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Collections</h1>
        <div className="flex items-center gap-2">
          {selectedCollections.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button
            variant="outline"
            size="sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button
            size="sm"
            onClick={() => router.push("/dashboard/products/collections/add-new")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Collection
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search collections..."
          className="max-w-sm"
        />
      </div>
    </div>
  )
}