import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ImageGalleryService } from '../../core/services/image-gallery/image-gallery.service';
import { ImageCardComponent } from '../../shared/components/image-card/image-card.component';
import {Collection} from '../../shared/models/search.model';
import { SearchbarComponent } from '../../shared/components/searchbar/searchbar.component';
import { ApiService } from '../../core/services/api/api.service';
import { USER_SEARCH_CONFIG } from '../../shared/constants/search-payload.config';
import { SearchService } from '../../core/services/search/search.service';

@Component({
  selector: 'hec-landing',
  standalone: true,
  imports: [
    TranslateModule,
    RouterModule,
    ImageCardComponent,
    SearchbarComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  translate :TranslateService =inject(TranslateService);  

  private apiService = inject(ApiService);
  private searchService = inject(SearchService); 
  collectionsData: Collection[] = [];

  constructor(
    private readonly imageService: ImageGalleryService
  ) { }

  ngOnInit(): void {
    this.loadCollections();
  }

  handleSearch(event: { categories: string[]; term: string }) {
    console.log('Search Data:', event);
  
    // Create a deep copy of USER_SEARCH_CONFIG to avoid mutating the original
    const finalPayload = JSON.parse(JSON.stringify(USER_SEARCH_CONFIG));
  
    // Update the "query" property with the search term
    finalPayload.search.query = event.term;
  
    // Update the "textType" based on selected categories
    if (event.categories.includes('all')) {
      finalPayload.search.textTypes.textType = 'all';
    } else {
      finalPayload.search.textTypes.textType = event.categories.join(',');
    }
  
    // Modify facets based on categories if needed
    if (event.categories.length > 0) {
      finalPayload.search.facets.facet.forEach((facet: any) => {
        if (facet._label === 'Content Type') {
          facet.item.forEach((item: any) => {
            item._selected = event.categories.includes(item._value);
          });
        }
      });
    }
  
    // Log the final payload for debugging
    console.log('Final Payload:', finalPayload);
  
    // Call the API with the updated payload
    this.apiService.getSearchListing(finalPayload).subscribe({
      next: (response) => {
        // Handle the API response here
        console.log('API Response:', response.body);
        this.searchService.updateSearchResult(response.body);
      },
      error: (err) => {
        // Handle any errors
        console.error('API Error:', err);
      }
    });
    
  }

  private loadCollections(): void {
    this.imageService.getCollections().subscribe({
      next: (data) => {
        this.collectionsData = data.slice(0, 16);;
      },
      error: (err) => {
        console.error('Error loading collections data:', err);
      }
    });
  }
}
