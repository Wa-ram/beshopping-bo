export interface Product {
  id: string;
  title: string;
  description: string;
  status: "draft" | "active" | "archived";
  publishDate?: Date;
  media: string[];
  price: number;
  compareAtPrice?: number;
  costPerItem?: number;
  chargeTax: boolean;
  category: string;
  type: string;
  tags: string[];
  collections: string[];
  trackInventory: boolean;
  quantity?: number;
  sku?: string;
  weight?: number;
  isPhysicalProduct: boolean;
  variants: ProductVariant[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  sku?: string;
  quantity?: number;
  options: {
    name: string;
    value: string;
  }[];
}

export interface VariantOption {
  name: string;
  values: string[];
}

export interface VariantCombinationItem {
  name: string;
  value: string;
}

export interface VariantCombination {
  id: string;
  combination: VariantCombinationItem[];
  price: string;
  stock_quantity: string;
  sku: string;
}

//export interface VariantCombination {
//id: string;
//combination: Record<string, string>;
//  price: string;
//  available: string;
//  onHand: string;
//  sku: string;
//}

export interface ProductFormValues {
  name: string;
  description: string;
  price: string;
  comparison_price?: string;
  item_price?: string;
  is_taxed?: 1 | 0;
  is_tracking_quantity?: 1 | 0;
  stock_quantity?: number;
  has_sku?: 1 | 0;
  sku?: string;
  is_physical?: 1 | 0;
  weight?: string;
  weight_unit?: string;
  status: "active" | "archived" | "draft";
  is_published: 1 | 0;
  published_at?: string;
  category: string;
  //product_type: string;
  collections: string[];
  tags: string[];
  images: File[];
  //profit: number;
  variants: Array<{
    option: string;
    value: string;
    price: number;
    quantity: number;
  }>;
}
