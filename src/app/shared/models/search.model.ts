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

// interface Collection {
//   code: string;
//   name: string;
//   image: string;
// }

export interface GroupedCollection {
  category: string;
  collections: Collection[];
}

export interface InputCollection {
  collectionCode?: string;
  name: string;
  image: string;
}
