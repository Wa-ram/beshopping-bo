export interface APICategory {
    id: number;
    name: string;
    parent_id: number | null;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    children: APICategory[]; // Type récursif pour les enfants
  }
  