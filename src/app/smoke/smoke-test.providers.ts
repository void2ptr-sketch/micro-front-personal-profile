import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { EnvironmentProviders, Provider } from '@angular/core';
import { of } from 'rxjs';

import { routes } from '../app.routes';
import { providePersonalProfileCore } from '../core/config/provide-personal-profile-core';
import { createInitialProfile } from '../core/models/profile.models';
import { ProfileApiService } from '../core/api/services/profile-api.service';
import { SecurityApiService } from '../core/api/services/security-api.service';

export const smokeTestProviders: (Provider | EnvironmentProviders)[] = [
  provideRouter(routes),
  provideNoopAnimations(),
  providePersonalProfileCore(),
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
