import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { SearchfilterComponent } from '../searchfilter/searchfilter.component';

@Component({
  selector: 'app-findcontent',
  standalone: true,
  imports: [CommonModule,NgbDropdownModule,BreadcrumbComponent,SearchfilterComponent],
  templateUrl: './findcontent.component.html',
  styleUrl: './findcontent.component.scss',
  encapsulation:ViewEncapsulation.Emulated
})
export class FindcontentComponent {
  value: any = '86 pgs / $12.46 est';
  dropdownList: string[] = ['item1', 'item2', 'item3', 'item4'];
  onItemSelect(item: string): void {
    console.log('Selected item:', item);
  }
}
