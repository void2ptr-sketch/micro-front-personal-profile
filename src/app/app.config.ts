import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { environment } from '../environments/environment';

import { APP_ENVIRONMENT } from './core/config/app-environment.token';
import { provideAppState } from './core/state/provide-app-state';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    { provide: APP_ENVIRONMENT, useValue: environment },
    provideAppState(),
  ],
};
