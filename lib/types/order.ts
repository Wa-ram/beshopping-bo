export type OrderStatus =
  | "pending"
  | "processing"
  | "fulfilled"
  | "cancelled"
  | "refunded";
export type PaymentStatus = "paid" | "pending" | "failed" | "refunded";
export type FulfillmentStatus =
  | "unfulfilled"
  | "partially_fulfilled"
  | "fulfilled"
  | "cancelled";

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  title: string;
  sku?: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface ShippingDetails {
  carrier: string;
  trackingNumber?: string;
  trackingUrl?: string;
  shippingMethod: string;
  shippingCost: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerEmail?: string;
  customerName: string;
  status: string;
  paymentStatus?: PaymentStatus;
  fulfillmentStatus?: FulfillmentStatus;
  items?: OrderItem[];
  totalItems: number;
  subtotal: number;
  shippingCost?: number;
  tax?: number;
  total: number;
  shippingAddress?: ShippingAddress;
  shippingDetails?: ShippingDetails;
  notes?: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface APIOrder {
  id: string;
  customer_id: string;
  customer_type: string;
  reference: string;
  status: string;
  total_amount: string;
  created_at: string;
  total_items: number;
  customer: {
    id: string;
    firstname: string;
    lastname: string;
  };
}
