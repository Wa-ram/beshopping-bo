import { api } from "..";

export const fetchCollections = async () => {
    const { data } = await api.get("api/collections"); // Remplacez par votre URL API
    return data;
  };