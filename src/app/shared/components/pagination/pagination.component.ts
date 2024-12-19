import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationConfig } from '../../models/search.model';

@Component({
  selector: 'hec-pagination',
  standalone: true,
  imports: [NgbPaginationModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements PaginationConfig {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 10;
  @Input() maxSize: number = 5;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  onPageChange(page: number) {
    if (page >= 1 && page <= this.currentPage) {
      this.currentPage = page;
      this.pageChange.emit(page);
    } else {
      console.error(
        `Invalid page number: ${page}. Must be between 1 and ${this.totalPages}.`
      );
    }
  }
}
