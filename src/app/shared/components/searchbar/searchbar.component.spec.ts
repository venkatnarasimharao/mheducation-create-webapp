import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchbarComponent } from './searchbar.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

describe('SearchbarComponent', () => {
  let component: SearchbarComponent;
  let fixture: ComponentFixture<SearchbarComponent>;
  let translateServiceMock: jasmine.SpyObj<TranslateService>;

  beforeEach(async () => {
    translateServiceMock = jasmine.createSpyObj('TranslateService', ['instant', 'get']);
    // Mock both instant and get methods
    translateServiceMock.instant.and.callFake((key: string) => key);
    translateServiceMock.get.and.callFake((key: string) => of(key));
    
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NgbDropdownModule,
        SearchbarComponent,
        TranslateModule.forRoot() // Add TranslateModule
      ],
      providers: [
        { provide: TranslateService, useValue: translateServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with default values', () => {
    expect(component).toBeTruthy();
    expect(component.searchbarTitle).toBe('');
    expect(component.placeholder).toBe('');
    expect(component.searchTerm).toBe('');
    expect(component.searchCategories.length).toBe(5);
    expect(component.searchCategories.every(cat => cat.checked)).toBeTrue();
  });

  describe('Category Toggle Functionality', () => {
    it('should handle "Search All" toggle correctly', () => {
      // Test toggling off
      component.onCategoryToggle('all', { target: { checked: false } } as unknown as Event);
      fixture.detectChanges();
      expect(component.searchCategories.every(cat => !cat.checked)).toBeTrue();
      
      // Test toggling on
      component.onCategoryToggle('all', { target: { checked: true } } as unknown as Event);
      fixture.detectChanges();
      expect(component.searchCategories.every(cat => cat.checked)).toBeTrue();
    });

    it('should update "Search All" based on other category selections', () => {
      // Uncheck one category and verify "Search All" gets unchecked
      component.onCategoryToggle('title', { target: { checked: false } } as unknown as Event);
      fixture.detectChanges();
      expect(component.searchCategories.find(cat => cat.id === 'all')?.checked).toBeFalse();

      // Check all individual categories and verify "Search All" gets checked
      component.searchCategories
        .filter(cat => cat.id !== 'all')
        .forEach(cat => {
          component.onCategoryToggle(cat.id, { target: { checked: true } } as unknown as Event);
          fixture.detectChanges();
        });
      expect(component.searchCategories.find(cat => cat.id === 'all')?.checked).toBeTrue();
    });
  });

  describe('Dropdown Label', () => {
    it('should display correct label based on selection', () => {
      // Test "Search All" label
      component.ngOnInit();
      fixture.detectChanges();
      expect(component['dropdownLabelText']).toBe('Search All');

      // Test no selection label
      component.onCategoryToggle('all', { target: { checked: false } } as unknown as Event);
      fixture.detectChanges();
      expect(component['dropdownLabelText']).toBe('Select Categories');

      // Test single category label
      component.onCategoryToggle('title', { target: { checked: true } } as unknown as Event);
      fixture.detectChanges();
      expect(component['dropdownLabelText']).toBe('Title');

      // Test multiple categories label
      component.onCategoryToggle('authors', { target: { checked: true } } as unknown as Event);
      fixture.detectChanges();
      expect(component['dropdownLabelText']).toBe('Title + 1');
    });
  });

  describe('Search Functionality', () => {
    it('should emit search event with correct data', () => {
      spyOn(component.searchEvent, 'emit');
      
      // Test with specific search criteria
      component.searchTerm = 'test search';
      component.onCategoryToggle('all', { target: { checked: false } } as unknown as Event);
      component.onCategoryToggle('title', { target: { checked: true } } as unknown as Event);
      component.onCategoryToggle('authors', { target: { checked: true } } as unknown as Event);
      fixture.detectChanges();
      
      component.onSearch();
      
      expect(component.searchEvent.emit).toHaveBeenCalledWith({
        categories: ['title', 'authors'],
        term: 'test search'
      });

      // Test with no categories selected
      component.onCategoryToggle('title', { target: { checked: false } } as unknown as Event);
      component.onCategoryToggle('authors', { target: { checked: false } } as unknown as Event);
      fixture.detectChanges();
      
      component.onSearch();
      
      expect(component.searchEvent.emit).toHaveBeenCalledWith({
        categories: [],
        term: 'test search'
      });
    });
  });
});