import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterAccordionComponent } from './filter-accordion.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('FilterAccordionComponent', () => {
  let component: FilterAccordionComponent;
  let fixture: ComponentFixture<FilterAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FilterAccordionComponent,
        NgbAccordionModule,
        TranslateModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});