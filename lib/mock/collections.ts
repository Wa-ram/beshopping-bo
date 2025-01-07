import { Collection } from "@/lib/types/collection"

export const mockCollections: Collection[] = [
  {
    id: "1",
    title: "Summer Collection",
    description: "Fresh styles for the warm season",
    slug:'summer-collection',
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
    productsCount: 24,
    status: "active",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-03-15")
  },
  {
    id: "2",
    title: "New Arrivals",
    description: "Latest products in our catalog",
    slug:'new-arrivals',
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    productsCount: 12,
    status: "active",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-03-10")
  }
]