"use client";

// import { useEffect } from "react";
// import { useCustomerStore } from "@/lib/stores/customer-store";
import { CustomerTable } from "./customer-table";
import { EmptyState } from "./empty-state";
// import { mockCustomers } from "@/lib/mock/customers";
import { useCustomers } from "@/hooks/use-customers";

export function CustomerList() {
  const { data: customers = [], isLoading, error } = useCustomers();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading customers</div>;
  }

  if (customers.length === 0) {
    return <EmptyState />;
  }

  return <CustomerTable customers={customers} />;
}
