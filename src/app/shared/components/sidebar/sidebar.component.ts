import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { MenuSidebarService } from '../../../core/services/menu-sidebar/menuSidebarService.service';

@Component({
  selector: 'hec-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  menuItems = [
    { label: 'Find Content', icon: 'bi-search', path: '' },
    { label: 'Projects', icon: 'bi-collection', path: '/projects' },
    { label: 'Arrange', icon: 'bi-view-list' },
    { label: 'Personalize', icon: 'bi-grid-1x2' },
    { label: 'Uploads', icon: 'bi-upload' },
    { label: 'Favorites', icon: 'bi-heart' },
    { label: 'Help', icon: 'bi-question-circle' },
  ];
  @ViewChild('menuContent', { static: true }) menuContent!: TemplateRef<any>;

  constructor(
    private offcanvasService: NgbOffcanvas,
    private menuService: MenuSidebarService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.menuService.openMenuRequest$.subscribe(() => {
      this.open();
    });

    this.breakpointObserver
      .observe(['(min-width: 992px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.offcanvasService.dismiss();
        }
      });
  }

  open() {
    this.offcanvasService.open(this.menuContent, { position: 'end' });
  }

  openMenu() {
    this.offcanvasService.dismiss();
  }
}