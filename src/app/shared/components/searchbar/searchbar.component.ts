import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'hec-searchbar',
  standalone: true,
  imports: [FormsModule, NgbDropdownModule, CommonModule, TranslateModule],
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent {
  @Input() title: string = '';
  @Input() placeholder: string = '';
  @Output() searchEvent = new EventEmitter<{
    categories: string[];
    term: string;
  }>();

  translate: TranslateService = inject(TranslateService);

  searchCategories = [
    { label: 'Search All', checked: true, id: 'search_all' },
    { label: 'Keywords', checked: false, id: 'keywords' },
    { label: 'Title', checked: false, id: 'title' },
    { label: 'Author', checked: false, id: 'author' },
    { label: 'ISBN', checked: false, id: 'isbn' },
  ];

  searchTerm: string = '';
  firstSelectedLabel: string = '';

  // Toggle all categories if "Search All" is checked
  toggleSearchAll(isChecked: boolean) {
    this.searchCategories.forEach((category) => {
      category.checked = isChecked;
    });
  }

  // Initialization
  ngOnInit() {
    this.toggleSearchAll(true); // Ensure search All is checked if DOMS re-render
  }

  // Handle category toggling
  onCategoryToggle(categoryId: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (categoryId === 'search_all') {
      // "Search All" toggled
      this.toggleSearchAll(isChecked);
    } else {
      // Update individual category
      const category = this.searchCategories.find(
        (cat) => cat.id === categoryId
      );
      if (category) {
        category.checked = isChecked;

        // Check "Search All" state based on other checkboxes
        const allSelected = this.searchCategories
          .filter((cat) => cat.id !== 'search_all')
          .every((cat) => cat.checked);

        const searchAll = this.searchCategories.find(
          (cat) => cat.id === 'search_all'
        );
        if (searchAll) {
          searchAll.checked = allSelected;
        }
      }
    }
  }

  // Generate dropdown label dynamically
  getDropdownLabel(): string {
    const selectedCategories = this.searchCategories.filter((cat) => cat.checked);

    if (selectedCategories.length === 0) {
      return 'Select Categories';
    } else if (selectedCategories.length === 1) {
      this.firstSelectedLabel = selectedCategories[0].label;
      return this.firstSelectedLabel;
    } else {
      const firstSelected = selectedCategories[0].label;
      const remainingCount = selectedCategories.length - 1;
      return firstSelected === 'Search All'
        ? 'Search All'
        : `${firstSelected} + ${remainingCount}`;
    }
  }

  // Emit search event
  onSearch() {
    const selectedCategories = this.searchCategories
      .filter((cat) => cat.checked && cat.id !== 'search_all')
      .map((cat) => cat.id);

    const searchData = {
      categories: selectedCategories,
      term: this.searchTerm,
    };

    this.searchEvent.emit(searchData);
  }
}
