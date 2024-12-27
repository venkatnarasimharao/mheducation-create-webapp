import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchbarComponent } from './searchbar.component';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('SearchbarComponent', () => {
  let component: SearchbarComponent;
  let fixture: ComponentFixture<SearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchbarComponent, FormsModule, NgbDropdownModule, TranslateModule.forRoot()],
      providers: [TranslateService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with "Search All" checked and others disabled', () => {
    component.ngOnInit();
    const allOption = component.searchCategories.find((cat) => cat.id === 'all');
    const otherOptions = component.searchCategories.filter((cat) => cat.id !== 'all');

    expect(allOption?.checked).toBeTrue();
    expect(otherOptions.every((opt) => opt.disabled)).toBeTrue();
    expect(component.dropdownLabelText).toBe('Search All');
  });

  it('should disable other options when "Search All" is toggled on', () => {
    component.onCategoryToggle('all', { target: { checked: true } } as any);

    const otherOptions = component.searchCategories.filter((cat) => cat.id !== 'all');
    expect(otherOptions.every((opt) => opt.disabled)).toBeTrue();
    expect(component.checkedOptions.length).toBe(component.searchCategories.length);
    expect(component.dropdownLabelText).toBe('Search All');
  });

  it('should enable other options when "Search All" is toggled off', () => {
    component.onCategoryToggle('all', { target: { checked: false } } as any);

    const otherOptions = component.searchCategories.filter((cat) => cat.id !== 'all');
    expect(otherOptions.every((opt) => opt.disabled)).toBeFalse();
    expect(component.checkedOptions.length).toBe(0);
    expect(component.dropdownLabelText).toBe('Select Categories');
  });

  it('should update the label when a single category is selected', () => {
    component.onCategoryToggle('description', { target: { checked: true } } as any);
    expect(component.dropdownLabelText).toBe('Keywords');
  });

  it('should update the label when multiple categories are selected', () => {
    component.onCategoryToggle('description', { target: { checked: true } } as any);
    component.onCategoryToggle('title', { target: { checked: true } } as any);

    expect(component.dropdownLabelText).toBe('Keywords + 1');
  });

  it('should reset to "Search All" when all categories are checked', () => {
    component.onCategoryToggle('description', { target: { checked: true } } as any);
    component.onCategoryToggle('title', { target: { checked: true } } as any);
    component.onCategoryToggle('authors', { target: { checked: true } } as any);
    component.onCategoryToggle('isbn', { target: { checked: true } } as any);

    const allOption = component.searchCategories.find((cat) => cat.id === 'all');
    expect(allOption?.checked).toBeTrue();
    expect(component.dropdownLabelText).toBe('Search All');
  });

  it('should correctly handle toggling off a category when all were previously checked', () => {
    component.onCategoryToggle('description', { target: { checked: true } } as any);
    component.onCategoryToggle('title', { target: { checked: true } } as any);
    component.onCategoryToggle('authors', { target: { checked: true } } as any);
    component.onCategoryToggle('isbn', { target: { checked: true } } as any);

    // Toggle off "Keywords"
    component.onCategoryToggle('description', { target: { checked: false } } as any);

    const allOption = component.searchCategories.find((cat) => cat.id === 'all');
    expect(allOption?.checked).toBeFalse();
    expect(component.dropdownLabelText).toBe('Title + 3');
  });

  it('should emit the correct search data on search', () => {
    spyOn(component.searchEvent, 'emit');

    component.onCategoryToggle('description', { target: { checked: true } } as any);
    component.searchTerm = 'Angular';

    component.onSearch();

    expect(component.searchEvent.emit).toHaveBeenCalledWith({
      categories: ['description'],
      term: 'Angular',
    });
  });

  it('should emit empty categories if none are selected on search', () => {
    spyOn(component.searchEvent, 'emit');

    component.searchTerm = 'Angular';
    component.onCategoryToggle('all', { target: { checked: false } } as any);

    component.onSearch();

    expect(component.searchEvent.emit).toHaveBeenCalledWith({
      categories: [],
      term: 'Angular',
    });
  });

  it('should toggle checkedOptions correctly', () => {
    component.onCategoryToggle('description', { target: { checked: true } } as any);
    expect(component.checkedOptions.some((opt) => opt.id === 'description')).toBeTrue();

    component.onCategoryToggle('description', { target: { checked: false } } as any);
    expect(component.checkedOptions.some((opt) => opt.id === 'description')).toBeFalse();
  });

  it('should handle edge cases in getDropdownLabel', () => {
    component.checkedOptions = [];
    expect(component.getDropdownLabel()).toBe('Select Categories');

    component.checkedOptions = [{ label: 'Title', id: 'title' }];
    expect(component.getDropdownLabel()).toBe('Title');

    component.checkedOptions = [
      { label: 'Keywords', id: 'description' },
      { label: 'Title', id: 'title' },
    ];
    expect(component.getDropdownLabel()).toBe('Keywords + 1');
  });
});
