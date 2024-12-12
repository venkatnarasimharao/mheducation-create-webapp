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
    { name: 'orgName_1', logo: 'https://create.mheducation.com/createonline/images/sites/jfk_logo.png' },
    { name: 'orgName_2', logo: 'https://create.mheducation.com/createonline/images/sites/lewicki_logo.png' },
    { name: 'orgName_3', logo: 'https://create.mheducation.com/createonline/images/sites/MEPS_logo.png' },
    { name: 'orgName_4', logo: 'https://create.mheducation.com/createonline/images/sites/literature.png' },
    { name: 'orgName_5', logo: 'https://create.mheducation.com/createonline/images/sites/nacra_logo.png' },
    { name: 'orgName_6', logo: 'https://create.mheducation.com/createonline/images/sites/lewicki_logo.png' },
    { name: 'orgName_7', logo: 'https://create.mheducation.com/createonline/images/sites/jfk_logo.png' },
    { name: 'orgName_8', logo: 'https://create.mheducation.com/createonline/images/sites/nacra_logo.png' },
    { name: 'orgName_9', logo: 'https://create.mheducation.com/createonline/images/sites/MEPS_logo.png' },
    { name: 'orgName_10', logo: 'https://create.mheducation.com/createonline/images/sites/literature.png' },
    { name: 'orgName_11', logo: 'https://create.mheducation.com/createonline/images/sites/jfk_logo.png' },
    { name: 'orgName_12', logo: 'https://create.mheducation.com/createonline/images/sites/lewicki_logo.png' },
    { name: 'orgName_13', logo: 'https://create.mheducation.com/createonline/images/sites/MEPS_logo.png' },
    { name: 'orgName_14', logo: 'https://create.mheducation.com/createonline/images/sites/literature.png' },
    { name: 'orgName_15', logo: 'https://create.mheducation.com/createonline/images/sites/nacra_logo.png' },
    { name: 'orgName_16', logo: 'https://create.mheducation.com/createonline/images/sites/lewicki_logo.png' },
    { name: 'orgName_17', logo: 'https://create.mheducation.com/createonline/images/sites/jfk_logo.png' },
    { name: 'orgName_18', logo: 'https://create.mheducation.com/createonline/images/sites/nacra_logo.png' },
    { name: 'orgName_19', logo: 'https://create.mheducation.com/createonline/images/sites/MEPS_logo.png' },
    { name: 'orgName_20', logo: 'https://create.mheducation.com/createonline/images/sites/literature.png' },
    { name: 'orgName_21', logo: 'https://create.mheducation.com/createonline/images/sites/jfk_logo.png' },
    { name: 'orgName_22', logo: 'https://create.mheducation.com/createonline/images/sites/lewicki_logo.png' },
    { name: 'orgName_23', logo: 'https://create.mheducation.com/createonline/images/sites/MEPS_logo.png' },
    { name: 'orgName_24', logo: 'https://create.mheducation.com/createonline/images/sites/literature.png' },
    { name: 'orgName_25', logo: 'https://create.mheducation.com/createonline/images/sites/nacra_logo.png' },
    { name: 'orgName_26', logo: 'https://create.mheducation.com/createonline/images/sites/lewicki_logo.png' },
    { name: 'orgName_27', logo: 'https://create.mheducation.com/createonline/images/sites/jfk_logo.png' },
    { name: 'orgName_28', logo: 'https://create.mheducation.com/createonline/images/sites/nacra_logo.png' },
    { name: 'orgName_29', logo: 'https://create.mheducation.com/createonline/images/sites/MEPS_logo.png' },
    { name: 'orgName_30', logo: 'https://create.mheducation.com/createonline/images/sites/literature.png' },
    { name: 'orgName_31', logo: 'https://create.mheducation.com/createonline/images/sites/jfk_logo.png' },
    { name: 'orgName_32', logo: 'https://create.mheducation.com/createonline/images/sites/lewicki_logo.png' }
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