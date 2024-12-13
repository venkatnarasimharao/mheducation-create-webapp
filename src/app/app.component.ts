import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderWrapperComponent } from "./header-wrapper/header-wrapper.component";
import { ApiService } from './services/api.service';
import { SharedstateService } from './services/sharedstate.service';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarService } from './services/sidebar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderWrapperComponent,
    FooterComponent,
    TranslateModule,
    SidenavComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  activeItem = '1';
  isSidebarCollapsed = false;
  isZoomedIn: boolean = false;
  isSidebarVisible: boolean = false;

  constructor(
    private apiService: ApiService,
    private sharedStateService: SharedstateService,
    private sidebarService: SidebarService // Inject the sidebar service
  ) { }

  ngOnInit(): void {
    this.sharedStateService.getLanguages();
    this.getCollectionsList();

    // Subscribe to the sidebar visibility state
    this.sidebarService.visibility$.subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
    });
  }

  @HostListener('window:resize')
  @HostListener('window:load')
  onWindowChange() {
    this.updateZoomState();
  }

  updateZoomState() {
    const zoomLevel = window.devicePixelRatio;
    this.isZoomedIn = zoomLevel >= 1.75;
    if (!this.isZoomedIn) {
      this.isSidebarVisible = true;
    }
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  getCollectionsList() {
    this.apiService.getCollectionsList().subscribe((data: any) => {
      console.log(data, 'getCollectionsList;')
    });

    this.getLanguagePropsList();
  }

  getLanguagePropsList() {
    this.apiService.getLanguagePropsList().subscribe((data: any) => {
      if (data && JSON.parse(data)) {
        const languageProps = JSON.parse(data);
        console.log(languageProps, 'getLanguagePropsList')
      }
    });
    this.getTaxonomyfacetsList();
  }

  getTaxonomyfacetsList() {
    this.apiService.getTaxonomyfacetsList().subscribe((data: any) => {
      console.log(data, 'getTaxonomyfacetsList')
    });
    this.getCoverPhotosList();
  }

  getCoverPhotosList() {
    this.apiService.getCoverPhotosList().subscribe((data: any) => {
      console.log(data, 'getCoverPhotosList')
    });
    this.getSearchListing();
  }

  getSearchListing() {
    this.apiService.getSearchListing().subscribe((data: any) => {
      console.log(data, 'cccccccccccc')
    });

  }
}
