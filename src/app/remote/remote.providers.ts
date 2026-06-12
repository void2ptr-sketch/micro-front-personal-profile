import { EnvironmentProviders, Provider } from '@angular/core';

import { providePersonalProfileCore } from '../core/config/provide-personal-profile-core';

export const REMOTE_PROVIDERS: (Provider | EnvironmentProviders)[] = [
  providePersonalProfileCore(),
];
