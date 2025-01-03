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

  it('should initialize with empty collectionfilterData', () => {
    expect(component.collectionfilterData).toEqual([]);
  });

  it('should set collectionfilterData when provided', () => {
    const testData = [
      {
        id: 'panel1',
        header: 'Type',
        collectionTypes: [
          { label: 'Part', value: '(171)' }
        ]
      }
    ];

    component.collectionfilterData = testData;
    expect(component.collectionfilterData).toEqual(testData);
  });

  it('should handle checkbox change event', () => {
    spyOn(console, 'log');
    const mockEvent = { target: { checked: true }} as any;
    const mockItem = { label: 'Test Item' };

    component.onCheckBoxChange(mockEvent, mockItem);
    
    expect(console.log).toHaveBeenCalledWith('the Test Item checkbox  is checked');
  });

  it('should handle unchecked checkbox event', () => {
    spyOn(console, 'log');
    const mockEvent = { target: { checked: false }} as any;
    const mockItem = { label: 'Test Item' };

    component.onCheckBoxChange(mockEvent, mockItem);
    
    expect(console.log).toHaveBeenCalledWith('the Test Item checkbox  is unchecked');
  });
});