"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockCampaigns } from "@/lib/mock/campaign";

export function CampaignList() {
  const [campaigns] = useState(mockCampaigns);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Spent</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell className="font-medium">{campaign.name}</TableCell>
              <TableCell>{campaign.type}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    campaign.status === "active" ? "default" : "secondary"
                  }
                >
                  {campaign.status}
                </Badge>
              </TableCell>
              <TableCell>
                {campaign.startDate} - {campaign.endDate}
              </TableCell>
              <TableCell>{campaign.budget}</TableCell>
              <TableCell>{campaign.spent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
