import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbAccordionComponent } from './ngb-accordion.component';

describe('NgbAccordionComponent', () => {
  let component: NgbAccordionComponent;
  let fixture: ComponentFixture<NgbAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbAccordionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgbAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
