import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { USER_SEARCH_CONFIG } from '../../constants/search-payload.config';
import { ApiService } from '../../../core/services/api/api.service';
import { SearchService } from '../../../core/services/search/search.service';


@Component({
  selector: 'hec-searchbar',
  standalone: true,
  imports: [FormsModule, NgbDropdownModule, TranslateModule],
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent {
  @Input() searchbarTitle: string = '';
  @Input() placeholder: string = '';
  @Output() textTypeChange = new EventEmitter<string[]>();


  translate: TranslateService = inject(TranslateService);
  private apiService = inject(ApiService);
  private searchService = inject(SearchService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  searchCategories = [
    { label: 'SearchAll', checked: true, id: 'all' },
    { label: 'KeyWords', checked: false, id: 'description' },
    { label: 'Title', checked: false, id: 'title' },
    { label: 'Author', checked: false, id: 'authors' },
    { label: 'ISBN', checked: false, id: 'isbn' },
  ];

  checkedOptions: Array<{ label: string; id: string }> = [];
  searchTerm: string = '';
  dropdownLabelText: string = '';

  ngOnInit() {
    // Initialize state from query parameters
    this.route.queryParams.subscribe((params) => {
      const query = params['query'] || ''; // Get the query parameter
      const textType = params['textType'] || ''; // Get the textType parameter
  
      // Set the search term
      this.searchTerm = query;
      if (textType === 'all') {
        // If 'cat' is 'all', check all checkboxes
        this.searchCategories.forEach((category) => {
          category.checked = true;
        });
        this.checkedOptions = this.searchCategories.slice(1); // Exclude 'SearchAll' from checked options
      }else if (textType) {
        // Split the textType string into an array and update the categories
        const textTypesArray = textType.split(',');
        this.searchCategories.forEach((category) => {
          category.checked = textTypesArray.includes(category.id);
        });
        this.checkedOptions = this.searchCategories.filter((cat) => cat.checked);
      } else {
        // If no textType in query params, default to selecting all categories
        this.toggleSearchAll(true);
      }
  
      // Update the dropdown label
      this.getDropdownLabel();
    });
  }  

  areAllCategoriesChecked(): boolean {
    return this.searchCategories
      .filter((cat) => cat.id !== 'all')
      .every((cat) => cat.checked);
  }

  toggleSearchAll(isChecked: boolean) {
    this.searchCategories.forEach((category) => {
      category.checked = isChecked;
    });
    this.checkedOptions = isChecked ? this.searchCategories.slice(1) : [];
    this.getDropdownLabel();
  }

  onCategoryToggle(category: { label: string; id: string; checked: boolean }, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (category.id === 'all') {
      this.toggleSearchAll(isChecked);
    } else {
      if (isChecked) {
        this.checkedOptions.push({ label: category.label, id: category.id });
      } else {
        this.checkedOptions = this.checkedOptions.filter((opt) => opt.id !== category.id);
      }

      const searchAll = this.searchCategories.find((cat) => cat.id === 'all');
      if (searchAll) {
        searchAll.checked = this.areAllCategoriesChecked();
      }
    }

    this.getDropdownLabel();
    const selectedCategories = this.checkedOptions.map((opt) => opt.id);
    this.searchService.setTextType(selectedCategories);
    console.log('Selected Categories', selectedCategories);
  }

  getDropdownLabel(): void {
    if (this.areAllCategoriesChecked()) {
      this.dropdownLabelText = 'SearchAll';
    } else if (this.checkedOptions.length === 1) {
      this.dropdownLabelText = this.checkedOptions[0]?.label;
    } else if (this.checkedOptions.length > 1) {
      this.dropdownLabelText = `${this.checkedOptions[0]?.label} + ${this.checkedOptions.length - 1}`;
    } else {
      this.dropdownLabelText = 'Select Categories';
    }
  }

  onSearch() {
    // Retrieve the existing payload from the SearchService
    const existingPayload = this.searchService.getPayload();
    const searchQuery = this.searchTerm;
  
    let selectedCategories: string[] = [];
    const searchAll = this.searchCategories.find((cat) => cat.id === 'all');
  
    if (searchAll?.checked) {
      selectedCategories = ['all'];
    } else {
      selectedCategories = this.checkedOptions.map((opt) => opt.id);
    }

    this.searchService.setTextType(selectedCategories);
  
    // Get current query parameters and update them
    this.route.queryParams.subscribe((currentParams) => {
      // Define the updated parameters
      const updatedParams = {
        ...currentParams, // Preserve existing parameters
        query: searchQuery,
        textType: selectedCategories.join(','), // Update textType with selected categories
      };
  
      // Check if we are on the /search-content route
      if (this.router.url.includes('/search-content')) {
        // If we are on the /search-content route, only update query and textType
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: updatedParams,
          queryParamsHandling: 'merge',
        });
      } else {
        // Otherwise, include ContentType and TrimSize when navigating to /search-content
        const finalParams = {
          ...updatedParams,
          ContentType: 'Book',
          TrimSize: '8by11',
        };
  
        this.router.navigate(['/search-content'], {
          queryParams: finalParams,
          queryParamsHandling: 'merge',
        });
      }
    }).unsubscribe(); // Unsubscribe after first emission
  
    // Start the search process in the service
    this.searchService.startSearch();
  
    // If there is an existing payload, merge the query and categories
    if (existingPayload) {
      const finalPayload = {
        ...existingPayload, // Retain other fields from the existing payload
        search: {
          ...existingPayload.search, // Retain other fields in the `search` object
          query: searchQuery, // Overwrite query with input value
          textTypes: { textType: selectedCategories }, // Overwrite textType with selected categories
        },
      };

      this.searchService.updateSearchQuery(finalPayload);
  
      // API call with the merged payload
      this.apiService.getSearchListing(finalPayload).subscribe({
        next: (response) => {
          if (response.ok) {
            console.log('API Response:', JSON.parse(response.body));
            this.searchService.updateSearchResult(response.body);
          }
        },
        error: (err) => {
          console.error('API Error:', err);
        },
      });
    } else {
      // If there is no existing payload, create a new one
      const finalPayload = JSON.parse(JSON.stringify(USER_SEARCH_CONFIG));
      finalPayload.search.query = searchQuery;
      finalPayload.search.textTypes = { textType: selectedCategories };
  
      // Set findable flag
      finalPayload.search.findable = selectedCategories.length === 3;
  
      // Update search service and make the API call
      this.searchService.updateSearchQuery(finalPayload);
      
  
      this.apiService.getSearchListing(finalPayload).subscribe({
        next: (response) => {
          if (response.ok) {
            console.log('API Response:', JSON.parse(response.body));
            this.searchService.updateSearchResult(response.body);
          }
        },
        error: (err) => {
          console.error('API Error:', err);
        },
      });
    }
  }
  
  
  
}