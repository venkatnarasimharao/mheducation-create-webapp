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
    { label: 'Search All', checked: true, id: 'all', disabled: false },
    { label: 'Keywords', checked: false, id: 'description', disabled: false },
    { label: 'Title', checked: false, id: 'title', disabled: false },
    { label: 'Author', checked: false, id: 'authors', disabled: false },
    { label: 'ISBN', checked: false, id: 'isbn', disabled: false },
  ];

  checkedOptions: Array<{ label: string; id: string }> = []; // Stores only checked options
  searchTerm: string = '';
  dropdownLabelText: string = '';

  // Toggle all categories if "Search All" is checked
  private toggleSearchAll(isChecked: boolean) {
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
    this.getDropdownLabel();    // Ensures the label is updated if DOM re-renders
  }

  // Handle category toggling
  onCategoryToggle(categoryId: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    // Handle "Search All" case
    if (categoryId === 'all') {
      this.toggleSearchAll(isChecked); // Toggle all checkboxes
      return;
    }

    // Find the clicked category
    const category = this.searchCategories.find((cat) => cat.id === categoryId);
    if (!category) return;

    // Update the clicked category's state
    category.checked = isChecked;

    // Update checkedOptions
    if (isChecked) {
      this.checkedOptions.push({ label: category.label, id: category.id });
    } else {
      this.checkedOptions = this.checkedOptions.filter((opt) => opt.id !== categoryId);
    }

    // Update the "Search All" checkbox status
    const searchAll = this.searchCategories.find((cat) => cat.id === 'all');
    if (searchAll) {
      searchAll.checked = this.searchCategories
        .filter((cat) => cat.id !== 'all') // Exclude "Search All"
        .every((cat) => cat.checked); // Check if all others are checked
    }

    // Update dropdown label
    this.getDropdownLabel();
  }

  // Generate dropdown label dynamically
  private getDropdownLabel(): string {
    // Check if all options (excluding 'Search All') are checked
    const allChecked = this.searchCategories
      .filter((cat) => cat.id !== 'all') // Exclude 'Search All'
      .every((cat) => cat.checked); // Check if all are checked

    // If all are checked, set label to "Search All"
    if (allChecked) {
      this.dropdownLabelText = 'Search All';
      return this.dropdownLabelText;
    }

    // Get the selected categories
    const selectedCategories = this.checkedOptions;
    console.log(selectedCategories)

    // Default label
    this.dropdownLabelText = 'Select Categories';

    if (selectedCategories?.length === 1) {
      // If only one category is selected
      this.dropdownLabelText = selectedCategories[0]?.label;
    } 
    if (selectedCategories?.length > 1) {
      // If multiple categories are selected
      const firstSelected = selectedCategories[0]?.label;
      const remainingCount = selectedCategories?.length - 1;

      this.dropdownLabelText = `${firstSelected} + ${remainingCount}`;
    }

    return this.dropdownLabelText;
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
