import { Suspense } from "react"
import { CampaignList } from "@/components/marketing/campaign-list"
import { CampaignHeader } from "@/components/marketing/campaign-header"
import { CampaignTableSkeleton } from "@/components/marketing/campaign-table-skeleton"

export default function MarketingPage() {
  return (
    <div className="flex flex-col gap-6">
      <CampaignHeader />
      <Suspense fallback={<CampaignTableSkeleton />}>
        <CampaignList />
      </Suspense>
    </div>
  )
}