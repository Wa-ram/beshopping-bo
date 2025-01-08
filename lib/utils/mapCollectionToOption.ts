import { APICollection } from "../types/collection";

export const mapCollectionToOption = (collection: APICollection) => ({
  label: collection.name,
  value: collection.id,
});
