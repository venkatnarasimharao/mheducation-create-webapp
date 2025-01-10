import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchFindContentComponent } from './search-find-content.component';
import { provideRouter } from '@angular/router';

describe('SearchFindContentComponent', () => {
  let component: SearchFindContentComponent;
  let fixture: ComponentFixture<SearchFindContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SearchFindContentComponent
      ],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFindContentComponent);
    component = fixture.componentInstance;
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
