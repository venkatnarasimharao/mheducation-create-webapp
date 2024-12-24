import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCollectionBannerComponent } from './search-collection-banner.component';

describe('SearchCollectionBannerComponent', () => {
  let component: SearchCollectionBannerComponent;
  let fixture: ComponentFixture<SearchCollectionBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCollectionBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCollectionBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
