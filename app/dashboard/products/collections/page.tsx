import { Suspense } from "react"
import { CollectionList } from "@/components/collections/collection-list"
import { CollectionHeader } from "@/components/collections/collection-header"
import { CollectionTableSkeleton } from "@/components/collections/collection-table-skeleton"

export default function CollectionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <CollectionHeader />
      <Suspense fallback={<CollectionTableSkeleton />}>
        <CollectionList />
      </Suspense>
    </div>
  )
}