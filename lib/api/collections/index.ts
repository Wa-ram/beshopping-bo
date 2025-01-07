import { api } from "..";

export const fetchCollections = async () => {
  const { data } = await api.get("api/collections");
  return data;
};

export async function addCollection(formData: FormData) {
  // : Promise<AuthResponse>
  const response = await api.post("api/collections", formData);
  return response.data;
}