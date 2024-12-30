import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchbarComponent } from './searchbar.component';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('SearchbarComponent', () => {
  let component: SearchbarComponent;
  let fixture: ComponentFixture<SearchbarComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchbarComponent, FormsModule, NgbDropdownModule, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchbarComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  // Test areAllCategoriesChecked function
  it('should correctly check if all categories are checked', () => {
    
    component.toggleSearchAll(false);
    
    expect(component.areAllCategoriesChecked()).toBeFalse();
    
    // Check each non-'all' category individually
    component.searchCategories
      .filter(category => category.id !== 'all')
      .forEach(category => {
        category.checked = true;
      });

    expect(component.areAllCategoriesChecked()).toBeTrue();

    const titleCategory = component.searchCategories.find(cat => cat.id === 'title');
    if (titleCategory) {
      titleCategory.checked = false;
    }

    // Verify that areAllCategoriesChecked returns false when one category is unchecked
    expect(component.areAllCategoriesChecked()).toBeFalse();
  });

  // Test toggleSearchAll function
  it('should toggle all search categories', () => {
    // Test unchecking all
    component.toggleSearchAll(false);
    expect(component.searchCategories.every(cat => !cat.checked)).toBeTrue();
    expect(component.checkedOptions.length).toBe(0);

    // Test checking all
    component.toggleSearchAll(true);
    expect(component.searchCategories.every(cat => cat.checked)).toBeTrue();
    // Should include all categories except 'all'
    expect(component.checkedOptions.length).toBe(4);
    expect(component.checkedOptions.every(opt => opt.id !== 'all')).toBeTrue();
  });

  // Test ngOnInit function
  it('should initialize component correctly', () => {
    component.ngOnInit();
    expect(component.searchCategories.every(cat => cat.checked)).toBeTrue();
    expect(component.dropdownLabelText).toBe('SearchAll');
    expect(component.checkedOptions.length).toBe(4); // All except 'all'
  });

  // Test onCategoryToggle function
  describe('onCategoryToggle', () => {
    it('should handle "Search All" category toggle', () => {
      const searchAllCategory = component.searchCategories.find(cat => cat.id === 'all');
      const event = { target: { checked: false } } as any;
      
      component.onCategoryToggle(searchAllCategory!, event);
      expect(component.searchCategories.every(cat => !cat.checked)).toBeTrue();
      expect(component.checkedOptions.length).toBe(0);
    });

    it('should handle individual category toggle', () => {
      // First uncheck all
      component.toggleSearchAll(false);
      
      // Then check one category
      const titleCategory = component.searchCategories.find(cat => cat.id === 'title');
      const event = { target: { checked: true } } as any;
      
      component.onCategoryToggle(titleCategory!, event);
      expect(component.checkedOptions.length).toBe(1);
      expect(component.checkedOptions[0].id).toBe('title');
      expect(component.checkedOptions[0].label).toBe('Title');
    });

    it('should update Search All when all individual categories are checked', () => {
      // First uncheck all categories
      component.toggleSearchAll(false);
      expect(component.checkedOptions.length).toBe(0);
      
      // Get all non-search-all categories
      const nonSearchAllCategories = component.searchCategories
        .filter(cat => cat.id !== 'all');
      
      // Check each category individually
      nonSearchAllCategories.forEach(category => {
        // Create a mock event and set checked to true
        const mockEvent = {
          target: { checked: true }
        } as unknown as Event;
        
        // Update the category's checked status
        category.checked = true;
        
        // Call onCategoryToggle
        component.onCategoryToggle(category, mockEvent);
      });
  
      // Verify that all categories are checked
      expect(component.checkedOptions.length).toBe(nonSearchAllCategories.length);
      
      const searchAll = component.searchCategories.find(cat => cat.id === 'all');
      expect(searchAll?.checked).toBeTrue();
    });
  });

  // Test getDropdownLabel function
  describe('getDropdownLabel', () => {
    it('should set label to "SearchAll" when all categories are checked', () => {
      component.toggleSearchAll(true);
      component.getDropdownLabel();
      expect(component.dropdownLabelText).toBe('SearchAll');
    });

    it('should set label to category name when one category is selected', () => {
      component.toggleSearchAll(false);
      const titleCategory = component.searchCategories.find(cat => cat.id === 'title');
      const event = { target: { checked: true } } as any;
      component.onCategoryToggle(titleCategory!, event);
      expect(component.dropdownLabelText).toBe('Title');
    });

    it('should set label with count when multiple categories are selected', () => {
      component.toggleSearchAll(false);
      
      const titleCategory = component.searchCategories.find(cat => cat.id === 'title');
      const descCategory = component.searchCategories.find(cat => cat.id === 'description');
      
      component.onCategoryToggle(titleCategory!, { target: { checked: true } } as any);
      component.onCategoryToggle(descCategory!, { target: { checked: true } } as any);
      
      expect(component.dropdownLabelText).toBe('Title + 1');
    });

    it('should set default label when no categories are selected', () => {
      component.toggleSearchAll(false);
      expect(component.dropdownLabelText).toBe('Select Categories');
    });
  });

  // Test onSearch function
  describe('onSearch', () => {
    beforeEach(() => {
      spyOn(component.searchEvent, 'emit');
    });

    it('should emit "all" when Search All is checked', () => {
      component.searchTerm = 'test';
      component.toggleSearchAll(true);
      component.onSearch();
      
      expect(component.searchEvent.emit).toHaveBeenCalledWith({
        categories: ['all'],
        term: 'test'
      });
    });

    it('should emit only selected categories when specific categories are checked', () => {
      component.toggleSearchAll(false);
      const titleCategory = component.searchCategories.find(cat => cat.id === 'title');
      component.onCategoryToggle(titleCategory!, { target: { checked: true } } as any);
      component.searchTerm = 'test';
      component.onSearch();
      
      expect(component.searchEvent.emit).toHaveBeenCalledWith({
        categories: ['title'],
        term: 'test'
      });
    });

    it('should emit empty categories array when no categories are selected', () => {
      component.toggleSearchAll(false);
      component.searchTerm = 'test';
      component.onSearch();
      
      expect(component.searchEvent.emit).toHaveBeenCalledWith({
        categories: [],
        term: 'test'
      });
    });
  });

  // Test Input properties
  it('should set input properties correctly', () => {
    component.searchbarTitle = 'Test Title';
    component.placeholder = 'Test Placeholder';
    
    expect(component.searchbarTitle).toBe('Test Title');
    expect(component.placeholder).toBe('Test Placeholder');
  });
});