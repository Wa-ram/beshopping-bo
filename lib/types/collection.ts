export interface Collection {
  id: string;
  title: string;
  description?: string;
  image?: string;
  productsCount: number;
  status: "active" | "draft" | "archived";
  conditions?: CollectionCondition[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CollectionCondition {
  field: string;
  operator: "equals" | "not_equals" | "greater_than" | "less_than" | "contains";
  value: string | number;
}

export interface CollectionFormValues {
  name: string;
  description: string;
  is_published: 1 | 0;
  published_at?: string;
  is_shown_in_store: 1 | 0;
  images: File[];
}

export type APICollection = {
  id: number;
  name: string;
  description: string | null;
  slug: string | null;
  created_at: string;
  updated_at: string;
};
