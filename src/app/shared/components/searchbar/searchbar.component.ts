import { CommonModule } from '@angular/common';
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
    { label: 'Search All', checked: true, id: 'search_all' },
    { label: 'Keywords', checked: false, id: 'keywords' },
    { label: 'Title', checked: false, id: 'title' },
    { label: 'Author', checked: false, id: 'author'},
    { label: 'ISBN', checked: false, id: 'isbn' },
  ];

  searchTerm: string = '';
  firstSelectedLabel: string = '';
  dropdownLabelText: string = '';

  //Toggle all categories if "Search All" is checked
  private toggleSearchAll(isChecked: boolean) {
    this.searchCategories.forEach((category) => {
      category.checked = isChecked;
    });
  }

  //Initialization
  ngOnInit() {
    this.toggleSearchAll(true); //Ensures search All is checked if DOMS re-render
    this.updateDropdownLabel();  //Ensures the label is updated if DOMS re-render
  }

  private updateDropdownLabel(): void {
    this.dropdownLabelText = this.getDropdownLabel();
  }

  // Handle category toggling
  onCategoryToggle(categoryId: string, event: Event): void {
    //Get checkbox state
    const isChecked = (event.target as HTMLInputElement).checked;
  
    //Handle "Search All" case
    if (categoryId === 'search_all') {
      this.toggleSearchAll(isChecked);    //Toggle all checkboxes
      this.updateDropdownLabel();         
      return;                           
    }
  
    //Find the clicked category
    const category = this.searchCategories.find(cat => cat.id === categoryId);
    if (!category) return;               //If category not found, exit early
  
    //Update the clicked category's state
    category.checked = isChecked;
    
    //Find and update "Search All" checkbox
    const searchAll = this.searchCategories.find(cat => cat.id === 'search_all');
    if (searchAll) {
      searchAll.checked = this.searchCategories
        .filter(cat => cat.id !== 'search_all')  //Exclude "Search All" from check
        .every(cat => cat.checked);              //Check if all others are checked
    }
  
    //Update dropdown label
    this.updateDropdownLabel();
  }

  
  // Generate dropdown label dynamically
  private getDropdownLabel(): string {
    const selectedCategories = this.searchCategories.filter((cat) => cat.checked);
    //console.log("Selected Categories- ", selectedCategories);

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
