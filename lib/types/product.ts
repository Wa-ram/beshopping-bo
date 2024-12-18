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