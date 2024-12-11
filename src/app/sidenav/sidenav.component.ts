import { CommonModule } from '@angular/common';
import { Component ,  HostListener, Input} from '@angular/core';
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
  isSidebarCollapsed: boolean = false; // Track sidebar state
  isZoomedIn: boolean = false; // Track zoom state
  @Input() isSidebarVisible: boolean = false; 
  menuItems = [
    { id: 'find', icon: 'bi bi-search', title: 'Find', subtitle: 'Content' },
    { id: 'projects', icon: 'bi bi-folder-symlink-fill', title: 'Projects' },
    { id: 'arrange', icon: 'bi bi-view-list', title: 'Arrange' },
    { id: 'personalize', icon: 'bi bi-boxes', title: 'Personalize' },
    { id: 'uploads', icon: 'bi bi-upload', title: 'Uploads' },
    { id: 'favorites', icon: 'bi bi-heart', title: 'Favorites' },
    { id: 'help', icon: 'bi bi-question-circle', title: 'Help' }
  ];

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateZoomState();
  }

  ngOnInit() {
    this.updateZoomState();
  }

  updateZoomState() {
    const zoomLevel = window.innerWidth / document.documentElement.clientWidth;
    this.isZoomedIn = zoomLevel > 1.1;
  }

  setActive(itemId: string) {
    this.activeItem = itemId;
  }

  handleKeydown(event: KeyboardEvent, itemId: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.setActive(itemId);
    }
  }

  isSidebarOpen: boolean = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
