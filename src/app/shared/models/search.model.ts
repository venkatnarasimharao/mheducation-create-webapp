export interface SearchInterface {
  _id: string;
  title: string;
}

//accordion interface
export interface CheckboxItem {
  label: string;
  value: string;
}

export interface AccordionItem {
  id: string;
  header: string;
  collectionTypes: CheckboxItem[];
}

//pagination interface
export interface PaginationConfig {
  currentPage: number;
  totalPages: number;
  maxSize: number;
}
