import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule,RouterModule,],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  @Input() breadCrumbs = [
    { label: 'Find Content', route: '/breadcrumb/fcontent' },
    { label: 'Browse Collections', route: '/breadcrumb/browseCollection' },
    { label: 'Negotiation Collection', route: '/breadcrumb/negotiationCollection' },
  ];

  constructor(private router: Router) {}
  navigate(breadCrumbs: { label: string; routerLink?: string }) {
    if (breadCrumbs.routerLink) {
      this.router.navigate([breadCrumbs.routerLink]);
    }
  }
}
