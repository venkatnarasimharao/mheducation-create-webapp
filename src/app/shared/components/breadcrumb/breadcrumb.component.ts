import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'hec-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  @Input() list: string[] = [
    'Find Content',
    'Browse Collection',
    'Negotiation Collection',
  ];

    // checking last breadcrumb item
    isLastItem(index: number): boolean {
      return index === this.list.length - 1;
    }
  
    // Method to get the class for a breadcrumb item
    getClassForItem(index: number): string {
      return this.isLastItem(index) ? 'inactive' : 'active';
    }
}
