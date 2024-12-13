import { CommonModule } from '@angular/common';
import { Component ,  HostListener, Inject, inject,  Renderer2,Input, ElementRef} from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports:[CommonModule, TranslateModule, RouterLink,RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  activeItem: string = 'find';
  isZoomedIn: boolean = false; // Zoom state
  isSidebarVisible: boolean = false; // Sidebar visibility toggled via button
  menuItems = [
    { id: 'find', icon: 'bi bi-search', title: 'FindContent', route: '/search' },
    { id: 'projects', icon: 'bi bi-folder-symlink-fill', title: 'Projects', route: '/projects'},
    { id: 'arrange', icon: 'bi bi-view-list', title: 'Banner2ndHeading', route: '/arrange' },
    { id: 'personalize', icon: 'bi bi-grid-1x2', title: 'Banner3rdHeading', route: '/personalize' },
    { id: 'uploads', icon: 'bi bi-upload', title: 'Uploads', route: '/uploads' },
    { id: 'favorites', icon: 'bi bi-heart', title: 'Favourites', route: '/favorites' },
    { id: 'help', icon: 'bi bi-question-circle', title: 'Help', route: '/help' }
  ];
 
  
  constructor(
    @Inject(SidebarService) private sidebarService: SidebarService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    // Subscribe to the visibility state
    this.sidebarService.visibility$.subscribe(
      (isVisible) => {
        this.isSidebarVisible = isVisible;
        this.toggleBodyScroll();
      }
    );
  }

  toggleBodyScroll() {
    if (this.isSidebarVisible) {
      this.renderer.addClass(document.body, 'overlay-visible');
      console.log('if rendered');
    } else {
      this.renderer.removeClass(document.body, 'overlay-visible');
      console.log('if rendered');
    }
  }
  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }
  @HostListener('window:resize')
  @HostListener('window:load')
  onWindowChange() {
    this.updateZoomState();
  }

  ngOnInit() {
    this.updateZoomState();
  }

  updateZoomState() {
    const zoomLevel = window.devicePixelRatio;
    this.isZoomedIn = zoomLevel >= 2.00; // Show toggle for zoom >= 175%
    
    if (this.isZoomedIn) {
      this.isSidebarVisible = false; // Hide sidebar when toggle button is shown
    } else {
      this.isSidebarVisible = true; // Always show sidebar for zoom levels below 175%
    }
  }
  
  setActive(itemId: string) {
    this.activeItem = itemId;
  }

  handleKeydown(event: KeyboardEvent, itemId: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.setActive(itemId);
    }
  }
  
}