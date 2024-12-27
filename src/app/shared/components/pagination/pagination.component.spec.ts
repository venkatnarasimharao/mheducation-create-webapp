import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent,NgbPaginationModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept input properties', () => {
    component.currentPage = 1;
    component.totalPages = 100;
    component.maxSize = 5;
    fixture.detectChanges();
    expect(component.currentPage).toBe(1);
    expect(component.totalPages).toBe(100);
    expect(component.maxSize).toBe(5);
  });

  it('should emit pageChange event for valid page', () => {
    spyOn(component.pageChange, 'emit');
    const validpage = 3;
    component.currentPage = 3;
    component.totalPages = 100;
    component.onPageChange(validpage);

    expect(component.currentPage).toBe(validpage);
    expect(component.pageChange.emit).toHaveBeenCalledWith(validpage);
  });

  it('should not emit pageChange event for invalid page', () => {
    spyOn(component.pageChange, 'emit');
    spyOn(console, 'error');

    const invalidPage = 0;
    component.currentPage = 5;
    component.totalPages = 100;
    component.onPageChange(invalidPage);
    expect(component.currentPage).toBe(5);
    expect(component.pageChange.emit).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      `Invalid page number: ${invalidPage}. Must be between 1 and ${component.totalPages}.`
    );
  });
});
