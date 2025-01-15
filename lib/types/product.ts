export interface VariantCombination {
  name: string; // Nom de l'option (exemple : "Color")
  value: string; // Valeur de l'option (exemple : "Red")
}

export interface Variant {
  id: string; // Identifiant unique de la variante
  combinations: VariantCombination[]; // Liste des combinaisons (options et valeurs)
  price: string; // Prix de la variante au format chaîne
  stock_quantity: string; // Quantité de stock au format chaîne
  sku: string; // SKU de la variante
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
  combinations: VariantCombinationItem[];
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
  // is_taxed?: 1 | 0;
  is_tracking_quantity?: 1 | 0;
  stock_quantity?: number;
  has_sku?: 1 | 0;
  sku?: string;
  is_physical?: 1 | 0;
  weight_value?: string;
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
  variants: Variant[];
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

export interface APIProduct {
  id: string;
  category_id: string;
  name: string;
  description: string;
  sku: string;
  price: string;
  comparison_price: string;
  item_price: string;
  benefit: string | null;
  is_taxed: boolean;
  is_physical: boolean;
  weight: string;
  slug: string;
  weight_unit: string;
  stock_quantity: number;
  is_tracking_quantity: boolean;
  status: string;
  tax_percentage: string;
  is_published: boolean;
  published_at: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  low_stock_threshold: number;
  main_image_url: string;
  media: Array<{
    id: number;
    original_url: string;
  }>;
}

export interface Product {
  id: string;
  category_id: string;
  title: string;
  description: string;
  sku?: string;
  price: number;
  chargeTax: boolean;
  status: "draft" | "active" | "archived";
  compareAtPrice?: number;
  costPerItem?: number;
  is_taxed?: boolean;
  isPhysicalProduct: boolean;
  weight?: number;
  weight_unit: string;
  quantity?: number;
  trackInventory: boolean;
  is_published: boolean;
  publishDate?: Date;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  media: string[];
  // category: string;
  // type: string;
  tags: string[];
  collections?: string[];
  variants?: ProductVariant[];
  // seo: {
  //   title: string;
  //   description: string;
  //   keywords: string[];
  // };
}

export type ProductsResponse = PaginatedResponse<APIProduct>;
