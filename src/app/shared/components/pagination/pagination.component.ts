import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'hec-pagination',
  standalone: true,
  imports: [NgbPaginationModule, TranslateModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() currentPage!: number;
@Input() totalPages!: number;
@Input() maxSize!: number;

@Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

translate: TranslateService = inject(TranslateService);

get pages(): (number | string)[] {
  const pages: (number | string)[] = [];
  const showEllipsisStart = this.currentPage > 3;
  const showEllipsisEnd = this.currentPage < (this.totalPages - 2);

  if (showEllipsisStart) {
    pages.push(1);
    pages.push('start-ellipsis'); // Changed to identify which ellipsis
  }

  // Always show current page and adjacent pages
  const startPage = Math.max(1, this.currentPage - 1);
  const endPage = Math.min(this.totalPages, this.currentPage + 1);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (showEllipsisEnd) {
    pages.push('end-ellipsis'); // Changed to identify which ellipsis
    pages.push(this.totalPages);
  }

  return pages;
}

goToPage(page: number | string): void {
  if (typeof page === 'number' && 
      page >= 1 && 
      page <= this.totalPages && 
      page !== this.currentPage) {
    this.currentPage = page;
    this.pageChange.emit(page);
  }
}

handleEllipsisClick(type: 'start' | 'end'): void {
  if (type === 'start') {
    // Show previous set of pages
    const newPage = Math.max(1, this.currentPage - 3);
    this.goToPage(newPage);
  } else {
    // Show next set of pages
    const newPage = Math.min(this.totalPages, this.currentPage + 3);
    this.goToPage(newPage);
  }
}
}
