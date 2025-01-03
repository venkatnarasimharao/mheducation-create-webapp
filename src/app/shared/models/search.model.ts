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
