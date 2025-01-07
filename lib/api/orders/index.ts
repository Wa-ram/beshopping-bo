import { OrdersResponse } from "@/lib/types/order";
import { api } from "..";

export const fetchOrders = async (
  page: number = 1
): Promise<OrdersResponse> => {
  const { data } = await api.get<OrdersResponse>(`/api/orders?page=${page}`);
  return data;
};
