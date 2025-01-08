import {
  CollectionsResponse,
  ProductCollectionsResponse,
} from "@/lib/types/collection";
import { api } from "..";

export const fetchCollections = async (
  page: number = 1
): Promise<CollectionsResponse> => {
  const { data } = await api.get<CollectionsResponse>(
    `/api/collections?page=${page}`
  );
  return data;
};

export const getProductCollections =
  async (): Promise<ProductCollectionsResponse> => {
    const { data } = await api.get<ProductCollectionsResponse>(
      "/api/product-collections"
    );
    return data;
  };

export async function addCollection(formData: FormData) {
  // : Promise<AuthResponse>
  const response = await api.post("api/collections", formData);
  return response.data;
}
