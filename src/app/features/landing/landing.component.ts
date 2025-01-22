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
import { PayloadService } from '../../core/services/payload/payload.service';

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
  private payloadService = inject(PayloadService); 
  collectionsData: Collection[] = [];

  constructor(
    private readonly imageService: ImageGalleryService
  ) { }

  ngOnInit(): void {
    this.loadCollections();
  }

  handleSearch(event: { categories: string[]; term: string }) {
    console.log('Search Data:', event);
  
    const finalPayload = JSON.parse(JSON.stringify(USER_SEARCH_CONFIG));
  
    finalPayload.search.query = event.term;
    if (event.categories.includes('all')) {
      finalPayload.search.textTypes = { textType: ['all'] };
    } else {
      finalPayload.search.textTypes = { textType: event.categories };
      finalPayload.search.textNamespace = 'http://mhhe.com/primis/meta/resolved';
    }
  
    if (finalPayload.search.textTypes.textType.length === 3) {
      finalPayload.search.findable = true;
    } else {
      finalPayload.search.findable = false;
    }
  
  
    console.log('Final Payload:', finalPayload);
    this.payloadService.setPayload(finalPayload);

     // Update search service with the latest data
     this.searchService.updateSearchQuery(finalPayload.search.query, finalPayload.search.textTypes.textType, finalPayload.search.findable);
  
    this.apiService.getSearchListing(finalPayload).subscribe({
      next: (response) => {
        console.log('API Response:', JSON.parse(response.body));
        this.searchService.updateSearchResult(response.body);
      },
      error: (err) => {
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
