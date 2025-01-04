import { ProductFormValues } from "@/lib/types/product";
import { api } from "..";

export async function addProduct(formData: FormData) {
  // : Promise<AuthResponse>
  const response = await api.post("api/products", formData);
  return response.data;
}
