import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SearchCollectionBannerComponent } from './search-collection-banner.component';
import { ImageGalleryService } from '../../core/services/image-gallery/image-gallery.service';
import { of } from 'rxjs';
import { Collection } from '../../shared/models/search.model';

describe('SearchCollectionBannerComponent', () => {
  let component: SearchCollectionBannerComponent;
  let fixture: ComponentFixture<SearchCollectionBannerComponent>;
  let imageService: jasmine.SpyObj<ImageGalleryService>;

  beforeEach(async () => {
    // Mock ImageGalleryService
    const imageServiceSpy = jasmine.createSpyObj('ImageGalleryService', ['getImage', 'getCollections']);

    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [{ provide: ImageGalleryService, useValue: imageServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchCollectionBannerComponent);
    component = fixture.componentInstance;
    imageService = TestBed.inject(ImageGalleryService) as jasmine.SpyObj<ImageGalleryService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle no collections returned from service', () => {
    imageService.getCollections.and.returnValue(of([])); // Mock empty collections

    component.ngOnInit();

    expect(imageService.getCollections).toHaveBeenCalled();
    expect(component.collectionsData).toEqual([]);
    expect(component.title).toBe('No Collections Available');
    expect(component.image).toBeUndefined();
  });

  it('should load image and title when valid collections are returned', () => {
    const mockCollections: Collection[] = [
      { code: '1', name: 'Collection 1', image: 'image1.jpg', category: 'Category 1' },
      { code: '2', name: 'Collection 2', image: 'image2.jpg', category: 'Category 2' },
    ];
    const mockImage = 'image1.jpg';

    imageService.getCollections.and.returnValue(of(mockCollections)); // Mock collections
    imageService.getImage.and.returnValue(mockImage); // Mock image

    component.ngOnInit();

    expect(imageService.getCollections).toHaveBeenCalled();
    expect(imageService.getImage).toHaveBeenCalled();
    expect(component.image).toBe('image1.jpg');
    expect(component.title).toBe('Collection 1');
  });

  it('should fallback to first collection if no matching image is found', () => {
    const mockCollections: Collection[] = [
      { code: '1', name: 'Collection 1', image: 'image1.jpg', category: 'Category 1' },
      { code: '2', name: 'Collection 2', image: 'image2.jpg', category: 'Category 2' },
    ];
    const mockImage = 'non-existent.jpg';

    imageService.getCollections.and.returnValue(of(mockCollections)); // Mock collections
    imageService.getImage.and.returnValue(mockImage); // Mock non-matching image

    component.ngOnInit();

    expect(imageService.getCollections).toHaveBeenCalled();
    expect(imageService.getImage).toHaveBeenCalled();
    expect(component.image).toBe('image1.jpg');
    expect(component.title).toBe('Collection 1');
  });

  it('should handle undefined image from service', () => {
    const mockCollections: Collection[] = [
      { code: '1', name: 'Collection 1', image: 'image1.jpg', category: 'Category 1' },
    ];

    imageService.getCollections.and.returnValue(of(mockCollections)); // Mock collections
    imageService.getImage.and.returnValue(undefined); // Mock undefined image

    component.ngOnInit();

    expect(imageService.getCollections).toHaveBeenCalled();
    expect(imageService.getImage).toHaveBeenCalled();
    expect(component.image).toBe('image1.jpg'); // Fallback to the first collection
    expect(component.title).toBe('Collection 1');
  });
});
