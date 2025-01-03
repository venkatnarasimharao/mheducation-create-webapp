import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbComponent } from './breadcrumb.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BreadcrumbComponent,
        RouterModule,
        RouterTestingModule,
        TranslateModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  // Test component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test breadcrumb list
  describe('Breadcrumb List', () => {
    it('should initialize with correct breadcrumb items', () => {
      expect(component.list.length).toBe(3);
      expect(component.list).toEqual([
        { label: 'FindContent', url: '/special-collection' },
        { label: 'BrowseCollections', url: '/special-collection' },
        { label: 'NegotiationCollection', url: '' }
      ]);
    });
  });

  // Test isLast method
  describe('isLast Method', () => {
    it('should correctly identify the last item', () => {
      const lastItem = component.list[component.list.length - 1];
      expect(component.isLast(lastItem)).toBeTrue();
    });

    it('should correctly identify non-last items', () => {
      const firstItem = component.list[0];
      const middleItem = component.list[1];
      expect(component.isLast(firstItem)).toBeFalse();
      expect(component.isLast(middleItem)).toBeFalse();
    });

    it('should handle checking all items in the list', () => {
      component.list.forEach((item, index) => {
        const expected = index === component.list.length - 1;
        expect(component.isLast(item)).toBe(expected);
      });
    });
  });

  // Test list modifications
  describe('List Modifications', () => {
    it('should correctly identify last item after adding new items', () => {
      const newItem = { label: 'NewItem', url: '/new' };
      component.list.push(newItem);
      expect(component.isLast(newItem)).toBeTrue();
      expect(component.isLast(component.list[2])).toBeFalse();
    });

    it('should correctly identify last item after removing items', () => {
      const originalLastItem = component.list[component.list.length - 1];
      expect(component.isLast(originalLastItem)).toBeTrue();
      
      component.list.pop();
      const newLastItem = component.list[component.list.length - 1];
      expect(component.isLast(newLastItem)).toBeTrue();
      expect(component.isLast(originalLastItem)).toBeFalse();
    });
  });

  // Test edge cases
  describe('Edge Cases', () => {
    it('should handle empty list', () => {
      const originalList = [...component.list];
      component.list = [];
      
      // Should not throw error when list is empty
      expect(() => component.isLast({ label: 'test', url: '' })).not.toThrow();
      
      // Restore original list
      component.list = originalList;
    });

    it('should handle null or undefined items', () => {
      expect(component.isLast(null)).toBeFalse();
      expect(component.isLast(undefined)).toBeFalse();
    });

    it('should handle items not in the list', () => {
      const nonExistentItem = { label: 'NonExistent', url: '/none' };
      expect(component.isLast(nonExistentItem)).toBeFalse();
    });
  });

  // Test DOM rendering
  describe('DOM Rendering', () => {
    it('should render all breadcrumb items', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const items = compiled.querySelectorAll('.breadcrumb-item');
      expect(items.length).toBe(component.list.length);
    });
  });
});