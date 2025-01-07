import { APICustomer, Customer } from "../types/customer";

export const mapAPICustomerToCustomer = (
  apiCustomer: APICustomer
): Customer => ({
  id: apiCustomer.id,
  firstName: apiCustomer.firstname,
  lastName: apiCustomer.lastname,
  email: apiCustomer.email,
  phone: apiCustomer.phone_number,
  notes: "",
  totalOrders: apiCustomer.total_orders,
  totalSpent: apiCustomer.amount_spent
    ? parseFloat(apiCustomer.amount_spent)
    : 0,
  status: apiCustomer.deleted_at ? "inactive" : "active",
  address: apiCustomer.contact_address
    ? {
        street: apiCustomer.contact_address.street,
        city: apiCustomer.contact_address.city,
        state: apiCustomer.contact_address.state,
        postalCode: apiCustomer.contact_address.zip_code,
        country: apiCustomer.contact_address.country,
      }
    : undefined,
  createdAt: new Date(apiCustomer.created_at),
  updatedAt: new Date(apiCustomer.updated_at),
  emailVerified: apiCustomer.email_verified,
  //   deletedAt: apiCustomer.deleted_at? new Date(apiCustomer.deleted_at) : undefined,
});
