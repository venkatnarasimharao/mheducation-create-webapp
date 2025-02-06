import { Component, inject, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../core/services/api/api.service';
import { SearchService } from '../../../core/services/search/search.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'hec-sortby',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './sortby.component.html',
  styleUrls: ['./sortby.component.scss'],
})
export class SortbyComponent implements OnInit {
  sortOptions: { label: string; value: string; direction: string }[] = []; 
  selectedSortOption: string | null = null; 
  payload: any = '';

  constructor(
    private apiService: ApiService,
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const textType = this.searchService.textType$.subscribe((textType)=> {
      if((Array.isArray(textType) && textType.length === 0)){
        this.route.queryParams.subscribe((params)=> {
          const textType = params['textType'] || ''; 
          console.log('textType', textType);
          this.fetchSortOptions(textType);
        });
      } else{
        console.log('textType-', textType);
        this.fetchSortOptions(textType);
      }
     
    });
  }
  

  // ✅ Fetch sort options from the API based on selected `textType`
  private fetchSortOptions(textType: string[]): void {
    this.apiService.getCollectionsList().subscribe({
      next: (response: any) => {
        if (response.ok) {
          const parsedBody = JSON.parse(response.body);
          const sortFields = parsedBody?.search?.sort?.sortfield || []; 

          this.sortOptions = sortFields.map((field: any) => ({
            label: field.name,
            value: field.id || '',
            direction: field.direction,
          }));

          // ✅ Dynamically determine default sort option based on `textType`
          this.setDefaultSortOption(textType);
        }
      },
      error: (err) => {
        console.error('Error fetching sort options:', err);
        this.sortOptions = [{ label: 'Relevance', value: '', direction: 'descending' }];
        this.selectedSortOption = 'Relevance';
        this.updatePayloadWithSort(this.sortOptions[0]);
      },
    });
  }

  // ✅ Dynamically set the default sorting option based on `textType`
  private setDefaultSortOption(textType: string[]): void {
    if (!this.sortOptions.length) return;
  
    let defaultOption;
  
    if (textType.includes('all') || textType.includes('description')) {
      defaultOption = this.sortOptions[0]; // Select first option
    } else {
      defaultOption = this.sortOptions[3] || this.sortOptions[0]; // Fallback to valid option
    }
  
    // ✅ Prevent unnecessary updates to avoid infinite loop
    if (this.selectedSortOption !== defaultOption.label) {
      this.selectedSortOption = defaultOption.label;
      this.updatePayloadWithSort(defaultOption);
    }
  }
  

  // ✅ Handle sort option selection from the dropdown
  onSortChange(sortOption: { label: string; value: string; direction: string }): void {
    this.selectedSortOption = sortOption.label;
    this.updatePayloadWithSort(sortOption); 
    this.fetchSortResults();
  }

  // ✅ Update search payload with the selected sort option
  private updatePayloadWithSort(sortOption: { label: string; value: string; direction: string }): void {
    const currentPayload = this.searchService.getPayload() || {};

    this.payload = {
      ...currentPayload,
      search: {
        ...currentPayload.search,
        sortfield: {
          _name: sortOption.label,
          _id: sortOption.value,
          _direction: sortOption.direction,
        },
      },
    };

    this.searchService.updateSearchQuery(this.payload);
    
  }

  // ✅ Fetch sorted results based on the updated payload
  private fetchSortResults() {
    this.apiService.getSearchListing(this.payload).subscribe({
      next: (response) => {
        if (response.ok) {
          this.searchService.updateSearchResult(response.body);
        }
      },
      error: (error) => {
        console.error('API Error:', error);
      },
    });
  }
}
