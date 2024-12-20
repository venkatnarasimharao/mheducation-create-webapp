import { Injectable } from '@angular/core';
import { COLLECTION_CODES } from '../../../shared/constants/search-payload.config';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

interface Collection {
  code: string;
  name: string;
  image: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageGalleryService {
  private image: string = '';
  private collections: Collection[] = COLLECTION_CODES;

  setImage(image: string): void {
    this.image = image;
  }

  getImage(): string {
    return this.image;
  }

  getCollections(): Observable<Collection[]> {
    return of(this.collections);
  }

  getGroupedCollections$(): Observable<{ category: string; collections: Collection[] }[]> {
    return of(this.collections).pipe(
      map((collections: Collection[]) => {
        const grouped = collections.reduce((acc: { [key: string]: Collection[] }, collection: Collection) => {
          const category = collection.category;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(collection);
          return acc;
        }, {} as { [key: string]: Collection[] });

        return Object.keys(grouped).map(category => ({
          category,
          collections: grouped[category]
        }));
      })
    );
  }
}
