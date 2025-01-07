import { APIOrder, Order } from "../types/order";

export const mapAPIOrderToOrder = (apiOrder: APIOrder): Order => ({
  id: apiOrder.id,
  orderNumber: apiOrder.reference,
  customerId: apiOrder.customer_id,
  customerName: `${apiOrder.customer.firstname} ${apiOrder.customer.lastname}`,
  status: apiOrder.status,
  totalItems: apiOrder.total_items,
  total: parseFloat(apiOrder.total_amount),
  notes: "",
  createdAt: new Date(apiOrder.created_at),
  // fulfillmentStatus: apiOrder.status as Order["fulfillmentStatus"],
  subtotal: parseFloat(apiOrder.total_amount),
});
