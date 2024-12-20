import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialCollectionComponent } from './special-collection.component';

describe('SpecialCollectionComponent', () => {
  let component: SpecialCollectionComponent;
  let fixture: ComponentFixture<SpecialCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
