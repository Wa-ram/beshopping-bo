import { Order } from "@/lib/types/order"

export const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "#1001",
    customerId: "1",
    customerEmail: "john.doe@example.com",
    customerName: "John Doe",
    status: "pending",
    paymentStatus: "paid",
    fulfillmentStatus: "unfulfilled",
    items: [
      {
        id: "1",
        productId: "1",
        title: "Classic White T-Shirt",
        sku: "WT001",
        quantity: 2,
        price: 29.99,
        totalPrice: 59.98
      }
    ],
    subtotal: 59.98,
    shippingCost: 5.99,
    tax: 6.00,
    total: 71.97,
    shippingAddress: {
      firstName: "John",
      lastName: "Doe",
      address1: "123 Main St",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "USA",
      phone: "+1 (555) 123-4567"
    },
    tags: ["new"],
    createdAt: new Date("2024-03-20"),
    updatedAt: new Date("2024-03-20")
  },
  {
    id: "2",
    orderNumber: "#1002",
    customerId: "2",
    customerEmail: "jane.smith@example.com",
    customerName: "Jane Smith",
    status: "processing",
    paymentStatus: "paid",
    fulfillmentStatus: "partially_fulfilled",
    items: [
      {
        id: "2",
        productId: "2",
        title: "Premium Denim Jeans",
        sku: "DJ001",
        quantity: 1,
        price: 89.99,
        totalPrice: 89.99
      }
    ],
    subtotal: 89.99,
    shippingCost: 7.99,
    tax: 9.00,
    total: 106.98,
    shippingAddress: {
      firstName: "Jane",
      lastName: "Smith",
      address1: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      postalCode: "90001",
      country: "USA",
      phone: "+1 (555) 987-6543"
    },
    tags: ["priority"],
    createdAt: new Date("2024-03-19"),
    updatedAt: new Date("2024-03-20")
  }
]