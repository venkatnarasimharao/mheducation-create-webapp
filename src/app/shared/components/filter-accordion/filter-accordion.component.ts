import { Component, inject, Input, SimpleChanges, OnInit } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { USER_SEARCH_CONFIG } from '../../constants/search-payload.config';
import { ApiService } from '../../../core/services/api/api.service';
import { SearchService } from '../../../core/services/search/search.service';
import { PayloadService } from '../../../core/services/payload/payload.service';

@Component({
  selector: 'hec-filter-accordion',
  standalone: true,
  imports: [NgbAccordionModule, TranslateModule, CommonModule],
  templateUrl: './filter-accordion.component.html',
  styleUrls: ['./filter-accordion.component.scss']
})
export class FilterAccordionComponent implements OnInit {
  translate: TranslateService = inject(TranslateService);
  private apiService = inject(ApiService);
  private searchService = inject(SearchService);
  private payloadService = inject(PayloadService);

  @Input() collectionfilterData: any[] = [];
  selectedCheckboxes: { [header: string]: number } = {};
  facetsData: any[] = [];


  searchPayload: { query: string; textType: string[]; findable: boolean } | undefined;

  ngOnInit(): void {
    this.searchService.searchResults.subscribe((state) => {
      this.searchPayload = {
        query: state.query,
        textType: state.textType,
        findable: state.findable
      };
  
      // Call the function to sync facets with the API response
      this.syncFacetsWithApiResponse(state.result?.['s:facets']?.['s:facet'] || []);
    });
  
    // Initialize selection states from payload
    this.syncSelectionStatesFromPayload();
    console.log(this.collectionfilterData, 'Collection data');
  }
  
  // New method to sync facets with the API response
  private syncFacetsWithApiResponse(apiFacets: any[]): void { 
    // Clear existing data for all collection filter lists
    this.collectionfilterData.forEach((list) => {
        if (list.collectionTypes) {
            list.collectionTypes = list.collectionTypes.map((item:any) => ({
                ...item,
                selected: false,
                count: 0
            }));  
        }
    });

    // Sync with new API response
    this.collectionfilterData.forEach((list) => { 
        const currentPayload = this.payloadService.getPayload() || USER_SEARCH_CONFIG; 
        const normalizedHeader = this.normalizeHeader(list.header); 
   
        const payloadFacet = currentPayload.search.facets.facet.find( 
            (f: any) => this.normalizeHeader(f._label) === normalizedHeader 
        ); 
   
        if (payloadFacet && list.collectionTypes) { 
            const payloadItems = Array.isArray(payloadFacet.item) 
                ? payloadFacet.item 
                : [payloadFacet.item]; 
   
            const apiFacetValues = apiFacets 
                .find((facet: any) => this.normalizeHeader(facet.name) === normalizedHeader) 
                ?.['s:facet-value'] || []; 
   
            list.collectionTypes.forEach((item: any) => { 
                const payloadItem = payloadItems.find( 
                    (pi: any) => pi._label === item.label || pi._value === item.value 
                ); 
   
                if (payloadItem) { 
                    item.selected = payloadItem._selected; 
   
                    // Find matching facet value 
                    const matchingFacetValue = apiFacetValues.find( 
                        (facetValue: any) => 
                            facetValue.name === payloadItem._value || facetValue.name === payloadItem._label 
                    ); 
   
                    if (matchingFacetValue) { 
                        item.count = matchingFacetValue.count; // Update count 
                    }  
                }  
            }); 
        } 
    }); 
}
  
  private normalizeHeader(header: string): string {
    const headerMap: { [key: string]: string } = {
      "Content Type": "ContentType",
      "Copyright Year": "CopyrightYear",
      "Trim Size": "TrimSize",
    };
  
    return headerMap[header] || header.replace(/\s+/g, '');
  }
  
  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['collectionfilterData']) {
      this.syncSelectionStatesFromPayload();
      this.updateSelectedCounts();
    }
    console.log('Recieved Collections-', this.collectionfilterData)
    
  }

  // New method to sync selection states from payload
  private syncSelectionStatesFromPayload(): void {
    const currentPayload = this.payloadService.getPayload() || USER_SEARCH_CONFIG;
   
    
    this.collectionfilterData.forEach(list => {
      const payloadFacet = currentPayload.search.facets.facet.find((f: any) => f._label === list.header);
      if (payloadFacet && list.collectionTypes) {
        const payloadItems = Array.isArray(payloadFacet.item) ? payloadFacet.item : [payloadFacet.item];
        
        list.collectionTypes.forEach((item: any) => {
          const payloadItem = payloadItems.find((pi: any) => 
            pi._label === item.label || pi._value === item.value
          );
          console.log('Item:', item);
          console.log('Payload Item:', payloadItem);
          if (payloadItem) {
            item.selected = payloadItem._selected;
          }
        });
      }
    });
  }

  updateSelectedCounts(): void {
    this.selectedCheckboxes = {};
    for (const list of this.collectionfilterData) {
      const checkedCount = list.collectionTypes?.filter(
        (item: any) => item.selected === 'true' || item.selected === true
      ).length || 0;
      this.selectedCheckboxes[list.header] = checkedCount;
    }

  }

  isItemSelected(item: any): boolean {
    return item.selected === 'true' || item.selected === true;
  }

  onCheckBoxChange(event: Event, item: any, header: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;

  // If unchecking, ensure at least one checkbox remains selected for "Content Type"
  if (!isChecked && header === 'Content Type') {
    const list = this.collectionfilterData.find((list) => list.header === header);
    const otherSelectedItems = list?.collectionTypes.filter(
      (listItem: any) =>
        listItem.selected === 'true' ||
        listItem.selected === true
    );

    // If it's the only selected checkbox, prevent unchecking
    if (otherSelectedItems?.length === 1) {
      (event.target as HTMLInputElement).checked = true; // Revert the checkbox state
      return; // Exit without further processing
    }
  }
  
    // Update the item's selected state as a string to match payload format
    item.selected = isChecked ? 'true' : 'false';
  
    if (!this.selectedCheckboxes[header]) {
      this.selectedCheckboxes[header] = 0;
    }
    this.selectedCheckboxes[header] += isChecked ? 1 : -1;
  
    let finalPayload = this.payloadService.getPayload() || JSON.parse(JSON.stringify(USER_SEARCH_CONFIG));
    console.log('Initial Payload filters:', finalPayload); 
  
    // Find the correct facet in the payload
    const facet = finalPayload.search.facets.facet.find((f: any) => f._label === header);
    console.log('Facet:', facet);
  
    if (facet) {
      // Ensure item is an array
      const items = Array.isArray(facet.item) ? facet.item : [facet.item];
  
      if (header === 'Copyright Year') {
        if (item.label === 'Prior to 2012') {
          // Remove "Prior to 2012" entry
          const index = items.findIndex((facetItem: any) => facetItem._label === 'Prior to 2012');
          if (index > -1) {
            items.splice(index, 1);
          }
  
          // Add years from 1900 to 2011
          if (isChecked) {
            for (let year = 1901; year <= 2011; year++) {
              if (!items.find((facetItem: any) => facetItem._value === year.toString())) {
                items.push({
                  _label: year.toString(),
                  _selected: 'true',
                  _value: year.toString(),
                });
              }
            }
          } else {
            // If unchecked, remove years 1900 to 2011
            for (let year = 1901; year <= 2011; year++) {
              const yearIndex = items.findIndex((facetItem: any) => facetItem._value === year.toString());
              if (yearIndex > -1) {
                items.splice(yearIndex, 1);
              }
            }
          }
        } else {
          // For individual years, update the value to the year and update selected state
          const matchingItem = items.find((facetItem: any) =>
            facetItem._label === item.label || facetItem._value === item.value
          );
  
          if (matchingItem) {
            matchingItem._value = item.label; // Update value to year only
            matchingItem._selected = isChecked ? 'true' : 'false';
          }
        }
      } else {
        // For other headers, update the selected state
        items.forEach((facetItem: any) => {
          if (facetItem._label === item.label || facetItem._value === item.value) {
            facetItem._selected = isChecked ? 'true' : 'false';
          }
        });
      }
    }
  
    // Pass the current search state
    if (this.searchPayload) {
      finalPayload.search.query = this.searchPayload.query;
      finalPayload.search.textTypes.textType = this.searchPayload.textType;
      finalPayload.search.findable = this.searchPayload.findable;
    }
  
    // Use updatePayload to merge changes
    console.log('final payload filters-', finalPayload);
    this.payloadService.updatePayload(finalPayload);
    
    //to start the loader
    this.searchService.startSearch();
  
    // Make the API call
    this.apiService.getSearchListing(finalPayload).subscribe({
      next: (response) => {
        if (response.ok) {
          console.log('API Response:', JSON.parse(response.body));
          this.searchService.updateSearchResult(response.body);
        } 
      },
      error: (err) => {
        console.error('API Error:', err);
      }
    });
  }
}
