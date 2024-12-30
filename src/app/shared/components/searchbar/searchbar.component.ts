import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
  @Output() searchEvent = new EventEmitter<{
    categories: string[];
    term: string;
  }>();

  translate: TranslateService = inject(TranslateService);

  searchCategories = [
    { label: 'SearchAll', checked: true, id: 'all',},
    { label: 'KeyWords', checked: false, id: 'description', },
    { label: 'Title', checked: false, id: 'title',  },
    { label: 'Author', checked: false, id: 'authors',  },
    { label: 'ISBN', checked: false, id: 'isbn', },
  ];

  checkedOptions: Array<{ label: string; id: string }> = []; // Stores only checked options
  searchTerm: string = '';
  dropdownLabelText: string = '';

  // Check if all categories (excluding 'Search All') are checked
  areAllCategoriesChecked(): boolean {
    return this.searchCategories
      .filter((cat) => cat.id !== 'all') // Exclude 'Search All'
      .every((cat) => cat.checked); // Check if all are checked
  }

  // Toggle all categories if "Search All" is checked
  toggleSearchAll(isChecked: boolean) {
    this.searchCategories.forEach((category) => {
      category.checked = isChecked;
    });

    // Update checkedOptions
    this.checkedOptions = isChecked ? this.searchCategories.filter(cat => cat.id !== 'all') : [];
    this.getDropdownLabel(); // Update the dropdown label after toggling
  }

  // Initialization
  ngOnInit() {
    this.toggleSearchAll(true);
    this.getDropdownLabel(); // Ensures the label is updated if DOM re-renders
  }

  // Handle category toggling
  onCategoryToggle(categoryId: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    // Handle "Search All" case
    if (categoryId === 'all') {
      this.toggleSearchAll(isChecked); // Toggle all checkboxes
    } else {
      // Find the clicked category
      const category = this.searchCategories.find((cat) => cat.id === categoryId);
      if (!category) return;

      // Update checkedOptions
      if (isChecked) {
        this.checkedOptions.push({ label: category.label, id: category.id });
      } else {
        this.checkedOptions = this.checkedOptions.filter((opt) => opt.id !== categoryId);
      }

      // Update the "Search All" checkbox status
      const searchAll = this.searchCategories.find((cat) => cat.id === 'all');
      if (searchAll) {
        searchAll.checked = this.areAllCategoriesChecked();
      }
    }

    // Update dropdown label
    this.getDropdownLabel();
  }

  // Generate dropdown label dynamically
  getDropdownLabel(): void {
    // Check if all options (excluding 'Search All') are checked
    if (this.areAllCategoriesChecked()) {
      this.dropdownLabelText = 'SearchAll';
    } else if (this.checkedOptions.length === 1) {
      // If only one category is selected
      this.dropdownLabelText = this.checkedOptions[0]?.label;
    } else if (this.checkedOptions.length > 1) {
      // If multiple categories are selected
      this.dropdownLabelText = `${this.checkedOptions[0]?.label} + ${this.checkedOptions.length - 1}`;
    } else {
      // If no categories are selected
      this.dropdownLabelText = 'Select Categories';
    }
  }

  // Emit search event
  onSearch() {
    let selectedCategories: string[];

    const searchAll = this.searchCategories.find((cat) => cat.id === 'all');
    
    if (searchAll?.checked) {
      // If "Search All" is checked, select all categories except "Search All"
      selectedCategories = this.searchCategories
        .filter((cat) => cat.id !== 'all')
        .map((cat) => cat.id);
    } else {
      // Otherwise, use the selected options
      selectedCategories = this.checkedOptions.map((opt) => opt.id);
    }

    const searchData = {
      categories: selectedCategories,
      term: this.searchTerm,
    };

    // Emit search event
    this.searchEvent.emit(searchData);
  }
}

