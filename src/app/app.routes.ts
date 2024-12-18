import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then(
        (m) => m.HomeComponent
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
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];
