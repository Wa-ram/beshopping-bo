export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: Date;
  notes?: string;
  status?: "active" | "inactive";
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  emailVerified: boolean;
}

export interface ContactAddress {
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

export interface APICustomer {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  email_verified: boolean;
  phone_number: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  total_orders: number;
  amount_spent: string | null;
  contact_address: ContactAddress;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export type CustomersResponse = PaginatedResponse<APICustomer>;
