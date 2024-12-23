import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/landing.component').then(
        (m) => m.LandingComponent
      ),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./features/projects/projects.component').then(
        (m) => m.ProjectsComponent
      ),
  },
  {
    path: 'arrange',
    loadComponent: () =>
      import('./features/arrange/arrange.component').then(
        (m) => m.ArrangeComponent
      ),
  },
  {
    path: 'personalize',
    loadComponent: () =>
      import('./features/personalize/personalize.component').then(
        (m) => m.PersonalizeComponent
      ),
  },
  {
    path: 'uploads',
    loadComponent: () =>
      import('./features/uploads/uploads.component').then(
        (m) => m.UploadsComponent
      ),
  },
  {
    path: 'favourites',
    loadComponent: () =>
      import('./features/favourites/favourites.component').then(
        (m) => m.FavouritesComponent
      ),
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
    path: 'detail-info',
    loadComponent: () =>
      import('./features/search/search.component').then(
        (m) => m.SearchComponent
      ),
  },
];
