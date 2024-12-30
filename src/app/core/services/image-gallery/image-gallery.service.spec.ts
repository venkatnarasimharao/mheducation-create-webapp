import { TestBed } from '@angular/core/testing';
import { ImageGalleryService } from './image-gallery.service';
import { of } from 'rxjs';
import { COLLECTION_CODES } from '../../../shared/constants/search-payload.config';

describe('ImageGalleryService', () => {
  let service: ImageGalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageGalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get the image correctly', () => {
    const testImage = 'test-image.jpg';

    service.setImage(testImage); // Set the image
    const result = service.getImage(); // Get the image

    expect(result).toBe(testImage); // Verify the retrieved image matches the set image
  });

  it('should return collections correctly', (done) => {
    service.getCollections().subscribe((collections) => {
      expect(collections).toEqual(COLLECTION_CODES); // Verify the returned collections match the expected data
      done();
    });
  });

  it('should return grouped collections correctly', (done) => {
    service.getGroupedCollections$().subscribe((groupedCollections) => {
      // Group the collections by category
      const grouped = COLLECTION_CODES.reduce((acc: { [key: string]: any[] }, collection) => {
        const category = collection.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(collection);
        return acc;
      }, {});

      const expectedGroupedCollections = Object.keys(grouped).map((category) => ({
        category,
        collections: grouped[category],
      }));

      // Verify the grouped collections match the expected output
      expect(groupedCollections).toEqual(expectedGroupedCollections);
      done();
    });
  });
});
