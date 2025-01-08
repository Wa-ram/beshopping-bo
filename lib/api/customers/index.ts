import { CustomersResponse } from "@/lib/types/customer";
import { api } from "..";

export const fetchCustomers = async (
  page: number = 1
): Promise<CustomersResponse> => {
  const { data } = await api.get<CustomersResponse>(
    `/api/customers?page=${page}`
  );
  return data;
};
