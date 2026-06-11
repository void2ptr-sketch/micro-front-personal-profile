import { Routes } from '@angular/router';

import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
        data: { titleKey: 'route.home.title' },
      },
      {
        path: 'security',
        loadComponent: () =>
          import('./features/security/security/security.component').then(
            (m) => m.SecurityComponent,
          ),
        data: { titleKey: 'route.security.title' },
      },
      {
        path: 'locale',
        loadComponent: () =>
          import('./features/locale/locale/locale.component').then((m) => m.LocaleComponent),
        data: { titleKey: 'route.locale.title' },
      },
    ],
  },
  { path: '**', redirectTo: 'home' },
];
