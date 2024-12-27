import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgbDropdownToggleNoCaretDirective } from '../../shared/directives/dropdown-toggle-css.directive';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { FilterAccordionComponent } from '../../shared/components/filter-accordion/filter-accordion.component';
import { AccordionItem } from '../../shared/models/search.model';

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
    FilterAccordionComponent
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

  collectionfilter: AccordionItem[] = [
      {
        id: 'panel1',
        header: 'Type',
        collectionTypes: [
          { label: 'Part', value: '(171)' },
          { label: 'PartOpener', value: '(183)' },
          { label: 'Books', value: '(13)' },
          { label: 'Videos', value: '(104)' },
          { label: 'Upload', value: '' },
          { label: 'Article', value: '(5)' },
          { label: 'Case', value: '(177)' },
        ],
      },
      {
        id: 'panel2',
        header: 'Instructor Materials',
        collectionTypes: [{ label: 'Available as eBook', value: '(305)' }],
      },
      {
        id: 'panel3',
        header: 'Publication Year',
        collectionTypes: [
          { label: '2022', value: '' },
          { label: '2021', value: '' },
          { label: '2020', value: '(39)' },
          { label: '2019', value: '' },
          { label: '2018', value: '(63)' },
          { label: '2017', value: '' },
          { label: '2016', value: '(27)' },
          { label: '2015', value: '(49)' },
          { label: '2014', value: '(18)' },
          { label: 'before 2014', value: '(104)' },
        ],
      },
      {
        id: 'panel4',
        header: 'Page Length',
        collectionTypes: [
          { label: 'Brief (1-4 pages)', value: '(135)' },
          { label: 'Medium (5-9 pages)', value: '(27)' },
          { label: 'Long (10+ pages)', value: '(169)' },
        ],
      },
    ];

}
