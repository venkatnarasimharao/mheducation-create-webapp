import { Routes } from '@angular/router';
import { SearchComponent } from './features/search/search.component';
import {SpecialCollectionComponent} from './features/special-collection/special-collection.component';
  export const routes: Routes = [
    {
      path: 'home',
      loadComponent: () =>
        import('./features/home/home.component').then(
          (m) => m.HomeComponent
        ),
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
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
  