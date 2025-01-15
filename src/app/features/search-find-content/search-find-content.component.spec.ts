import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchFindContentComponent } from './search-find-content.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { FilterAccordionComponent } from '../../shared/components/filter-accordion/filter-accordion.component';
import { NgbDropdownToggleNoCaretDirective } from '../../shared/directives/dropdown-toggle-css.directive';

describe('SearchFindContentComponent', () => {
  let component: SearchFindContentComponent;
  let fixture: ComponentFixture<SearchFindContentComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SearchFindContentComponent,
        TranslateModule.forRoot(),
        NgbDropdownModule,
        RouterTestingModule,
        BreadcrumbComponent,
        PaginationComponent,
        FilterAccordionComponent,
        NgbDropdownToggleNoCaretDirective
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFindContentComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update selectProjectTitle when onSelect is called', () => {
    const testItem = { id: 1, name: 'Project Test' };
    component.onSelect(testItem);

    expect(component.selectProjectTitle).toBe(testItem.name);
  });

  it('should update selectFormatTitle when onSelected is called', () => {
    const testItem = { id: 1, name: 'Format Test' };
    component.onSelected(testItem);

    expect(component.selectFormatTitle).toBe(testItem.name);
  });
});
