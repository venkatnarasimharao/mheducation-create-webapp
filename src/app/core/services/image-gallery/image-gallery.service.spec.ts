import { TestBed } from '@angular/core/testing';
import { ImageGalleryService } from './image-gallery.service';
import { of } from 'rxjs';
import { COLLECTION_CODES } from '../../../shared/constants/search-payload.config';
import { Collection } from '../../../shared/models/search.model';

describe('ImageGalleryService', () => {
  let service: ImageGalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageGalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the correct image details by collection code', () => {
    const collectionCode = COLLECTION_CODES[0].code;
    const expectedResult = {
      name: COLLECTION_CODES[0].name,
      image: COLLECTION_CODES[0].image
    };
  
    const result = service.getImageByCode(collectionCode);
  
    expect(result).toEqual(expectedResult);
  });
  

  it('should return null for an invalid collection code', () => {
    const invalidCode = 'INVALID_CODE';

    const result = service.getImageByCode(invalidCode);

    expect(result).toBeNull();
  });

  it('should return all collections correctly', (done) => {
    service.getCollections().subscribe((collections: Collection[]) => {
      expect(collections).toEqual(COLLECTION_CODES); // Verify returned collections match the expected data
      done();
    });
  });

  it('should group collections by category correctly', (done) => {
    service.getGroupedCollections$().subscribe((groupedCollections) => {
      const grouped = COLLECTION_CODES.reduce((acc: { [key: string]: Collection[] }, collection: Collection) => {
        const category = collection.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(collection);
        return acc;
      }, {});

      const expectedGroupedCollections = Object.keys(grouped).map((category) => ({
        category,
        collections: grouped[category]
      }));

      expect(groupedCollections).toEqual(expectedGroupedCollections);
      done();
    });
  });
});
