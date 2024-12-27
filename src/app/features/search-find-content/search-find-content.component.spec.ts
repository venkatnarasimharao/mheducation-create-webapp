import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFindContentComponent } from './search-find-content.component';
import { provideRouter } from '@angular/router';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

describe('SearchFindContentComponent', () => {
  let component: SearchFindContentComponent;
  let fixture: ComponentFixture<SearchFindContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFindContentComponent, PaginationComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFindContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct default value', () => {
    expect(component.selectProjectTitle).toBe('Test123');
    expect(component.selectFormatTitle).toBe('Please Select');
    expect(component.selectArrangeTitle).toBe('Arrange');
  });

  it('should update title on item selection', () => {
    const selectedItemOne = component.selectProjectItems;
    component.onSelect(selectedItemOne[0]);
    component.onSelected(selectedItemOne[1]);
    fixture.detectChanges();
    expect(component.selectProjectTitle).toBe(selectedItemOne[0].name);
    expect(component.selectFormatTitle).toBe(selectedItemOne[1].name);
  });

  it('should update currentpage number on page change',()=>{
    const newPage=4
    component.onPageChange(newPage);
    expect(component.currentPageNumber).toBe(newPage)
  })
});
