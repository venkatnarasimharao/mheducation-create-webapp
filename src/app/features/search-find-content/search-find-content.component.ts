import { Component } from '@angular/core';
import { CustomdropdownComponent } from '../../shared/components/customdropdown/customdropdown.component';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { FilterAccordionComponent } from '../../shared/components/filter-accordion/filter-accordion.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownToggleNoCaretDirective } from '../../shared/directives/dropdown-toggle-css.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hec-search-find-content',
  standalone: true,
  imports: [
    CustomdropdownComponent,
    BreadcrumbComponent,
    FilterAccordionComponent,
    PaginationComponent,
    NgbDropdown,
    NgbDropdownToggleNoCaretDirective,
    CommonModule
  ],
  templateUrl: './search-find-content.component.html',
  styleUrl: './search-find-content.component.scss',
})
export class SearchFindContentComponent {
  //dropdownTitle
  firstDropDownTitle: string = 'Test123';
  secondDropDownTitle: string = 'Please Select';
  thirdDropdownTitle: string = 'Arrange';

  //dropdown items
  firstDropdownItems = ['Option 1', 'Option 2', 'Option 3'];
  secondDropdownItems = ['Item A', 'Item B', 'Item C'];


  //dropdown heading
  firstDropdownHeading: string = 'Select Project';
  secondDropdownHeading: string = 'Select Format';
  thirdDropdownHeading: string = '86 pgs / $12.46 est';


  
  
}
