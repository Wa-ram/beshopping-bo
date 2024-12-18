"use client"

import { useEffect } from "react"
import { useCollectionStore } from "@/lib/stores/collection-store"
import { CollectionTable } from "./collection-table"
import { EmptyState } from "./empty-state"
import { mockCollections } from "@/lib/mock/collections"

export function CollectionList() {
  const { collections, setCollections } = useCollectionStore()

  useEffect(() => {
    // Simulate API call
    const fetchCollections = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setCollections(mockCollections)
    }
    fetchCollections()
  }, [setCollections])

  if (collections.length === 0) {
    return <EmptyState />
  }

  return <CollectionTable collections={collections} />
}