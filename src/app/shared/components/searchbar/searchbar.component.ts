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
    { label: 'SearchAll', checked: true, id: 'all', disabled: false },
    { label: 'Keywords', checked: false, id: 'description', disabled: false },
    { label: 'Title', checked: false, id: 'title', disabled: false },
    { label: 'Author', checked: false, id: 'authors', disabled: false },
    { label: 'ISBN', checked: false, id: 'isbn', disabled: false },
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
      category.disabled = isChecked && category.id !== 'all'; // Disable other options if "Search All" is checked
    });

    // Update checkedOptions
    this.checkedOptions = isChecked ? [...this.searchCategories] : [];
  }

  // Initialization
  ngOnInit() {
    this.toggleSearchAll(true); // Ensures "Search All" is checked if DOM re-renders
    this.getDropdownLabel(); // Ensures the label is updated if DOM re-renders
  }

  // Handle category toggling
  onCategoryToggle(categoryId: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    // Handle "Search All" case
    if (categoryId === 'all') {
      this.toggleSearchAll(isChecked); // Toggle all checkboxes
      this.getDropdownLabel(); // to update if search all option is rechecked after unchecking
    }

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

    // Update dropdown label
    this.getDropdownLabel();
  }

  // Generate dropdown label dynamically
  getDropdownLabel(): void {
    // Check if all options (excluding 'Search All') are checked
    if (this.areAllCategoriesChecked()) {
        this.dropdownLabelText = 'SearchAll';
    } else if (this.checkedOptions?.length === 1) {
        // If only one category is selected
        this.dropdownLabelText = this.checkedOptions[0]?.label;
    } else if (this.checkedOptions?.length > 1) {
        // If multiple categories are selected
        this.dropdownLabelText = `${this.checkedOptions[0]?.label} + ${this.checkedOptions?.length - 1}`;
    } 
}

  // Emit search event
  onSearch() {
    const selectedCategories = this.checkedOptions.map((opt) => opt.id);

    const searchData = {
      categories: selectedCategories,
      term: this.searchTerm,
    };

    this.searchEvent.emit(searchData);
  }
}
