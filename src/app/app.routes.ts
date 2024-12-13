import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgbAccordionComponent } from './ngb-accordion/ngb-accordion.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { FindcontentComponent } from './findcontent/findcontent.component';
import { ArrangeComponent } from './arrange/arrange.component';

export const routes: Routes = [
  {

    path: 'home',
    component: HomeComponent
  },
  {
    path: 'all-collections',
    component: ImageGalleryComponent
  },
  {
    path: 'accordion',
    component: NgbAccordionComponent
  },
  {
    path: 'drag-drop',
    component: DragDropComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'search',
    component: FindcontentComponent
  },
  {
    path: 'arrange',
    component: ArrangeComponent
  }
];
