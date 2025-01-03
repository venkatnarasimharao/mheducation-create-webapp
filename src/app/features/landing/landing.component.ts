import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ImageGalleryService } from '../../core/services/image-gallery/image-gallery.service';
import { ImageCardComponent } from '../../shared/components/image-card/image-card.component';
import {Collection} from '../../shared/models/search.model';
@Component({
  selector: 'hec-landing',
  standalone: true,
  imports: [TranslateModule,RouterModule,ImageCardComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  collectionsData: Collection[] = [];

  constructor(
    private readonly imageService: ImageGalleryService
  ) {}

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
