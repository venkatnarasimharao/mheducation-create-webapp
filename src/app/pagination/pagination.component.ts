import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgbPaginationModule, CommonModule,NgbDropdownModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PaginationComponent {
  onPageChange(onPageChange: any) {
    throw new Error('Method not implemented.');
  }
  page = 1; // Default current page
  totalPages = 10; // Total number of pages
}
