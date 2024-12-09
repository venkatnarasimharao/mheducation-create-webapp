import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  activeItem: string = 'find';

  menuItems = [
    { id: 'find', icon: 'bi bi-search', title: 'Find', subtitle: 'Content' },
    { id: 'projects', icon: 'bi bi-folder-symlink-fill', title: 'Projects' },
    { id: 'arrange', icon: 'bi bi-view-list', title: 'Arrange' },
    { id: 'personalize', icon: 'bi bi-boxes', title: 'Personalize' },
    { id: 'uploads', icon: 'bi bi-upload', title: 'Uploads' },
    { id: 'favorites', icon: 'bi bi-heart', title: 'Favorites' },
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
