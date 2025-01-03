import { api } from "..";

export const fetchCategories = async () => {
    const { data } = await api.get("api/categories"); // Remplacez par votre URL API
    return data;
  };