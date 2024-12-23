import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'hec-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  list: any[] = [
    { label: 'Find Content', url: '/special-collection' },
    { label: 'Browse Collections', url: '/special-collection' },
    { label: 'Negotiation Collection', url: '' },
  ];
  
  isLast(item: any): boolean {
    return this.list[this.list.length - 1] === item;
  }
}
