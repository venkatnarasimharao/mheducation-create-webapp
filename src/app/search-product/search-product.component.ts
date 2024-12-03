import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-product.component.html',
  styleUrl: './search-product.component.scss'
})
export class SearchProductComponent {
  

  onSearch() {
    console.log('Search button clicked!');
  }

  searchAll() {
    console.log('Search All clicked!');
  }
}
