import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-findcontent-search',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './findcontent-search.component.html',
  styleUrl: './findcontent-search.component.scss'
})
export class FindcontentSearchComponent {
  translate:TranslateService = inject(TranslateService);

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
