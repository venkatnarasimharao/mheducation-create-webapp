import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-findcontent',
  standalone: true,
  imports: [NgbDropdownModule, CommonModule,A11yModule,BreadcrumbComponent],
  templateUrl: './findcontent.component.html',
  styleUrl: './findcontent.component.scss',
})
export class FindcontentComponent {
  value: any = '86 pgs / $12.46 est';
  dropdownList: string[] = ['item1', 'item2', 'item3', 'item4'];

  @ViewChildren('dropdownItem') dropdownItems!: QueryList<ElementRef<HTMLButtonElement>>;

  onItemSelect(item: string): void {
    console.log('Selected item:', item);
  }

  trapFocus(event: KeyboardEvent): void {
    const items = this.dropdownItems.toArray();
    const firstItem = items[0]?.nativeElement;
    const lastItem = items[items.length - 1]?.nativeElement;

    if (!firstItem || !lastItem) return;

    // Trap focus within the dropdown
    if (event.key === 'Tab') {
      if (event.shiftKey && document.activeElement === firstItem) {
        // Shift + Tab on the first item: move focus to the last item
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        // Tab on the last item: move focus to the first item
        event.preventDefault();
        firstItem.focus();
      }
    }
  }
}
