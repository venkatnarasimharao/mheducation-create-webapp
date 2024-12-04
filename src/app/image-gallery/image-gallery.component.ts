import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.scss'
})
export class ImageGalleryComponent {

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
