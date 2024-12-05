import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule ,RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  // hoveredBreadcrumb: any = null; 
  @Input() breadCrumbs = [
    { label: 'Find Content', routerLink: '/breadcrumb/fcontent' },
    { label: 'Browse Collections', routerLink: '/breadcrumb/browseCollection' },
    { label: 'Negotiation Collection', routerLink: '/breadcrumb/negotiationCollection' },
  ];

  constructor(private router: Router) {}
  navigate(breadCrumbs: { label: string; routerLink?: string }) {
    if (breadCrumbs.routerLink) {
      this.router.navigate([breadCrumbs.routerLink]);
    }
  }
}
