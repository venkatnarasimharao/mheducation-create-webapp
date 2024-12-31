import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ImageCardComponent } from './image-card.component';
import { provideRouter, Router } from '@angular/router';
import { ImageGalleryService } from '../../../core/services/image-gallery/image-gallery.service';

describe('ImageCardComponent', () => {
  let component: ImageCardComponent;
  let fixture: ComponentFixture<ImageCardComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot()
      ],
      providers: [
        provideRouter([]), // Router setup using `provideRouter`
        ImageGalleryService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ImageCardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate with collectionCode when viewDetails is called and image is set', () => {
    component.image = 'test-image.jpg';
    component.collectionCode = 'test-code';
    spyOn(router, 'navigate');

    component.viewDetails(component.image);

    expect(router.navigate).toHaveBeenCalledWith(['/search-content'], { queryParams: { collectionCode: 'test-code' } });
  });

  it('should not navigate when image is not set', () => {
    component.image = '';
    component.collectionCode = 'test-code';
    spyOn(router, 'navigate');

    component.viewDetails(component.image);

    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should bind input values correctly', () => {
    component.image = 'test-image.jpg';
    component.name = 'Test Name';
    component.collectionCode = 'test-code';
    fixture.detectChanges();

    expect(component.image).toBe('test-image.jpg');
    expect(component.name).toBe('Test Name');
    expect(component.collectionCode).toBe('test-code');
  });
});
