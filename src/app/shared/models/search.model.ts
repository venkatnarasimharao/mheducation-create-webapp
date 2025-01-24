export interface SearchInterface {
    _id: string;
    title: string;
}

export interface Collection {
  code: string;
  name: string;
  image: string;
  category: string;
}

export interface GroupedCollection {
  category: string;
  collections: Collection[];
}

export interface SearchCollectionInterface {
  code?: string;
  image: string;
  name?: string;
}

export interface ApiEntry {
  _type: string;
  _title?: string;
  _pagecount?: string;
  _author?: string;
  _computedtitle?: string;
  _computedtocnumber?: string;
  entry?: ApiEntry[];
}

export interface ProjectItem {
  guid: string;
  name: string;
  pages: number;
  price: string;
  checked: boolean;
  disableUp: boolean;
  disableDown: boolean;
  type: string;
  subType: string;
  targetContainer?: string;
  hasTeachingNotes?: boolean | string;
  isTeachingNote?: boolean | string;
  title?: string;
  entry?: any;
  children?: ProjectItem[];
  parent?: string;
}

export interface Section {
  id: string;
  title: string;
  selectAllChecked: boolean;
  items: ProjectItem[];
}

export interface PricingData {
  [key: string]: string; 
}