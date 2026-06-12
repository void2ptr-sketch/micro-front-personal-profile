import { Routes } from '@angular/router';

import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'user-info', pathMatch: 'full' },
      {
        path: 'user-info',
        loadComponent: () =>
          import('./features/user-info/user-info.component').then((m) => m.UserInfoComponent),
        data: { titleKey: 'route.userInfo.title' },
      },
      {
        path: 'security',
        loadComponent: () =>
          import('./features/security/component/security.component').then(
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
      {
        path: 'theme',
        loadComponent: () =>
          import('./features/theme/component/theme.component').then((m) => m.ThemeComponent),
        data: { titleKey: 'route.theme.title' },
      },
    ],
  },
  { path: '**', redirectTo: 'user-info' },
];
