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

  // Test initial values
  describe('Initial Values', () => {
    it('should initialize dropdown titles correctly', () => {
      expect(component.selectProjectTitle).toBe('Test123');
      expect(component.selectFormatTitle).toBe('PleaseSelect');
      expect(component.selectArrangeTitle).toBe('Arrange');
    });

    it('should initialize dropdown headings correctly', () => {
      expect(component.selectProjectHeading).toBe('SelectProject');
      expect(component.selectFormatHeading).toBe('SelectFormat');
      expect(component.arrangeHeading).toBe('86 pgs / $12.46 est');
    });

    it('should initialize pagination values correctly', () => {
      expect(component.currentPageNumber).toBe(1);
      expect(component.totalPagesCount).toBe(100);
      expect(component.pagePerItem).toBe(5);
    });
  });

  // Test dropdown items
  describe('Dropdown Items', () => {
    it('should have correct project items', () => {
      expect(component.selectProjectItems).toEqual([
        { id: 1, name: 'Project1' },
        { id: 2, name: 'Project2' },
        { id: 3, name: 'Project3' }
      ]);
    });

    it('should have correct format items', () => {
      expect(component.selectFormatItems).toEqual([
        { id: 1, name: 'Format1' },
        { id: 2, name: 'Format2' },
        { id: 3, name: 'Format3' }
      ]);
    });
  });

  // Test selection methods
  describe('Selection Methods', () => {
    it('should update project title on selection', () => {
      const testItem = { id: 2, name: 'Project2' };
      component.onSelect(testItem);
      expect(component.selectProjectTitle).toBe('Project2');
    });

    it('should update format title on selection', () => {
      const testItem = { id: 2, name: 'Format2' };
      component.onSelected(testItem);
      expect(component.selectFormatTitle).toBe('Format2');
    });
  });

  // Test pagination
  describe('Pagination', () => {
    it('should update current page number', () => {
      const newPage = 3;
      spyOn(console, 'log');
      component.onPageChange(newPage);
      expect(component.currentPageNumber).toBe(newPage);
      expect(console.log).toHaveBeenCalledWith('Page changed to:', newPage);
    });

    it('should handle edge page numbers', () => {
      component.onPageChange(100);
      expect(component.currentPageNumber).toBe(100);

      component.onPageChange(1);
      expect(component.currentPageNumber).toBe(1);
    });
  });

  // Test collection filter
  describe('Collection Filter', () => {
    it('should have correct filter structure', () => {
      expect(component.collectionfilter.length).toBe(4);
      expect(component.collectionfilter[0].id).toBe('panel1');
      expect(component.collectionfilter[0].header).toBe('Type');
    });

    it('should have correct Type panel content', () => {
      const typePanel = component.collectionfilter[0];
      expect(typePanel.collectionTypes).toContain(
        jasmine.objectContaining({ label: 'Part', value: '(171)' })
      );
      expect(typePanel.collectionTypes.length).toBe(7);
    });

    it('should have correct InstructorMaterials panel content', () => {
      const materialsPanel = component.collectionfilter[1];
      expect(materialsPanel.collectionTypes).toEqual([
        { label: 'AvailableaseBook', value: '(305)' }
      ]);
    });

    it('should have correct PublicationYear panel content', () => {
      const yearPanel = component.collectionfilter[2];
      expect(yearPanel.collectionTypes.length).toBe(10);
      expect(yearPanel.collectionTypes).toContain(
        jasmine.objectContaining({ label: 'before2014', value: '(104)' })
      );
    });

    it('should have correct PageLength panel content', () => {
      const lengthPanel = component.collectionfilter[3];
      expect(lengthPanel.collectionTypes).toEqual([
        { label: 'Brief(1-4pages)', value: '(135)' },
        { label: 'Medium(5-9pages)', value: '(27)' },
        { label: 'Long(10+pages)', value: '(169)' }
      ]);
    });
  });
});