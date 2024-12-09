import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
@Component({
  selector: 'app-search-product',
  standalone: true,
  imports: [CommonModule,A11yModule],
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

  handleKeydown(event: KeyboardEvent): void {
    const selectElement = event.target as HTMLSelectElement;
    
    if (event.key === 'ArrowDown') {
      if (selectElement.selectedIndex === selectElement.options.length - 1) {
        event.preventDefault();
        selectElement.selectedIndex = 1;
      }
    } else if (event.key === 'ArrowUp') {
      if (selectElement.selectedIndex === 1) {
        event.preventDefault();
        selectElement.selectedIndex = selectElement.options.length - 1;
      }
    }
  }
}
