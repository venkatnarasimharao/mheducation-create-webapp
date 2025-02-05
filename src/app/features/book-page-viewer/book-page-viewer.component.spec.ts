import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPageViewerComponent } from './book-page-viewer.component';

describe('BookPageViewerComponent', () => {
  let component: BookPageViewerComponent;
  let fixture: ComponentFixture<BookPageViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookPageViewerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BookPageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
