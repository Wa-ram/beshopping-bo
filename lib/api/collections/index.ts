import { api } from "..";

export const fetchCollections = async () => {
  const { data } = await api.get("api/collections"); // Remplacez par votre URL API
  return data;
};

export async function addCollection(formData: FormData) {
  // : Promise<AuthResponse>
  const response = await api.post("api/collections", formData);
  return response.data;
}