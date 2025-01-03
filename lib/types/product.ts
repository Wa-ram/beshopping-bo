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
  status: 'active' | 'archived' | 'draft';
  publication: {
    type: 'instant' | 'scheduled';
    date?: string;
  };
  category: string;
  productType: string;
  collections: string[];
  tags: string[];
  title: string;
  description: string;
  images: string[];
  price: number;
  compareAtPrice?: number | null;
  taxApplicable: boolean;
  costPerItem: number;
  profit: number;
  trackQuantity: boolean;
  quantity: number;
  hasSKU: boolean;
  sku?: string;
  isPhysical: boolean;
  weight?: number | null;
  weightUnit?: string;
  variants: Array<{
    id: string;
    combination: Record<string, string>;
    price: string;
    available: string;
    onHand: string;
    sku: string;
  }>;
}