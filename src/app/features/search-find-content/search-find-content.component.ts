import { Component } from '@angular/core';
import { CustomdropdownComponent } from '../../shared/components/customdropdown/customdropdown.component';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'hec-search-find-content',
  standalone: true,
  imports: [CustomdropdownComponent,BreadcrumbComponent],
  templateUrl: './search-find-content.component.html',
  styleUrl: './search-find-content.component.scss'
})
export class SearchFindContentComponent {
//dropdownTitle
firstDropDownTitle: string = 'Test123';
secondDropDownTitle: string = 'Please Select';
thirdDropdownTitle: string = 'Arrange';

//dropdown items
firstDropdownItems = ['Option 1', 'Option 2', 'Option 3'];
secondDropdownItems = ['Item A', 'Item B', 'Item C'];
thirdDropdownItems = [];

//dropdown heading
firstDropdownHeading: string = 'Select Project';
secondDropdownHeading: string = 'Select Format';
thirdDropdownHeading: string = '86 pgs / $12.46 est';
}
