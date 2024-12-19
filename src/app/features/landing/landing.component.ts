import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SearchbarComponent } from '../../shared/components/searchbar/searchbar.component';

@Component({
  selector: 'hec-landing',
  standalone: true,
  imports: [TranslateModule, SearchbarComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  handleSearch(event: { categories: string[]; term: string }) {
    console.log('Search Data:', event);
  }
}
