import { Component, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../core/services/api/api.service';
import { SearchService } from '../../../core/services/search/search.service';

@Component({
  selector: 'hec-sortby',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './sortby.component.html',
  styleUrls: ['./sortby.component.scss'] // Fixed typo
})
export class SortbyComponent implements OnInit {
  selectedSortOption: string | null = null; // Initially, no option is selected


  constructor(
    private apiService: ApiService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    // Set default sort option as 'Relevance'
    this.selectedSortOption = this.formatSortOption('relevance');
  }

  // Update payload with the default sort option
  private updatePayloadWithDefaultSort(): void {
    const defaultSortFieldDetails = this.getSortFieldDetails('relevance');
    const currentPayload = {
      ...this.searchService.getPayload() || {}, // Ensure payload is at least an empty object
      search: {
        ...this.searchService.getPayload()?.search || {}, // Preserve other search attributes
        sortfield: defaultSortFieldDetails
      }
    };

    this.searchService.updateSearchQuery(currentPayload);
    console.log('Payload with default sort option:', currentPayload);
  }

  // Handle sorting change
  onSortChange(sortOption: string): void {
    const formattedSortOption = this.formatSortOption(sortOption); // Get the formatted option
    this.selectedSortOption = formattedSortOption; // Update the selected sort option
    console.log('Selected sort option:', this.selectedSortOption);

  
    let currentPayload = this.searchService.getPayload() || {}; // Ensure payload is at least an empty object
    console.log('Current Payload:', currentPayload);

    // Get the new sort field details based on the selected option
    const sortFieldDetails = this.getSortFieldDetails(sortOption);

    // Update the sortfield attribute inside the searchfield property
    currentPayload = {
      ...currentPayload, // Spread the existing payload
      search: {
        ...currentPayload.search, // Preserve other attributes in searchfield if they exist
        sortfield: sortFieldDetails // Update sortfield
      }
    };

    this.searchService.updateSearchQuery(currentPayload);

    // Log the updated payload
    console.log('Updated Payload:', currentPayload);

    this.searchService.startSearch();

    this.apiService.getSearchListing(currentPayload).subscribe({
      next: (response) => {
        if (response.ok) {
          console.log('API Response:', JSON.parse(response.body));
          this.searchService.updateSearchResult(response.body);
        }
      },
      error: (error) => {
        console.error('API Error:', error);
      }
    });
  }

  // Format the sort option for display (e.g., 'author_asc' to 'Author (a-z)')
  private formatSortOption(option: string): string {
    const optionMap: { [key: string]: string } = {
      'relevance': 'Relevance',
      'author_asc': 'Author (a-z)',
      'author_desc': 'Author (z-a)',
      'year_newest': 'Year (newest first)',
      'year_oldest': 'Year (oldest first)',
      'title_asc': 'Title (a-z)',
      'title_desc': 'Title (z-a)'
    };

    return optionMap[option] || 'Relevance'; // Default to 'Relevance' if option is unknown
  }

  // Get the appropriate sort field details based on the selected option
  private getSortFieldDetails(sortOption: string): { _name: string; _id: string; _direction: string } {
    const sortFields: Record<string, { _name: string; _id: string; _direction: string }> = {
      'relevance': { _name: 'Relevance', _id: '', _direction: 'descending' },
      'author_asc': { _name: 'Author (a-z)', _id: 'authors', _direction: 'ascending' },
      'author_desc': { _name: 'Author (z-a)', _id: 'authors', _direction: 'descending' },
      'year_newest': { _name: 'Year (newest first)', _id: 'year', _direction: 'descending' },
      'year_oldest': { _name: 'Year (oldest first)', _id: 'year', _direction: 'ascending' },
      'title_asc': { _name: 'Title (a-z)', _id: 'title', _direction: 'ascending' },
      'title_desc': { _name: 'Title (z-a)', _id: 'title', _direction: 'descending' }
    };

    return sortFields[sortOption] || { _name: 'Relevance', _id: '', _direction: 'descending' };
  }
}
