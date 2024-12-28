"use client";

import { useState } from "react";
import { Suspense } from "react";
import { DateRangeFilter } from "@/components/finance/date-range-filter";
import { SalesMetrics } from "@/components/finance/sales-metrics";
import { EarningsChart } from "@/components/finance/earnings-chart";
import { BillingCard } from "@/components/finance/billing-card";
import { PayoutAccount } from "@/components/finance/payout-account";
import { TransactionList } from "@/components/finance/transaction-list";
import { TransactionTableSkeleton } from "@/components/finance/transaction-table-skeleton";

export default function FinancePage() {
  const [selectedRange, setSelectedRange] = useState("30");

  const handleRangeChange = (range: string) => {
    setSelectedRange(range);
    // Add logic to fetch data for the selected range
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Finance</h1>
        <DateRangeFilter
          onRangeChange={handleRangeChange}
          selectedRange={selectedRange}
        />
      </div>

      <SalesMetrics netSales={95000} grossProfit={42000} grossMargin={44.2} />

      <div className="grid gap-6 md:grid-cols-2">
        <EarningsChart />
        <div className="space-y-6">
          {/* <BillingCard /> */}
          <PayoutAccount />
        </div>
      </div>

      {/* <Suspense fallback={<TransactionTableSkeleton />}>
        <TransactionList />
      </Suspense> */}
    </div>
  );
}
