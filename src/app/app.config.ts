import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, TitleStrategy } from '@angular/router';

import { environment } from '../environments/environment';

import { APP_ENVIRONMENT } from './core/config/app-environment.token';
import { I18nTitleStrategy } from './core/i18n/i18n-title.strategy';
import { provideAppState } from './core/state/provide-app-state';
import { provideLocaleFeature } from './features/locale/provide-locale-feature';
import { provideSecurityFeature } from './features/security/provide-security-feature';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    { provide: APP_ENVIRONMENT, useValue: environment },
    { provide: TitleStrategy, useClass: I18nTitleStrategy },
    provideLocaleFeature(),
    provideAppState(),
    provideSecurityFeature(),
  ],
};
