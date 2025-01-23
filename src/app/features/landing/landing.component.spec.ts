import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingComponent } from './landing.component';
import { TranslateModule } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { ImageGalleryService } from '../../core/services/image-gallery/image-gallery.service';
import { of, throwError } from 'rxjs';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let imageGalleryServiceMock: any;
  let consoleLogSpy: jasmine.Spy;

  beforeEach(async () => {
    // Create a mock for ImageGalleryService
    imageGalleryServiceMock = {
      getCollections: jasmine.createSpy('getCollections').and.returnValue(of([]))
    };

    await TestBed.configureTestingModule({
      imports: [
        LandingComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        provideRouter([]),
        { provide: ImageGalleryService, useValue: imageGalleryServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    consoleLogSpy = spyOn(console, 'log');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
