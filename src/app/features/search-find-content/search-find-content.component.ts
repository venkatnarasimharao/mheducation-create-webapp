import { Component } from '@angular/core';
import { CustomdropdownComponent } from '../../shared/components/customdropdown/customdropdown.component';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgbDropdownToggleNoCaretDirective } from '../../shared/directives/dropdown-toggle-css.directive';

@Component({
  selector: 'hec-search-find-content',
  standalone: true,
  imports: [
    CustomdropdownComponent,
    BreadcrumbComponent,
    NgbDropdownModule,
    CommonModule,
    NgbDropdownToggleNoCaretDirective,
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

  onSelect(item: string) {
    this.firstDropDownTitle = item; 
  }

  onSelected(item: string) {
    this.secondDropDownTitle = item; 
  }
}
