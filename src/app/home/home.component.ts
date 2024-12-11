import { Component, HostListener, inject } from '@angular/core';
import { SidenavComponent } from "../sidenav/sidenav.component";
import { FooterComponent } from '../footer/footer.component';
import { HeaderWrapperComponent } from '../header-wrapper/header-wrapper.component';
import { SearchProductComponent } from '../search-product/search-product.component';
import { ImageGalleryComponent } from '../image-gallery/image-gallery.component';
import { A11yModule } from '@angular/cdk/a11y';
import { HeaderBannerComponent } from '../header-banner/header-banner.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidenavComponent,
    FooterComponent,
    HeaderWrapperComponent,
    SearchProductComponent,
    ImageGalleryComponent,
    A11yModule,
    HeaderBannerComponent,
    RouterModule
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  translate: TranslateService = inject(TranslateService);
  showAll: boolean = false;
  isSidebarVisible: boolean = false;
isZoomedIn: boolean = false;

 collections = [
    { name: 'Darden Business Publishing', logo: 'https://create.mheducation.com/createonline/images/sites/jfk_logo.png' },
    { name: 'Harvard Business Publishing', logo: 'https://create.mheducation.com/createonline/images/sites/lewicki_logo.png' },
    { name: 'INSEAD Business School', logo: 'https://create.mheducation.com/createonline/images/sites/MEPS_logo.png' },
    { name: 'NACRA Case Research', logo: 'https://create.mheducation.com/createonline/images/sites/literature.png' },
    { name: 'MIT Sloan Management', logo: 'https://create.mheducation.com/createonline/images/sites/nacra_logo.png' },
    { name: 'Darden Business Publishing', logo: 'https://create.mheducation.com/createonline/images/sites/lewicki_logo.png' },
    { name: 'Harvard Business Publishing', logo: 'https://create.mheducation.com/createonline/images/sites/jfk_logo.png' },
    { name: 'INSEAD Business School', logo: 'https://create.mheducation.com/createonline/images/sites/nacra_logo.png' },
    { name: 'NACRA Case Research', logo: 'https://create.mheducation.com/createonline/images/sites/MEPS_logo.png' },
    { name: 'MIT Sloan Management', logo: 'https://create.mheducation.com/createonline/images/sites/literature.png' },
    { name: 'Darden Business Publishing', logo: 'https://create.mheducation.com/createonline/images/sites/jfk_logo.png' },
    { name: 'Harvard Business Publishing', logo: 'https://create.mheducation.com/createonline/images/sites/lewicki_logo.png' },
    { name: 'INSEAD Business School', logo: 'https://create.mheducation.com/createonline/images/sites/MEPS_logo.png' },
    { name: 'NACRA Case Research', logo: 'https://create.mheducation.com/createonline/images/sites/literature.png' },
    { name: 'MIT Sloan Management', logo: 'https://create.mheducation.com/createonline/images/sites/nacra_logo.png' },
    { name: 'Darden Business Publishing', logo: 'https://create.mheducation.com/createonline/images/sites/lewicki_logo.png' },
    { name: 'Harvard Business Publishing', logo: 'https://create.mheducation.com/createonline/images/sites/jfk_logo.png' },
    { name: 'INSEAD Business School', logo: 'https://create.mheducation.com/createonline/images/sites/nacra_logo.png' },
    { name: 'NACRA Case Research', logo: 'https://create.mheducation.com/createonline/images/sites/MEPS_logo.png' },
    { name: 'MIT Sloan Management', logo: 'https://create.mheducation.com/createonline/images/sites/literature.png' },
    { name: 'Darden Business Publishing', logo: 'https://create.mheducation.com/createonline/images/sites/jfk_logo.png' },
    { name: 'Harvard Business Publishing', logo: 'https://create.mheducation.com/createonline/images/sites/lewicki_logo.png' },
    { name: 'INSEAD Business School', logo: 'https://create.mheducation.com/createonline/images/sites/MEPS_logo.png' },
    { name: 'NACRA Case Research', logo: 'https://create.mheducation.com/createonline/images/sites/literature.png' },
    { name: 'MIT Sloan Management', logo: 'https://create.mheducation.com/createonline/images/sites/nacra_logo.png' },
    { name: 'Darden Business Publishing', logo: 'https://create.mheducation.com/createonline/images/sites/lewicki_logo.png' },
    { name: 'Harvard Business Publishing', logo: 'https://create.mheducation.com/createonline/images/sites/jfk_logo.png' },
    { name: 'INSEAD Business School', logo: 'https://create.mheducation.com/createonline/images/sites/nacra_logo.png' },
    { name: 'NACRA Case Research', logo: 'https://create.mheducation.com/createonline/images/sites/MEPS_logo.png' },
    { name: 'MIT Sloan Management', logo: 'https://create.mheducation.com/createonline/images/sites/literature.png' },
    { name: 'Darden Business Publishing', logo: 'https://create.mheducation.com/createonline/images/sites/jfk_logo.png' },
    { name: 'Harvard Business Publishing', logo: 'https://create.mheducation.com/createonline/images/sites/lewicki_logo.png' }
];
constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  this.detectZoomLevel()
}

@HostListener('window:resize', ['$event'])
detectZoomLevel() {
  const zoomLevel = window.innerWidth / window.screen.width * 100;
  this.isZoomedIn = zoomLevel > 175; // Set to true if zoom is more than 175%
}

onSidebarToggle() {
  this.isSidebarVisible = !this.isSidebarVisible;
}
isHomePage(): boolean {
  return this.router.url === '/home';
}

isAllCollectionsPage(): boolean {
  return this.router.url === '/all-collections';
}
}
