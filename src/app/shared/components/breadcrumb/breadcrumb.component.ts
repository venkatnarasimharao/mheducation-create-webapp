import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'hec-breadcrumb',
  standalone: true,
  imports: [ RouterModule, TranslateModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  translate: TranslateService = inject(TranslateService);
  list: any[] = [
    { label: 'FindContent', url: '/special-collection' },
    { label: 'BrowseCollections', url: '/special-collection' },
    { label: 'NegotiationCollection', url: '' },
  ];
  
  isLast(item: any): boolean {
    return this.list[this.list.length - 1] === item;
  }
}
