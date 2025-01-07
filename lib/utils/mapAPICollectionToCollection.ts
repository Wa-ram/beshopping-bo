import { APICollection, Collection } from "../types/collection";

export const mapAPICollectionToCollection = (apiCollection: APICollection): Collection => ({
    id: apiCollection.id,
    title: apiCollection.name,
    description: apiCollection.description,
    slug: apiCollection.slug,
    status: apiCollection.is_shown_in_store ? 'active' : 'draft',
    image: apiCollection.cover || null,
    productsCount: apiCollection.total_products, 
    updatedAt: new Date(apiCollection.updated_at),
    createdAt: new Date(apiCollection.created_at)
  });