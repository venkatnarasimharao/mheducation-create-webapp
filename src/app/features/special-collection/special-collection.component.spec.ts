import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SpecialCollectionComponent } from './special-collection.component';
import { TranslateModule } from '@ngx-translate/core';
import { ImageGalleryService } from '../../core/services/image-gallery/image-gallery.service';
import { of, throwError } from 'rxjs';
import { GroupedCollection } from '../../shared/models/search.model';

describe('SpecialCollectionComponent', () => {
  let component: SpecialCollectionComponent;
  let fixture: ComponentFixture<SpecialCollectionComponent>;
  let mockImageService: jasmine.SpyObj<ImageGalleryService>;

  beforeEach(async () => {
    mockImageService = jasmine.createSpyObj('ImageGalleryService', ['getGroupedCollections$']);

    await TestBed.configureTestingModule({
      imports: [
        SpecialCollectionComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        provideRouter([]),
        { provide: ImageGalleryService, useValue: mockImageService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialCollectionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load grouped collections on success', () => {
    const mockData: GroupedCollection[] = [
      { category: 'Category 1', collections: [] },
      { category: 'Category 2', collections: [] }
    ];
    mockImageService.getGroupedCollections$.and.returnValue(of(mockData));

    component.ngOnInit();

    expect(mockImageService.getGroupedCollections$).toHaveBeenCalled();
    expect(component.groupedCollections).toEqual(mockData);
  });

  it('should handle error when loading grouped collections', () => {
    const consoleSpy = spyOn(console, 'error'); // Spy on console.error
    mockImageService.getGroupedCollections$.and.returnValue(throwError(() => new Error('Error loading collections')));

    component.ngOnInit();

    expect(mockImageService.getGroupedCollections$).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('Error loading collections:', jasmine.any(Error));
    expect(component.groupedCollections).toEqual([]);
  });
});
