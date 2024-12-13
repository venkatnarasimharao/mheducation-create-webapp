import { Component, EventEmitter, HostListener, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink, CommonModule, SidenavComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  imageurl: string = "https://www.mheducation.co.in/static/version1732692363/frontend/Cti/canada-theme/en_GB/images/logo.svg";
  brandName: string = "Create";

  selectedOption: string = '';
  menuItems = [
    { id: 1, title: 'Home', icon: 'fas fa-home', link: '/home' },
    { id: 2, title: 'About', icon: 'fas fa-info-circle', link: '/about' },
    { id: 3, title: 'Contact', icon: 'fas fa-phone', link: '/contact' },
    // More items here
  ];
  // @Output() sidebarToggle = new EventEmitter<void>();  // Emit event for sidebar toggle
  // isZoomedIn = window.devicePixelRatio >= 1.75;  // Check if zoom >= 175%


  activeItem = 1;
  isSidebarCollapsed = false; // Controls the visibility of the sidebar
  isMobile = false; // Flag to check if the viewport is small

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkViewportSize();
  }

  checkViewportSize() {
    // Check if the window width is less than or equal to 992px
    this.isMobile = window.innerWidth <= 992;
    console.log("mobile viewport", window.innerWidth);
  }

  // toggleSidebar() {
  //   // Emit the sidebar toggle event when hamburger button is clicked
  //   this.sidebarToggle.emit();
  // }

  setActive(id: number) {
    this.activeItem = id;
  }

  handleKeydown(event: KeyboardEvent, id: number) {
    // Handle keyboard navigation
  }

  ngOnInit() {
    this.checkViewportSize(); // Initial check on component load
  }

  translate: TranslateService = inject(TranslateService);

  onSelect(event: any) {
    this.selectedOption = event.target.value;

    // Check if an option has been selected
    if (!this.selectedOption) {
      alert('Please select an option!');
      // Focus back to the select element
      event.target.focus();
    }
  }

  changeLanguage(event: Event): void {
    const selectedLanguage = (event.target as HTMLSelectElement).value;
    this.translate.use(selectedLanguage);
    if (selectedLanguage === "arabic") {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }
}
