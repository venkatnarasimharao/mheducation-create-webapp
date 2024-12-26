import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ImageGalleryService } from '../../core/services/image-gallery/image-gallery.service';

@Component({
  selector: 'hec-search-collection-banner',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './search-collection-banner.component.html',
  styleUrl: './search-collection-banner.component.scss'
})
export class SearchCollectionBannerComponent {
collectionsData: { code: string; name: string; image: string; category: string }[] = [];
  image: string = '';

  constructor(private readonly imageService: ImageGalleryService) {}

  ngOnInit(): void {
    this.loadImage();
  }

  private loadImage(): void {
    this.image = this.imageService.getImage();
  }
}
