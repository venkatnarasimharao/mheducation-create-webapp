import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsecollectionsComponent } from './browsecollections.component';

describe('BrowsecollectionsComponent', () => {
  let component: BrowsecollectionsComponent;
  let fixture: ComponentFixture<BrowsecollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowsecollectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowsecollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
