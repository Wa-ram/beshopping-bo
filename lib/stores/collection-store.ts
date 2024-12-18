"use client"

import { create } from 'zustand'
import { Collection } from '@/lib/types/collection'

interface CollectionStore {
  collections: Collection[];
  selectedCollections: string[];
  setCollections: (collections: Collection[]) => void;
  addCollection: (collection: Collection) => void;
  updateCollection: (id: string, collection: Partial<Collection>) => void;
  deleteCollections: (ids: string[]) => void;
  toggleCollectionSelection: (id: string) => void;
  clearSelection: () => void;
}

export const useCollectionStore = create<CollectionStore>((set) => ({
  collections: [],
  selectedCollections: [],
  setCollections: (collections) => set({ collections }),
  addCollection: (collection) => 
    set((state) => ({ collections: [...state.collections, collection] })),
  updateCollection: (id, updatedCollection) =>
    set((state) => ({
      collections: state.collections.map((collection) =>
        collection.id === id ? { ...collection, ...updatedCollection } : collection
      ),
    })),
  deleteCollections: (ids) =>
    set((state) => ({
      collections: state.collections.filter((collection) => !ids.includes(collection.id)),
      selectedCollections: state.selectedCollections.filter((id) => !ids.includes(id)),
    })),
  toggleCollectionSelection: (id) =>
    set((state) => ({
      selectedCollections: state.selectedCollections.includes(id)
        ? state.selectedCollections.filter((collectionId) => collectionId !== id)
        : [...state.selectedCollections, id],
    })),
  clearSelection: () => set({ selectedCollections: [] }),
}))