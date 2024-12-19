import { Component } from '@angular/core';
import { CustomdropdownComponent } from '../../shared/components/customdropdown/customdropdown.component';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'hec-search-find-content',
  standalone: true,
  imports: [CustomdropdownComponent, BreadcrumbComponent],
  templateUrl: './search-find-content.component.html',
  styleUrl: './search-find-content.component.scss'
})
export class SearchFindContentComponent {
  //dropdownTitle
  selectProjectTitle: string = 'Test123';
  selectFormatTitle: string = 'Please Select';

  //dropdown items
  selectProjectItems = ['Option 1', 'Option 2', 'Option 3'];
  selectFormatItems = ['Item A', 'Item B', 'Item C'];

  //dropdown heading
  selectProjectHeading: string = 'Select Project';
  selectFormatHeading: string = 'Select Format';
  arrangeHeading: string = '86 pgs / $12.46 est';
}
