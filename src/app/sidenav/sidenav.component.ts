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
    { id: 'find', icon: 'bi bi-search', title: 'FindContent', routerLink: '/search'},
    { id: 'projects', icon: 'bi bi-folder-symlink-fill', title: 'Projects',routerLink: '/search' },
    { id: 'arrange', icon: 'bi bi-view-list', title: 'Banner2ndHeading' , routerLink: '/arrange' },
    { id: 'personalize', icon: 'bi bi-boxes', title: 'Banner3rdHeading',routerLink: '/search' },
    { id: 'uploads', icon: 'bi bi-upload', title: 'Uploads',routerLink: '/findcontent' },
    { id: 'favorites', icon: 'bi bi-heart', title: 'Favourites',routerLink: '/findcontent' },
    { id: 'help', icon: 'bi bi-question-circle', title: 'Help',routerLink: '/findcontent' }
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
