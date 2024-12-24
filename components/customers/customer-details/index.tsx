"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useCustomerStore } from "@/lib/stores/customer-store";
import { Customer } from "@/lib/types/customer";
import { CustomerInfo } from "./customer-info";
import { CustomerStats } from "./customer-stats";
import { CustomerTabs } from "./customer-tabs";

export function CustomerDetails() {
  const router = useRouter();
  const params = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const { customers } = useCustomerStore();

  useEffect(() => {
    // Simulate API call
    const fetchCustomer = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const found = customers.find((c) => c.id === params.id);
      setCustomer(found || null);
    };
    fetchCustomer();
  }, [customers, params.id]);

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6 w-10/12 mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {/* Back */}
        </Button>
        <div>
          <h1 className="text-2xl font-bold">
            {customer.firstName} {customer.lastName}
          </h1>
          <p>
            {customer.address &&
              `${customer.address.city}, ${customer.address.street}`}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <CustomerInfo customer={customer} />
        {/* <CustomerStats customer={customer} /> */}
      </div>

      {/* <CustomerTabs customer={customer} /> */}
    </div>
  );
}
