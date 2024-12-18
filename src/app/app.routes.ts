import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'searchFindContent',
    loadComponent: () =>
      import(
        './features/search-find-content/search-find-content.component'
      ).then((m) => m.SearchFindContentComponent),
  },
];
