import { APIProduct, Product } from "../types/product";

export const mapAPIProductToProduct = (apiProduct: APIProduct) : Product=> ({
  id: apiProduct.id,
  title: apiProduct.name,
  description: apiProduct.description,
  status: apiProduct.status as "draft" | "active" | "archived",
  merchant_id: apiProduct.merchant_id,
  slug: apiProduct.slug,
  main_image_url: apiProduct.main_image_url,
  publishDate: apiProduct.published_at,
  // price: parseFloat(apiProduct.price),
  // compareAtPrice: apiProduct.comparison_price
  //   ? parseFloat(apiProduct.comparison_price)
  //   : undefined,
  // costPerItem: apiProduct.item_price
  //   ? parseFloat(apiProduct.item_price)
  //   : undefined,
  // chargeTax: apiProduct.is_taxed,
  category_id: apiProduct.category_id,
  // trackInventory: apiProduct.is_tracking_quantity,
  quantity: apiProduct.stock_quantity,
  // sku: apiProduct.sku,
  tags: [],
  // weight: apiProduct.weight ? parseFloat(apiProduct.weight) : undefined,
  isPhysicalProduct: apiProduct.is_physical,
  // is_taxed: apiProduct.is_taxed,
  // weight_unit: apiProduct.weight_unit,
  is_published: apiProduct.is_published,
  // deleted_at: apiProduct.deleted_at,
  created_at: apiProduct.created_at,
  updated_at: apiProduct.updated_at,
  category: apiProduct.category,
});
