import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ImageGalleryService } from '../../core/services/image-gallery/image-gallery.service';
import {Collection} from '../../shared/models/search.model';
@Component({
  selector: 'hec-search-collection-banner',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './search-collection-banner.component.html',
  styleUrl: './search-collection-banner.component.scss'
})
export class SearchCollectionBannerComponent {
collectionsData: { code: string; name: string; image: string; category: string }[] = [];
image: string | undefined = undefined;
title: string = 'Default Title';

  constructor(private readonly imageService: ImageGalleryService) {}

  ngOnInit(): void {
    this.loadCollections();
  }
  
  loadCollections(): void {
    this.imageService.getCollections().subscribe((collections: Collection[]) => {
      this.collectionsData = collections;

      if (collections.length > 0) {
        this.loadImageAndTitle(collections);
      } else {
        this.title = 'No Collections Available';
        this.image = undefined;
      }
    });
  }

 

  loadImageAndTitle(collections: Collection[]): void {
    const loadedImage = this.imageService.getImage(); 
   
    const matchingCollection = collections.find(
      (collection) => collection.image === loadedImage
    );

    if (matchingCollection) {
      this.image = matchingCollection.image;
      this.title = matchingCollection.name;
    } else {
     
      this.image = collections[0].image;
      this.title = collections[0].name;
    }
  }
}
