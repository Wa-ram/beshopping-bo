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
