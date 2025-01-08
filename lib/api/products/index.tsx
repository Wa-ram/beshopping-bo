import { ProductsResponse } from "@/lib/types/product";
import { api } from "..";

export async function addProduct(formData: FormData) {
  // : Promise<AuthResponse>
  const response = await api.post("api/products", formData);
  return response.data;
}

export const getProducts = async (
  page: number = 1
): Promise<ProductsResponse> => {
  const { data } = await api.get<ProductsResponse>(
    `/api/products?page=${page}`
  );
  return data;
};
