import { inject, provideAppInitializer } from '@angular/core';

import { ProfileStateService } from '../../core/state/profile-state.service';

import { SECURITY_PLUGIN } from './security/security.constants';

export const provideSecurityFeature = () =>
  provideAppInitializer(() => {
    const profileState = inject(ProfileStateService);
    profileState.loadInitialProfile();
    profileState.registerPlugin(SECURITY_PLUGIN);
  });
