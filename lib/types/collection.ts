export interface Collection {
  id: string;
  title: string;
  description: string;
  slug: string;
  status: "active" | "draft" | "archived";
  image: string | null;
  productsCount: number;
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
  id: string;
  name: string;
  description: string;
  slug: string;
  is_shown_in_store: boolean;
  created_at: string;
  updated_at: string;
  total_products: number;
  cover: string;
};

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

export type CollectionsResponse = PaginatedResponse<APICollection>;
