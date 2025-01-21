// import { Component, inject, Input, SimpleChanges, OnInit } from '@angular/core';
// import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
// import { TranslateModule, TranslateService } from '@ngx-translate/core';
// import { CommonModule } from '@angular/common';
// import { USER_SEARCH_CONFIG } from '../../constants/search-payload.config';
// import { ApiService } from '../../../core/services/api/api.service';
// import { SearchService } from '../../../core/services/search/search.service';
// import { PayloadService } from '../../../core/services/payload/payload.service'; 

// @Component({
//   selector: 'hec-filter-accordion',
//   standalone: true,
//   imports: [NgbAccordionModule, TranslateModule, CommonModule],
//   templateUrl: './filter-accordion.component.html',
//   styleUrls: ['./filter-accordion.component.scss']
// })
// export class FilterAccordionComponent implements OnInit {
//   translate: TranslateService = inject(TranslateService);
//   private apiService = inject(ApiService);
//   private searchService = inject(SearchService);
//   private payloadService = inject(PayloadService); // Inject the payload service

//   @Input() collectionfilterData: any[] = [];
//   selectedCheckboxes: { [header: string]: number } = {};

//   searchPayload: { query: string; textType: string[]; findable: boolean } | undefined;

//   ngOnInit(): void {
//     this.searchService.searchResults.subscribe((state) => {
//       this.searchPayload = {
//         query: state.query,
//         textType: state.textType,
//         findable: state.findable
//       };
//       console.log('Received searchPayload:', this.searchPayload);
//     });
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['collectionfilterData']) {
//       this.updateSelectedCounts();
//       console.log('FilterAccordionComponent OnChanges:', changes['collectionfilterData'].currentValue);
//     }
//   }

//   updateSelectedCounts(): void {
//     this.selectedCheckboxes = {};
//     for (const list of this.collectionfilterData) {
//       const checkedCount = list.collectionTypes?.filter(
//         (item: any) => item.selected === 'true' || item.selected === true
//       ).length || 0;
//       this.selectedCheckboxes[list.header] = checkedCount;
//     }
//   }

//   onCheckBoxChange(event: Event, item: any, header: string): void {
//     const isChecked = (event.target as HTMLInputElement).checked;
//     item.selected = isChecked;

//     if (!this.selectedCheckboxes[header]) {
//       this.selectedCheckboxes[header] = 0;
//     }
//     this.selectedCheckboxes[header] += isChecked ? 1 : -1;

//     let finalPayload = this.payloadService.getPayload() || JSON.parse(JSON.stringify(USER_SEARCH_CONFIG)); // Get or create the initial payload

//     console.log('Clicked item:', {
//       value: item.value,
//       label: item.label,
//       header: header,
//       isChecked: isChecked
//     });

//     finalPayload.search.facets.facet.forEach((facet: any) => {
//       if (facet._label === header) {
//         const items = Array.isArray(facet.item) ? facet.item : [facet.item];

//         items.forEach((facetItem: any) => {
//           if ((facetItem._value === item.value || facetItem._value === item._value) && 
//               (facetItem._label === item.label || facetItem._label === item._label)) {
//             facetItem._selected = isChecked ? 'true' : 'false';
//           }
//         });
//       }
//     });

//     console.log('Updated Payload:', finalPayload);

//     // Pass the current search state (query, textType, and findable) from searchPayload
//     if (this.searchPayload) {
//       finalPayload.search.query = this.searchPayload.query;
//       console.log('final textType-', this.searchPayload.textType);
//       finalPayload.search.textTypes.textType = this.searchPayload.textType;
//       finalPayload.search.findable = this.searchPayload.findable;
//     }

//     // Save the updated payload
//     this.payloadService.setPayload(finalPayload);

//     this.apiService.getSearchListing(finalPayload).subscribe({
//       next: (response) => {
//         console.log('API Response:', response.body);
//         this.searchService.updateSearchResult(response.body);
//       },
//       error: (err) => {
//         console.error('API Error:', err);
//       }
//     });
//   }
// }

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
      console.log('Received searchPayload:', this.searchPayload);
    });

    // Initialize selection states from payload
    this.syncSelectionStatesFromPayload();
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
  
    // Update the item's selected state as a string to match payload format
    item.selected = isChecked ? 'true' : 'false';
  
    if (!this.selectedCheckboxes[header]) {
      this.selectedCheckboxes[header] = 0;
    }
    this.selectedCheckboxes[header] += isChecked ? 1 : -1;
  
    let finalPayload = this.payloadService.getPayload() || JSON.parse(JSON.stringify(USER_SEARCH_CONFIG));
    console.log('Initial Payload:', finalPayload); 
  
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
  
    // Save the updated payload
    this.payloadService.setPayload(finalPayload);
  
    // Make the API call
    this.apiService.getSearchListing(finalPayload).subscribe({
      next: (response) => {
        console.log('API Response:', JSON.parse(response.body));
        this.searchService.updateSearchResult(response.body);  
      },
      error: (err) => {
        console.error('API Error:', err);
      }
    });
  }
  
  
  
}