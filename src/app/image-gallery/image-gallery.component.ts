import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule, TranslateModule],
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
    { name: 'orgName_30', logo: 'https://create.mheducation.com/createonline/images/sites/literature.png' }
  ];

  visibleCollections = this.collections.slice(0, 16);

  showAllCollections() {
    this.showAll = true;
    this.visibleCollections = this.collections;
  }

  exitShowAll() {
    this.showAll = false;
    this.visibleCollections = this.collections.slice(0, 16);
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
    this.visibleCollections = this.showAll ? this.collections : this.collections.slice(0, 16);
  }

  // onKeydown(event: KeyboardEvent, collection: any): void {
  //   if (event.key === 'Enter' || event.key === ' ') {
  //     console.log(`You selected ${collection.name}`);
  //     event.preventDefault();
  //   }
  // }
  trackCollection(index: number, collection: any) {
    return collection.name;
  }
}
