import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgbAccordionComponent } from './ngb-accordion/ngb-accordion.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FcontentComponent } from './breadcrumb/fcontent/fcontent.component';
import { BrowsecollectionsComponent } from './breadcrumb/browsecollections/browsecollections.component';
import { NegotiationCollectionComponent } from './breadcrumb/negotiation-collection/negotiation-collection.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'accordion',
    component: NgbAccordionComponent,
  },
  {
    path: 'drag-drop',
    component: DragDropComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  // {
  //   path: 'breadcrumb',
  //   component: BreadcrumbComponent,
  //   children: [
  //     { path: 'fcontent', component: FcontentComponent },
  //     { path: 'browseCollection', component: BrowsecollectionsComponent },
  //     {
  //       path: 'negotiationCollection',
  //       component: NegotiationCollectionComponent,
  //     },
  //   ],
  // },
];
