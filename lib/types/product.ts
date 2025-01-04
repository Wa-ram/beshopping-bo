export interface Product {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'active' | 'archived';
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
  title: string;
  description: string;
  price: string;
  compare_at_price?: string;
  cost_per_item?: string;
  tax_applicable?: boolean;
  track_quantity?: boolean;
  quantity?: number;
  has_sku?: boolean;
  sku?: string;
  is_physical?: boolean;
  weight?: string;
  weight_unit?: string;
  status: "active" | "archived" | "draft";
  is_published: boolean;
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