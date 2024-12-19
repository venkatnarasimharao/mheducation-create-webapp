import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hec-searchbar',
  standalone: true,
  imports: [FormsModule, NgbDropdownModule, CommonModule],
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

  // Updated Categories as an array of objects
  searchCategories = [
    { label: 'Search All', checked: false, id: 'search_all' },
    { label: 'Keywords', checked: false, id: 'keywords' },
    { label: 'Title', checked: false, id: 'title' },
    { label: 'Author', checked: false, id: 'author' },
    { label: 'ISBN', checked: false, id: 'isbn' },
  ];

  searchTerm: string = '';

  // Toggle category when checkbox changes
  onCategoryToggle(categoryId: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (categoryId === 'search_all') {
      // If Search All is toggled, update all categories
      this.searchCategories.forEach((category) => {
        category.checked = isChecked;
      });
    } else {
      // Update individual category
      const category = this.searchCategories.find(
        (cat) => cat.id === categoryId
      );
      if (category) {
        category.checked = isChecked;

        // If all individual categories are selected, mark Search All as checked
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

  // Dropdown Label Logic
  getDropdownLabel(): string {
    const selectedLabels = this.searchCategories
      .filter((cat) => cat.checked && cat.id !== 'search_all')
      .map((cat) => cat.label);

    if (
      this.searchCategories.find(
        (cat) => cat.id === 'search_all' && cat.checked
      )
    ) {
      return 'Search All';
    }

    return selectedLabels.length > 0
      ? selectedLabels.join(', ')
      : 'Select Categories';
  }

  // Search Logic
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
