import { Component, inject, Input, SimpleChanges, OnInit } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { USER_SEARCH_CONFIG } from '../../constants/search-payload.config';
import { ApiService } from '../../../core/services/api/api.service';
import { SearchService } from '../../../core/services/search/search.service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

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
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  @Input() collectionfilterData: any[] = [];
  selectedCheckboxes: { [header: string]: number } = {};
  facetsData: any[] = [];

  searchPayload: { query: string; textType: string[]; findable: boolean } | undefined;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.initializeFromQueryParams(params);
      this.updateSelectedCounts(); // Ensure UI reflects selections
    });
  
    this.searchService.searchResult$.subscribe((state) => {
      this.searchPayload = {
        query: state.query,
        textType: state.textType,
        findable: state.findable
      };
      this.syncFacetsWithApiResponse(state.result?.['s:facets']?.['s:facet'] || []);
    });
  }
  
  

  private initializeFromQueryParams(params: any): void {

  this.collectionfilterData.forEach((list) => {
    list.collectionTypes?.forEach((item: any) => {
      item.selected = false; 
    });
  });

    Object.keys(params).forEach((paramKey) => {
      const values = params[paramKey]?.split(',') || [];
  
      this.collectionfilterData.forEach((list) => {
        if (this.normalizeHeader(list.header) === paramKey) {
          list.collectionTypes?.forEach((item: any) => {
            // Set selected to true if the value is in the queryParams
            item.selected = values.includes(item.value);
          });
        }
      });
    });
  
    // Ensure the selected counts are updated
    this.updateSelectedCounts();
  }

  private updateQueryParams(): void {
    // Start with empty query params
    const queryParams: { [key: string]: string } = {};
    
    // Get current query params
    const currentParams = this.route.snapshot.queryParams;
    console.log('Current Query Params:', currentParams);

    // Copy over any query params that aren't related to our filters
    Object.keys(currentParams).forEach(key => {
      const matchingFilter = this.collectionfilterData.find(
        list => this.normalizeHeader(list.header) === key
      );
      if (!matchingFilter) {
        queryParams[key] = currentParams[key];
      }
    });

    // Add selected filter values
    this.collectionfilterData.forEach((list) => {
      const selectedItems = list.collectionTypes?.filter(
        (item: any) => item.selected === 'true' || item.selected === true
      );

      const normalizedHeader = this.normalizeHeader(list.header);
      console.log(`Processing ${normalizedHeader}:`, selectedItems);

      if (selectedItems?.length) {
        const values = selectedItems.map((item: any) => item.value).join(',');
        queryParams[normalizedHeader] = values;
      }
      // If no items selected, the parameter will not be included
    });

    console.log('Final Query Params:', queryParams);

    // Navigate with the new query params
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
    }).then(() => {
      console.log('Navigation completed');
    }).catch(error => {
      console.error('Navigation error:', error);
    });
  }

  private syncFacetsWithApiResponse(apiFacets: any[]): void {
    this.collectionfilterData.forEach((list) => {
      if (list.collectionTypes) {
        list.collectionTypes = list.collectionTypes.map((item: any) => ({
          ...item,
          count: 0
        }));
      }
    });

    this.collectionfilterData.forEach((list) => {
      const currentPayload = this.searchService.getPayload() || USER_SEARCH_CONFIG;
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
            const matchingFacetValue = apiFacetValues.find(
              (facetValue: any) =>
                facetValue.name === payloadItem._value || facetValue.name === payloadItem._label
            );

            if (matchingFacetValue) {
              item.count = matchingFacetValue.count;
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
  }

  private syncSelectionStatesFromPayload(): void {
    const currentPayload = this.searchService.getPayload() || USER_SEARCH_CONFIG;

    this.collectionfilterData.forEach(list => {
      const payloadFacet = currentPayload.search.facets.facet.find((f: any) => f._label === list.header);
      if (payloadFacet && list.collectionTypes) {
        const payloadItems = Array.isArray(payloadFacet.item) ? payloadFacet.item : [payloadFacet.item];

        list.collectionTypes.forEach((item: any) => {
          const payloadItem = payloadItems.find((pi: any) =>
            pi._label === item.label || pi._value === item.value
          );
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

    if (!isChecked && header === 'Content Type') {
      const list = this.collectionfilterData.find((list) => list.header === header);
      const otherSelectedItems = list?.collectionTypes.filter(
        (listItem: any) => 
          (listItem.selected === 'true' || listItem.selected === true) && 
          listItem !== item
      );

      if (otherSelectedItems?.length === 0) {
        (event.target as HTMLInputElement).checked = true;
        return;
      }
    }

    item.selected = isChecked ? 'true' : 'false';

    // Make sure the value is set correctly for Copyright Year
    if (!item.value) {
      item.value = item.label;  // Set value based on label if missing
    }

    if (!this.selectedCheckboxes[header]) {
      this.selectedCheckboxes[header] = 0;
    }
    this.selectedCheckboxes[header] += isChecked ? 1 : -1;

    let finalPayload = this.searchService.getPayload() || JSON.parse(JSON.stringify(USER_SEARCH_CONFIG));
    const facet = finalPayload.search.facets.facet.find((f: any) => f._label === header);

    if (facet) {
      if (header === 'Copyright Year') {
        this.handleCopyrightYearChange(facet, item, isChecked);
      } else {
        this.handleRegularFacetChange(facet, item, isChecked);
      }
    }

    // Update query parameters
    this.updateQueryParams();

    if (this.searchPayload) {
      finalPayload.search.query = this.searchPayload.query;
      finalPayload.search.textTypes.textType = this.searchPayload.textType;
      finalPayload.search.findable = this.searchPayload.findable;
    }

    this.searchService.updateSearchQuery(finalPayload);
    this.searchService.startSearch();

    this.apiService.getSearchListing(finalPayload).subscribe({
      next: (response) => {
        if (response.ok) {
          this.searchService.updateSearchResult(response.body);
        }
      },
      error: (err) => {
        console.error('API Error:', err);
      }
    });
  }

  private handleCopyrightYearChange(facet: any, item: any, isChecked: boolean): void {
    const items = Array.isArray(facet.item) ? facet.item : [facet.item];

    if (item.label === 'Prior to 2012') {
      const index = items.findIndex((facetItem: any) => facetItem._label === 'Prior to 2012');
      if (index > -1) {
        items.splice(index, 1);
      }

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
        for (let i = items.length - 1; i >= 0; i--) {
          const year = parseInt(items[i]._value);
          if (year >= 1901 && year <= 2011) {
            items.splice(i, 1);
          }
        }
      }
    } else {
      const matchingItem = items.find((facetItem: any) =>
        facetItem._label === item.label || facetItem._value === item.value
      );

      if (matchingItem) {
        matchingItem._value = item.label;
        matchingItem._selected = isChecked ? 'true' : 'false';
      }
    }
  }

  private handleRegularFacetChange(facet: any, item: any, isChecked: boolean): void {
    const items = Array.isArray(facet.item) ? facet.item : [facet.item];
    items.forEach((facetItem: any) => {
      if (facetItem._label === item.label || facetItem._value === item.value) {
        facetItem._selected = isChecked ? 'true' : 'false';
      }
    });
  }
}