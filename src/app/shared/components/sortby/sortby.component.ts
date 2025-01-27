import { Component, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../core/services/api/api.service';
import { SearchService } from '../../../core/services/search/search.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hec-sortby',
  standalone: true,
  imports: [NgbDropdownModule, CommonModule],
  templateUrl: './sortby.component.html',
  styleUrls: ['./sortby.component.scss'],
})
export class SortbyComponent implements OnInit {
  sortOptions: { label: string; value: string; direction: string }[] = []; 
  selectedSortOption: string | null = null; 

  constructor(
    private apiService: ApiService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.fetchSortOptions(); // Fetch options on component initialization
  }

  // Fetch sort options from the API
  private fetchSortOptions(): void {
    this.apiService.getCollectionsList().subscribe({
      next: (response: any) => {
        if(response.ok){
  const parsedBody = JSON.parse(response.body);
        const sortFields = parsedBody?.search?.sort?.sortfield || []; 
        this.sortOptions = sortFields.map((field: any) => ({
          label: field.name,
          value: field.id || '',
          direction: field.direction,
        }));

        // Set default sort option
        if (this.sortOptions.length > 0) {
          const defaultOption = this.sortOptions[0];
          this.selectedSortOption = defaultOption.label;
          // this.updatePayloadWithSort(defaultOption);
        }
        }
      
      },
      error: (err) => {
        console.error('Error fetching sort options:', err);
        // Fallback to a default option if API fails
        this.sortOptions = [{ label: 'Relevance', value: '', direction: 'descending' }];
        this.selectedSortOption = 'Relevance';
        this.updatePayloadWithSort(this.sortOptions[0]);
      },
    });
  }

  // Handle sort option selection from the dropdown
  onSortChange(sortOption: { label: string; value: string; direction: string }): void {
    this.selectedSortOption = sortOption.label;
    this.updatePayloadWithSort(sortOption); 
  }

  // Update search payload with the selected sort option and start search
  private updatePayloadWithSort(sortOption: { label: string; value: string; direction: string }): void {
    const currentPayload = this.searchService.getPayload() || {};

    const updatedPayload = {
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

    this.searchService.updateSearchQuery(updatedPayload);
    this.searchService.startSearch();

    this.apiService.getSearchListing(updatedPayload).subscribe({
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
