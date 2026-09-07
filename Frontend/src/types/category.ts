export interface Category {
  _id: string;
  name: string;
  parentId?: string | { _id: string } | null;
}
