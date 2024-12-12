import { CommonModule } from '@angular/common';
import { Component ,  HostListener, inject, Input} from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterLink,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  activeItem: string = 'find';
  isSidebarCollapsed: boolean = false; // Track sidebar state
  isZoomedIn: boolean = false; // Track zoom state
  @Input() isSidebarVisible: boolean = false; 
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
