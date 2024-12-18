"use client"

import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useCollectionStore } from "@/lib/stores/collection-store"
import { Collection } from "@/lib/types/collection"

interface CollectionTableProps {
  collections: Collection[]
}

export function CollectionTable({ collections }: CollectionTableProps) {
  const router = useRouter()
  const { selectedCollections, toggleCollectionSelection } = useCollectionStore()

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead>Collection</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {collections.map((collection) => (
            <TableRow
              key={collection.id}
              className="cursor-pointer"
              onClick={() => router.push(`/products/collections/${collection.id}`)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedCollections.includes(collection.id)}
                  onCheckedChange={() => toggleCollectionSelection(collection.id)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  {collection.image && (
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  )}
                  <div>
                    <div className="font-medium">{collection.title}</div>
                    {collection.description && (
                      <div className="text-sm text-muted-foreground">
                        {collection.description}
                      </div>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>{collection.productsCount} products</TableCell>
              <TableCell>
                <Badge
                  variant={
                    collection.status === "active"
                      ? "default"
                      : collection.status === "draft"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {collection.status}
                </Badge>
              </TableCell>
              <TableCell>
                {collection.updatedAt.toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}