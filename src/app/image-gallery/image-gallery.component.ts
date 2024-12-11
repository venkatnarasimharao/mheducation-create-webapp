import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule,TranslateModule,RouterModule],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.scss'
})
export class ImageGalleryComponent {
  translate: TranslateService = inject(TranslateService);
  showAll: boolean = false;
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
constructor(private router: Router) {
    this.showAll = this.isAllCollectionsPage();
  }

  isHomePage(): boolean {
    return this.router.url === '/home';
  }

  isAllCollectionsPage(): boolean {
    return this.router.url === '/all-collections';
  }
} 