import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAccordionComponent } from './filter-accordion.component';

describe('FilterAccordionComponent', () => {
  let component: FilterAccordionComponent;
  let fixture: ComponentFixture<FilterAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterAccordionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
