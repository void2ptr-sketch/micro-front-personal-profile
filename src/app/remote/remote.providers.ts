import { EnvironmentProviders, Provider } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TitleStrategy } from '@angular/router';

import { environment } from '../../environments/environment';
import { provideHttpApi } from '../core/api/provide-http-api';
import { APP_ENVIRONMENT } from '../core/config/app-environment.token';
import { I18nTitleStrategy } from '../core/i18n/i18n-title.strategy';
import { provideAppState } from '../core/state/provide-app-state';
import { provideLocaleFeature } from '../features/locale/provide-locale-feature';
import { provideSecurityFeature } from '../features/security/provide-security-feature';
import { provideThemeFeature } from '../features/theme/provide-theme-feature';

export const REMOTE_PROVIDERS: Array<Provider | EnvironmentProviders> = [
  provideAnimations(),
  { provide: APP_ENVIRONMENT, useValue: environment },
  { provide: TitleStrategy, useClass: I18nTitleStrategy },
  provideHttpApi(),
  provideLocaleFeature(),
  provideThemeFeature(),
  provideAppState(),
  provideSecurityFeature(),
];
