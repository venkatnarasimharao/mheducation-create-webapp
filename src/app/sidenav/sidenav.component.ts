import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports:[CommonModule, TranslateModule, RouterLink,RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  activeItem: string = 'find';
  translate: TranslateService = inject(TranslateService);

  menuItems = [
    { id: 'find', icon: 'bi bi-search', title: 'FindContent', route: '/search' },
    { id: 'projects', icon: 'bi bi-folder-symlink-fill', title: 'Projects', route: '/projects'},
    { id: 'arrange', icon: 'bi bi-view-list', title: 'Banner2ndHeading', route: '/arrange' },
    { id: 'personalize', icon: 'bi bi-grid-1x2', title: 'Banner3rdHeading', route: '/personalize' },
    { id: 'uploads', icon: 'bi bi-upload', title: 'Uploads', route: '/uploads' },
    { id: 'favorites', icon: 'bi bi-heart', title: 'Favourites', route: '/favorites' },
    { id: 'help', icon: 'bi bi-question-circle', title: 'Help', route: '/help' }
  ];

  setActive(itemId: string) {
    this.activeItem = itemId;
  }

  handleKeydown(event: KeyboardEvent, itemId: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.setActive(itemId);
    }
  }
}
