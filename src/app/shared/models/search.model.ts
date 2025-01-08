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