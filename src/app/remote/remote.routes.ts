import { Routes } from '@angular/router';

import { RemoteShellComponent } from './remote-shell.component';
import { REMOTE_PROVIDERS } from './remote.providers';

export const REMOTE_ROUTES: Routes = [
  {
    path: '',
    component: RemoteShellComponent,
    providers: REMOTE_PROVIDERS,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () => import('../features/home/home.component').then((m) => m.HomeComponent),
        data: { titleKey: 'route.home.title' },
      },
      {
        path: 'security',
        loadComponent: () =>
          import('../features/security/component/security.component').then(
            (m) => m.SecurityComponent,
          ),
        data: { titleKey: 'route.security.title' },
      },
      {
        path: 'locale',
        loadComponent: () =>
          import('../features/locale/locale/locale.component').then((m) => m.LocaleComponent),
        data: { titleKey: 'route.locale.title' },
      },
      {
        path: 'theme',
        loadComponent: () =>
          import('../features/theme/component/theme.component').then((m) => m.ThemeComponent),
        data: { titleKey: 'route.theme.title' },
      },
    ],
  },
];
