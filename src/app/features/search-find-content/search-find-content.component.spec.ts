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
});
