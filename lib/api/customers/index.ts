// import { APICustomer } from "@/lib/types/customer";
import { api } from "..";

export const fetchCustomers = async () => {
  const { data } = await api.get(
    // <APICustomer[]>
    "api/customers"
  );
  return data;
};
