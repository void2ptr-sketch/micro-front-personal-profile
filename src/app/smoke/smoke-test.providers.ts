import { provideHttpClient } from '@angular/common/http';
import { EnvironmentProviders, Provider } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter, TitleStrategy } from '@angular/router';
import { of } from 'rxjs';

import { environment } from '../../environments/environment';
import { routes } from '../app.routes';
import { APP_ENVIRONMENT } from '../core/config/app-environment.token';
import { I18nTitleStrategy } from '../core/i18n/i18n-title.strategy';
import { createInitialProfile } from '../core/models/profile.models';
import { ProfileApiService } from '../core/api/services/profile-api.service';
import { SecurityApiService } from '../core/api/services/security-api.service';

export const smokeTestProviders: (Provider | EnvironmentProviders)[] = [
  provideRouter(routes),
  provideNoopAnimations(),
  provideHttpClient(),
  { provide: APP_ENVIRONMENT, useValue: environment },
  { provide: TitleStrategy, useClass: I18nTitleStrategy },
  {
    provide: ProfileApiService,
    useValue: {
      getProfile: () => of({ data: createInitialProfile() }),
    },
  },
  {
    provide: SecurityApiService,
    useValue: {
      changePassword: () => of({ data: { changed: true } }),
    },
  },
];
