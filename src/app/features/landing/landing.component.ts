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
  collectionsData: Collection[] = [];

  constructor(
    private readonly imageService: ImageGalleryService
  ) { }

  ngOnInit(): void {
    this.loadCollections();
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
