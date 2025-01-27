import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PayloadService } from '../../../core/services/payload/payload.service';

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
  private payloadService: PayloadService = inject(PayloadService);

  // Set the page size to 1 so each page corresponds to one "unit"
  pageSize: number = 1;

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(page);

      // Calculate the <start> value based on the current page
      const startValue = (page - 1) * 20 + 1; // Example: Page 2 => 21, Page 3 => 41
      this.updatePayloadStart(startValue);
    } else {
      console.error(
        `Invalid page number: ${page}. Must be between 1 and ${this.totalPages}.`
      );
    }
  }

  private updatePayloadStart(startValue: number) {
    // Get the current payload
    const currentPayload = this.payloadService.getPayload();

    if (currentPayload) {
      // Directly update the 'start' value in the payload object
      if (currentPayload.search && currentPayload.search.start) {
        currentPayload.search.start = startValue;
      } else {
        console.warn('No start element found in payload.');
      }

      // Update the payload in the service
      this.payloadService.updatePayload(currentPayload);
      console.log('Payload updated with new start value:', currentPayload);
    } else {
      console.warn('No payload found to update.');
    }
  }
}
