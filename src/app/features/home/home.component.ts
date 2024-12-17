import { Component, HostListener, inject } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HeaderBannerComponent } from '../../shared/components/header-banner/header-banner.component';


@Component({
  selector: 'hec-home',
  standalone: true,
  imports: [
    A11yModule,
    RouterModule,
    HeaderBannerComponent,
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
