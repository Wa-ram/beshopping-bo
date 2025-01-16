import { Product } from "@/lib/types/product";

export const mockProducts: Product[] = [
  {
    id: "1",
    title: "Classic White T-Shirt",
    description: "A comfortable cotton t-shirt perfect for everyday wear.",
    merchant_id: "enioje6468-aesde5-e54edsdf", slug: "classic-white-t-shirt", main_image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", category: { id: "ds54d-sds51sd-ds54dzs", name: "Téléphone" },
    status: "active",
    media: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"],
    price: 29.99,
    compareAtPrice: 39.99,
    costPerItem: 10,
    chargeTax: true,
    category_id: "Apparel",
    // type: "T-Shirt",
    tags: ["cotton", "basics", "summer"],
    collections: ["Summer Essentials"],
    trackInventory: true,
    quantity: 100,
    sku: "WT001",
    weight: 0.2,
    isPhysicalProduct: true,
    variants: [
      {
        id: "1-1",
        title: "Small / White",
        price: 29.99,
        sku: "WT001-S-W",
        quantity: 30,
        options: [
          { name: "Size", value: "Small" },
          { name: "Color", value: "White" },
        ],
      },
    ],
    is_taxed: true,
    weight_unit: "kg",
    is_published: true,
    deleted_at: String(Date.now()),
    created_at: String(Date.now()),
    updated_at: String(Date.now()),
    // seo: {
    //   title: "Classic White T-Shirt | Your Brand",
    //   description: "Premium cotton t-shirt for everyday comfort",
    //   keywords: ["t-shirt", "cotton", "basics"],
    // },
  },
  // Add more mock products as needed
];
