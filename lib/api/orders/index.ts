import { APIOrder } from "@/lib/types/order";
import { api } from "..";

export const fetchOrders = async () => {
  const { data } = await api.get<APIOrder[]>("api/orders"); 
  return data;
};