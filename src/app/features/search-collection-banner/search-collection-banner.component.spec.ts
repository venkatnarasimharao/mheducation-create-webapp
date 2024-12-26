import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SearchCollectionBannerComponent } from './search-collection-banner.component';
import { ImageGalleryService } from '../../core/services/image-gallery/image-gallery.service';
import { of } from 'rxjs'; // Import of for creating observables
 
describe('SearchCollectionBannerComponent', () => {
  let component: SearchCollectionBannerComponent;
  let fixture: ComponentFixture<SearchCollectionBannerComponent>;
  let imageService: jasmine.SpyObj<ImageGalleryService>; // Spy on the service
 
  beforeEach(async () => {
    // Create a mock service
    const imageServiceSpy = jasmine.createSpyObj('ImageGalleryService', ['getImage']);
 
    await TestBed.configureTestingModule({
      imports: [SearchCollectionBannerComponent, TranslateModule.forRoot()],
      providers: [{ provide: ImageGalleryService, useValue: imageServiceSpy }], // Provide the mock
    }).compileComponents();
 
    fixture = TestBed.createComponent(SearchCollectionBannerComponent);
    component = fixture.componentInstance;
    imageService = TestBed.inject(ImageGalleryService) as jasmine.SpyObj<ImageGalleryService>; // Inject the mock
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should load image on init', () => {
    const mockImage = 'test-image.jpg';
    imageService.getImage.and.returnValue(mockImage); // Set the return value of the spy
 
    component.ngOnInit(); // Explicitly call ngOnInit
 
    expect(imageService.getImage).toHaveBeenCalled(); // Check if the service method was called
    expect(component.image).toBe(mockImage); // Check if the image property is set
  });
 
    it('should handle no image returned from service', () => {
        imageService.getImage.and.returnValue(null);
        component.ngOnInit();
        expect(component.image).toBeNull();
    });
 
    it('should handle empty string returned from service', () => {
        imageService.getImage.and.returnValue("");
        component.ngOnInit();
        expect(component.image).toBe("");
    });
 
    it('should handle undefined returned from service', () => {
        imageService.getImage.and.returnValue(undefined);
        component.ngOnInit();
        expect(component.image).toBeUndefined();
    });
});