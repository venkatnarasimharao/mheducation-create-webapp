import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ImageCardComponent } from './image-card.component';
import { provideRouter,Router } from '@angular/router';
import { ImageGalleryService } from '../../../core/services/image-gallery/image-gallery.service';

describe('ImageCardComponent', () => {
  let component: ImageCardComponent;
  let fixture: ComponentFixture<ImageCardComponent>;
  let mockImageService: jasmine.SpyObj<ImageGalleryService>;

  beforeEach(async () => {
    mockImageService = jasmine.createSpyObj('ImageGalleryService', ['setImage']);

    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: ImageGalleryService, useValue: mockImageService },
        provideRouter([]) // Router setup using `provideRouter`
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ImageCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setImage and navigate when viewDetails is called with a valid image', () => {
    component.image = 'test-image.jpg';
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.viewDetails(component.image);

    expect(mockImageService.setImage).toHaveBeenCalledWith('test-image.jpg');
    expect(router.navigate).toHaveBeenCalledWith(['/search-content'], { queryParams: { collectionCode: 'caseTopic' } });
  });

  it('should not call setImage or navigate when image is not set', () => {
    component.image = '';
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.viewDetails(component.image);

    expect(mockImageService.setImage).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should bind input values correctly', () => {
    component.image = 'test-image.jpg';
    component.name = 'Test Name';
    fixture.detectChanges();

    expect(component.image).toBe('test-image.jpg');
    expect(component.name).toBe('Test Name');
  });
});
