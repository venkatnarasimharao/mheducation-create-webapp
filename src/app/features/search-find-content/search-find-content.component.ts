import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgbDropdownToggleNoCaretDirective } from '../../shared/directives/dropdown-toggle-css.directive';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
  selector: 'hec-search-find-content',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    NgbDropdownModule,
    CommonModule,
    NgbDropdownToggleNoCaretDirective,
    RouterModule,
    PaginationComponent,
  ],
  templateUrl: './search-find-content.component.html',
  styleUrl: './search-find-content.component.scss',
})
export class SearchFindContentComponent {
  //dropdownTitle
  selectProjectTitle: string = 'Test123';
  selectFormatTitle: string = 'Please Select';
  selectArrangeTitle: string = 'Arrange';

  //dropdown items
  selectProjectItems: any[] = [
    { id: 1, name: 'Project 1' },
    { id: 2, name: 'Project 2' },
    { id: 3, name: 'Project 3' },
  ];

  selectFormatItems: any[] = [
    { id: 1, name: 'Format 1' },
    { id: 2, name: 'Format 2' },
    { id: 3, name: 'Format 3' },
  ];

  //dropdown heading
  selectProjectHeading: string = 'Select Project';
  selectFormatHeading: string = 'Select Format';
  arrangeHeading: string = '86 pgs / $12.46 est';

  onSelect(item: { id: number; name: string }) {
    this.selectProjectTitle = item.name;
  }

  onSelected(item: { id: number; name: string }) {
    this.selectFormatTitle = item.name;
  }

  //pagination
  currentPageNumber: number = 1;
  totalPagesCount: number = 100;
  pagePerItem: number = 5;
  
  onPageChange(newPage: number) {
    this.currentPageNumber = newPage;
    console.log('Page changed to:', newPage);
  }
}
