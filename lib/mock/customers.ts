import { Customer } from '@/lib/types/customer'

export const mockCustomers: Customer[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    totalOrders: 15,
    totalSpent: 2499.99,
    lastOrderDate: new Date('2024-03-15'),
    notes: 'Prefers eco-friendly products',
    status: 'active',
    tags: ['vip', 'repeat-customer'],
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA'
    },
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-03-15')
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    totalOrders: 8,
    totalSpent: 1299.99,
    lastOrderDate: new Date('2024-03-10'),
    status: 'active',
    tags: ['new-customer'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-03-10')
  }
]