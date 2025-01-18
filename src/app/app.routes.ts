import { Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/landing.component').then(
        (m) => m.LandingComponent
      ),
  },
  {
    path: 'search-content',
    loadComponent: () =>
      import(
        './features/search-find-content/search-find-content.component'
      ).then((m) => m.SearchFindContentComponent)
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./features/projects/projects.component').then(
        (m) => m.ProjectsComponent
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'arrange',
    loadComponent: () =>
      import('./features/arrange/arrange.component').then(
        (m) => m.ArrangeComponent
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'personalize',
    loadComponent: () =>
      import('./features/personalize/personalize.component').then(
        (m) => m.PersonalizeComponent
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'uploads',
    loadComponent: () =>
      import('./features/uploads/uploads.component').then(
        (m) => m.UploadsComponent
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'favourites',
    loadComponent: () =>
      import('./features/favourites/favourites.component').then(
        (m) => m.FavouritesComponent
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'help',
    loadComponent: () =>
      import('./features/help/help.component').then(
        (m) => m.HelpComponent
      ),
  },

  {
    path: 'special-collection',
    loadComponent: () =>
      import('./features/special-collection/special-collection.component').then(
        (m) => m.SpecialCollectionComponent
      ),
  },
  {
    path: 'preview',
    loadComponent: () =>
      import('./features/book-info-panel/book-info-panel.component').then(
        (m) => m.BookInfoPanelComponent
      ),
  }
];
