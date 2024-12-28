export const mockDiscounts = [
  {
    id: "1",
    code: "SUMMER24",
    type: "Percentage",
    value: "20%",
    status: "active",
    usageLimit: 1000,
    usageCount: 234,
    startDate: "2024-06-01",
    endDate: "2024-06-30",
  },
  {
    id: "2",
    code: "FREESHIP",
    type: "Fixed Amount",
    value: "$10",
    status: "scheduled",
    usageLimit: 500,
    usageCount: 0,
    startDate: "2024-07-01",
    endDate: "2024-07-15",
  },
];
