import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { TrapFocusDirective } from '../trap-focus.directive';

@Component({
  selector: 'app-findcontent',
  standalone: true,
  imports: [
    NgbDropdownModule,
    CommonModule,
    A11yModule,
    BreadcrumbComponent,
    TrapFocusDirective,
  ],
  templateUrl: './findcontent.component.html',
  styleUrl: './findcontent.component.scss',
})
export class FindcontentComponent {
  value: any = '86 pgs / $12.46 est';
  dropdownList: string[] = ['item1', 'item2', 'item3', 'item4'];
  onItemSelect(item: string): void {
    console.log('Selected item:', item);
  }
}
