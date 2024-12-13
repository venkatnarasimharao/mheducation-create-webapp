import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceSummaryCardComponent } from './price-summary-card.component';

describe('PriceSummaryCardComponent', () => {
  let component: PriceSummaryCardComponent;
  let fixture: ComponentFixture<PriceSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceSummaryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
