import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchbarComponent } from './searchbar.component';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';

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

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should toggle all categories when "Search All" is checked', () => {
    const searchAllCheckbox = component.searchCategories.find(c => c.id === 'all');
    const event = { target: { checked: true } } as Event & { target: HTMLInputElement };

    component.onCategoryToggle('all', event);
    expect(searchAllCheckbox?.checked).toBe(true);
    expect(component.searchCategories.slice(1).every(cat => cat.checked)).toBe(true);
    expect(component.checkedOptions.length).toBe(5); // All options should be selected
  });

  it('should update dropdown label when multiple categories are selected', () => {
    // Select multiple categories
    const event1 = { target: { checked: true } } as Event & { target: HTMLInputElement };
    const event2 = { target: { checked: true } } as Event & { target: HTMLInputElement };
    
    component.onCategoryToggle('title', event1);
    component.onCategoryToggle('authors', event2);

    component.getDropdownLabel();
    expect(component.dropdownLabelText).toBe('Title + 1'); // First category + 1 more selected
  });

  it('should update dropdown label when a single category is selected', () => {
    // Select only one category
    const event = { target: { checked: true } } as Event & { target: HTMLInputElement };

    component.onCategoryToggle('description', event);

    component.getDropdownLabel();
    expect(component.dropdownLabelText).toBe('Keywords'); // Only one category selected
  });

  it('should emit search data when search button is clicked', () => {
    spyOn(component.searchEvent, 'emit');
    component.searchTerm = 'test search';
    component.checkedOptions = [
      { label: 'Keywords', id: 'description' },
    ];

    component.onSearch();

    expect(component.searchEvent.emit).toHaveBeenCalledWith({
      categories: ['description'],
      term: 'test search',
    });
  });


  it('should call onCategoryToggle when a category is toggled', () => {
    const categoryId = 'description';
    const event = { target: { checked: true } } as Event & { target: HTMLInputElement };

    spyOn(component, 'onCategoryToggle');
    component.onCategoryToggle(categoryId, event);
    expect(component.onCategoryToggle).toHaveBeenCalledWith(categoryId, event);
  });

  it('should properly handle SearchAll toggling', () => {
    const eventTrue = { target: { checked: true } } as Event & { target: HTMLInputElement };
    const eventFalse = { target: { checked: false } } as Event & { target: HTMLInputElement };

    // Ensure toggling "Search All" checks all categories
    component.onCategoryToggle('all', eventTrue);
    expect(component.searchCategories.slice(1).every(cat => cat.checked)).toBe(true);

    // Ensure toggling "Search All" off unchecks all categories
    component.onCategoryToggle('all', eventFalse);
    expect(component.searchCategories.slice(1).every(cat => !cat.checked)).toBe(true);
  });

  it('should update dropdown label when all categories are selected', () => {
    component.toggleSearchAll(true); // Select all categories
    component.getDropdownLabel();
    expect(component.dropdownLabelText).toBe('SearchAll');
  });

  it('should handle ngOnInit correctly', () => {
    spyOn(component, 'toggleSearchAll');
    spyOn(component, 'getDropdownLabel');

    component.ngOnInit();

    expect(component.toggleSearchAll).toHaveBeenCalledWith(true);
    expect(component.getDropdownLabel).toHaveBeenCalled();
  });

  it('should disable categories except "Search All" when "Search All" is checked', () => {
    component.toggleSearchAll(true);
    component.searchCategories.forEach((category) => {
      if (category.id !== 'all') {
        expect(category.disabled).toBe(true);
      }
    });
  });

  it('should enable all categories when "Search All" is unchecked', () => {
    component.toggleSearchAll(false);
    component.searchCategories.forEach((category) => {
      expect(category.disabled).toBe(false);
    });
  });

  it('should add and remove categories from checkedOptions when toggled', () => {
    const event1 = { target: { checked: true } } as Event & { target: HTMLInputElement };
    const event2 = { target: { checked: false } } as Event & { target: HTMLInputElement };

    component.onCategoryToggle('title', event1);
    expect(component.checkedOptions.length).toBe(1);
    expect(component.checkedOptions[0].id).toBe('title');

    component.onCategoryToggle('title', event2);
    expect(component.checkedOptions.length).toBe(0);
  });
});
