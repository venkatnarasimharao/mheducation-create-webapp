import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegotiationCollectionComponent } from './negotiation-collection.component';

describe('NegotiationCollectionComponent', () => {
  let component: NegotiationCollectionComponent;
  let fixture: ComponentFixture<NegotiationCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NegotiationCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NegotiationCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
