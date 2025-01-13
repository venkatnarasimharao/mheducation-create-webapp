import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ImageCardComponent } from './image-card.component';
import { provideRouter, Router } from '@angular/router';
import { ImageGalleryService } from '../../../core/services/image-gallery/image-gallery.service';
import { SearchCollectionInterface } from '../../models/search.model';

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
        provideRouter([]),
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

  it('should navigate with collectionCode when viewDetails is called', () => {
    const mockCardData: SearchCollectionInterface = {
      code: 'test-code',
      name: 'Test Collection',
      image: 'test-image.jpg'
    };

    component.cardData = mockCardData;
    spyOn(router, 'navigate');

    component.viewDetails();
    expect(router.navigate).toHaveBeenCalledWith(['/search-content'], { queryParams: { collectionCode: 'test-code' } });
  });

  it('should not navigate when collectionCode is undefined', () => {
    const mockCardData: SearchCollectionInterface = {
      code: '',
      name: 'Test Collection',
      image: 'test-image.jpg'
    };

    component.cardData = mockCardData;
    spyOn(router, 'navigate');

    component.viewDetails(); 

    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should bind input values correctly', () => {
    const mockCardData: SearchCollectionInterface = {
      code: 'test-code',
      name: 'Test Collection',
      image: 'test-image.jpg'
    };

    component.cardData = mockCardData;
    fixture.detectChanges();

    expect(component.cardData.code).toBe('test-code');
    expect(component.cardData.name).toBe('Test Collection');
    expect(component.cardData.image).toBe('test-image.jpg');
  });
});