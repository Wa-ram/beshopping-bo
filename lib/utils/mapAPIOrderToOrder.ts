import { APIOrder, Order } from "../types/order";

export const mapAPIOrderToOrder = (apiOrder: APIOrder): Order => ({
  id: apiOrder.id,
  orderNumber: apiOrder.reference,
  customerName: `${apiOrder.customer.firstname} ${apiOrder.customer.lastname}`,
  total: parseFloat(apiOrder.total_amount),
  notes: "",
  status: apiOrder.status,
  createdAt: new Date(apiOrder.created_at),
  totalItems:apiOrder.total_items,
  fulfillmentStatus: apiOrder.status as Order["fulfillmentStatus"],
  customerId: apiOrder.customer_id,
  subtotal: parseFloat(apiOrder.total_amount),
});
