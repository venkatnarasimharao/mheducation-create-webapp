import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PaginationComponent,
        NgbPaginationModule,
        TranslateModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    
    // Set default input values
    component.currentPage = 1;
    component.totalPages = 10;
    component.maxSize = 5;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with provided input values', () => {
    expect(component.currentPage).toBe(1);
    expect(component.totalPages).toBe(10);
    expect(component.maxSize).toBe(5);
  });

  it('should emit page change event for valid page number', () => {
    spyOn(component.pageChange, 'emit');
    const validPage = 1;
    
    component.onPageChange(validPage);
    
    expect(component.pageChange.emit).toHaveBeenCalledWith(validPage);
    expect(component.currentPage).toBe(validPage);
  });

  it('should log error for invalid page number', () => {
    spyOn(console, 'error');
    const invalidPage = 11;
    
    component.onPageChange(invalidPage);
    
    expect(console.error).toHaveBeenCalledWith(
      `Invalid page number: ${invalidPage}. Must be between 1 and ${component.totalPages}.`
    );
  });

  it('should not emit page change event for invalid page number', () => {
    spyOn(component.pageChange, 'emit');
    const invalidPage = 0;
    
    component.onPageChange(invalidPage);
    
    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });
});