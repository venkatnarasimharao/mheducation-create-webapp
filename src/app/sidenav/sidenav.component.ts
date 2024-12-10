import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  activeItem: string = 'find';
  translate: TranslateService = inject(TranslateService);

  menuItems = [
    { id: 'find', icon: 'bi bi-search', title: 'FindContent' },
    { id: 'projects', icon: 'bi bi-folder-symlink-fill', title: 'Projects' },
    { id: 'arrange', icon: 'bi bi-view-list', title: 'Banner2ndHeading' },
    { id: 'personalize', icon: 'bi bi-boxes', title: 'Banner3rdHeading' },
    { id: 'uploads', icon: 'bi bi-upload', title: 'Uploads' },
    { id: 'favorites', icon: 'bi bi-heart', title: 'Favourites' },
    { id: 'help', icon: 'bi bi-question-circle', title: 'Help' }
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
