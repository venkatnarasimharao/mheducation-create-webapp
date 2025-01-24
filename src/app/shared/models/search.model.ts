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

export interface SearchState {
  loading: boolean;
  result?: any;
  query: string;
  textType: string[];
  findable: boolean;
}
