import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'hec-searchbar',
  standalone: true,
  imports: [FormsModule, CommonModule, NgbDropdownModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {
  // @Input() title: string = ''; // Dynamic header passed as input
  // @Output() searchEvent = new EventEmitter<any>(); // Emit the search data

  // // Dropdown and input field data
  // searchCategories = ['Search All','Title', 'Author', 'ISBN', 'Keyword'];
  // selectedCategory: string = 'Search All'; // Default dropdown value
  // searchTerm: string = ''; // Input field value

  // // Handle search button click
  // onSearch() {
  //   const searchData = {
  //     category: this.selectedCategory,
  //     term: this.searchTerm,
  //   };
  //   this.searchEvent.emit(searchData);
  // }

  @Input() title: string = '';
  @Output() searchEvent = new EventEmitter<any>(); // Emit the search data

  searchCategories = ['Search All', 'Keywords', 'Title', 'Author', 'ISBN'];
  selectedCategory = 'Search All';
  searchTerm = '';

 onSearch() {
    const searchData = {
      category: this.selectedCategory,
      term: this.searchTerm,
    };
    this.searchEvent.emit(searchData);
  }
  onSelectCategory(category: string) {
    this.selectedCategory = category;
  }
}
