import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SearchbarComponent } from '../../shared/components/searchbar/searchbar.component';

@Component({
  selector: 'hec-landing',
  standalone: true,
  imports: [TranslateModule, SearchbarComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  translate :TranslateService =inject(TranslateService);

  handleSearch(event: { categories: string[]; term: string }) {
    console.log('Search Data:', event);
  }
 
}
