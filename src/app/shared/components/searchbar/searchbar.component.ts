import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { PayloadService } from '../../../core/services/payload/payload.service';
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


  translate: TranslateService = inject(TranslateService);
  private apiService = inject(ApiService);
  private searchService = inject(SearchService);
  private payloadService = inject(PayloadService); 

  constructor(private router: Router) {}

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
    this.toggleSearchAll(true);
    this.getDropdownLabel();

    // Subscribe to payload service
    const payload = this.payloadService.getPayload();

    if (payload) {
      this.searchTerm = payload.search.query || '';

      // Update selected categories based on textType
      const textTypes = payload.search?.textTypes?.textType || [];
      this.searchCategories.forEach((category) => {
        category.checked = textTypes.includes(category.id);
      });

      // Update checked options and dropdown label
      this.checkedOptions = this.searchCategories.filter((cat) => cat.checked);
      this.getDropdownLabel();
    }
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
    // Check if the current route is already '/search-content'
    if (this.router.url !== '/search-content') {
      this.router.navigate(['/search-content']);
    }
  
    let selectedCategories: string[];
  
    const searchAll = this.searchCategories.find((cat) => cat.id === 'all');
    
    if (searchAll?.checked) {
      // If "Search All" is checked, select all categories except "Search All"
      selectedCategories = ['all'];
    } else {
      // Otherwise, use the selected options
      selectedCategories = this.checkedOptions.map((opt) => opt.id);
    }
  
    // Fetch the query from the payload
    const payload = this.payloadService.getPayload();
    const searchQuery = payload?.query || this.searchTerm; // Default to the search term in the input field if no query in payload
  
    // Construct the final payload for the search request
    const finalPayload = JSON.parse(JSON.stringify(USER_SEARCH_CONFIG));
  
    // Update the query in the final payload
    finalPayload.search.query = searchQuery;
  
    // Handle the textTypes based on the selected categories
    if (selectedCategories.includes('all')) {
      finalPayload.search.textTypes = { textType: ['all'] };
    } else {
      finalPayload.search.textTypes = { textType: selectedCategories };
      finalPayload.search.textNamespace = 'http://mhhe.com/primis/meta/resolved';
    }
  
    // Set the 'findable' field based on the length of textType
    if (finalPayload.search.textTypes.textType.length === 3) {
      finalPayload.search.findable = true;
    } else {
      finalPayload.search.findable = false;
    }
  
    console.log('Final Payload:', finalPayload);
  
    // Save the updated payload in the PayloadService
    this.payloadService.setPayload(finalPayload);
  
    // Update the search service with the latest data
    this.searchService.updateSearchQuery(finalPayload.search.query, finalPayload.search.textTypes.textType, finalPayload.search.findable);
  
    // Trigger the search process
    this.searchService.startSearch();
  
    // Call the API to get the search listing
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
