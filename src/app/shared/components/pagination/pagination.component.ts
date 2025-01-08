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
  @Input() totalPages!: number; // Total number of pages (e.g., 100)
  @Input() maxSize!: number;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  translate: TranslateService = inject(TranslateService);

  // Set the page size to 1 so each page corresponds to one "unit"
  pageSize: number = 1;

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(page);
    } else {
      console.error(
        `Invalid page number: ${page}. Must be between 1 and ${this.totalPages}.`
      );
    }
  }
}
